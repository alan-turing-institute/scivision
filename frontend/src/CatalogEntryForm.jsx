import { Buffer } from "buffer";
import { React, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import MarkdownView from "react-showdown";
import Form from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";

import { download } from "./utils.js";
import { OctokitPRPlugin, GH_TOKEN_KEY } from "./config.js";

// Template (for rjsf) to allow Markdown formatting in form field
// descriptions
function DescriptionFieldTemplate({ description, id }) {
  return (
    <div id={id}>
      {" "}
      {/*style={{"white-space": "pre-wrap"}}>*/}
      <MarkdownView markdown={description} options={{ emoji: true }} />
    </div>
  );
}

// Component: Form to create new catalog entry (for download or PR)
// routes: /new-model, /new-datasource
//
// The two submit options either download the form data as json, or
// create a pull request with the new entry on behalf of the user.
//
// This Component can be used for both the model and datasource
// catalogs, through the props.
//
// * gh_logged_in - login status (grey out the PR button if not logged in)
// * schema - json schema object, used to generate the form
// * catalog_kind - "datasource" or "model",
export default function CatalogEntryForm({
  gh_logged_in,
  schema,
  uiSchema,
  templates,
  formData,
  onChange,
  catalog_kind,
  catalog_path,
  download_filename,
}) {
  // The modal dialogue shows when 'pr_failed' is true.  Separate
  // state variable (pr_message) for the message, since closing the
  // modal clears the failure flag, but the message is still visible
  // briefly
  const [pr_message, set_pr_message] = useState("");
  const [pr_failed, set_pr_failed] = useState(false);
  const [pr_loading, set_pr_loading] = useState(false);

  // There is a single onSubmit event for both buttons, but can
  // use the onClick of the button to set this flag and decide
  // which one
  let pr_flag;

  async function submitEntryToGitHub(entry_submitted) {
    const entry = entry_submitted.formData;
    const trimElements = ["name", "description"];
    trimElements.forEach((item) => {
      const entryTrimmed = entry[item] ? entry[item].trim() : "";
      entry[item] = entryTrimmed;
    });
    if (pr_flag) {
      const octokit = new OctokitPRPlugin({
        auth: sessionStorage[GH_TOKEN_KEY],
      });

      set_pr_loading(true);

      try {
        const {
          data: { login: gh_username },
        } = await octokit.rest.users.getAuthenticated();

        ///////////
        // Sync user fork
        //
        // This is a workaround to a possible bug in octokit-plugin-create-pull-request
        // triggered when the user has an out of date fork, resulting in a 404.
        // The workaround is just to synchronise the fork.
        //
        // With the workaround there is a theoretical chance that the base repository
        // is updated after the call to mergeUpstream but before createPullRequest, but
        // this can really only be fixed upstream.

        const scivision_forks = await octokit.rest.repos.listForks({
          owner: "alan-turing-institute",
          repo: "scivision",
        });

        const user_scivision_fork = scivision_forks.data.find(
          (fork) => fork.owner && fork.owner.login === gh_username,
        );

        // Array.find returns undefined if no matches -- in that case,
        // no need to update anything (octokit.createPullRequest
        // will create a fresh one)
        if (user_scivision_fork !== undefined) {
          await octokit.rest.repos.mergeUpstream({
            owner: gh_username,
            repo: user_scivision_fork.name,
            branch: user_scivision_fork.default_branch,
          });
        }

        //
        ///////////

        const response = await octokit.createPullRequest({
          owner: "alan-turing-institute",
          repo: "scivision",
          title: `Add "${entry.name}" to the ${catalog_kind} catalog`,
          body: `This is an automated message from the Scivision frontend (https://sci.vision):

> Your submission was successful and will be reviewed by the Scivision 
> maintainers before being added to the catalog, thank you.  If we have any
> questions about your submission we will post them here.`,
          base: "main",
          head: `add-${catalog_kind}-${crypto.randomUUID().toUpperCase()}`,
          update: false,
          forceFork: true,
          changes: [
            {
              files: {
                [catalog_path]: ({ exists, encoding, content }) => {
                  const content_str = Buffer.from(content, encoding);
                  let cat = JSON.parse(content_str);
                  cat.entries.push(entry);
                  return JSON.stringify(cat, null, 2);
                },
              },
              commit: `Create entry for "${entry.name}" in the ${catalog_kind} catalog`,
            },
          ],
        });
        if (response.status >= 200 && response.status < 300) {
          window.location = response.data.html_url;
        } else {
          throw new Error(response.data);
        }
      } catch (e) {
        set_pr_message(e.message);
        set_pr_failed(true);
        set_pr_loading(false);
      }
    } else {
      download(download_filename, JSON.stringify(entry, null, 2));
    }
  }

  return (
    <div className="mb-5">
      <Modal show={!!pr_failed} onHide={() => set_pr_failed(false)}>
        <Modal.Header closeButton>
          <b>Error opening pull request on GitHub</b>
        </Modal.Header>
        <Modal.Body>
          The error was:
          <div className="text-monospace mt-2 col">{pr_message}</div>
        </Modal.Body>
      </Modal>
      <Form
        onSubmit={submitEntryToGitHub}
        schema={schema}
        uiSchema={uiSchema}
        templates={{ DescriptionFieldTemplate, ...templates }}
        formData={formData}
        onChange={onChange}
        validator={validator}
      >
        <button
          type="submit"
          onClick={() => (pr_flag = true)}
          className="btn btn-primary"
          disabled={!gh_logged_in || pr_loading}
        >
          Open Pull Request on GitHub
          {pr_loading ? (
            <>
              &nbsp;
              <Spinner animation="border" role="status" size="sm" />
            </>
          ) : (
            <></>
          )}
          {gh_logged_in ? <></> : <> (login to enable)</>}
        </button>
        <button
          type="submit"
          onClick={() => (pr_flag = false)}
          className="btn btn-link"
        >
          Download entry data as json
        </button>
      </Form>
    </div>
  );
}
