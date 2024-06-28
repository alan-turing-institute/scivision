import { Container, Alert } from "react-bootstrap";
import CatalogEntryForm, {
  CatalogFormHowItWorksBox,
} from "./CatalogEntryForm.jsx";
import DatasourceNav from "./DatasourceNav.jsx";
import { LoginButton } from "./login.jsx";

import "bootstrap-icons/font/bootstrap-icons.css";

import datasource_schema from "./catalog/datasource_schema.js";

export default function DatasourceNew({ gh_logged_in }) {
  return (
    <>
      <DatasourceNav />

      <h3>Add a datasource to the catalog</h3>

      <h4>What is this?</h4>

      <Container className="text-block">
        <p>
          Use this form if you have a dataset you would like to be included in
          the datasource catalog. This form will automatically create a GitHub pull request to update the catalog, 
          and a maintainer will review and merge it. You may choose to submit an incomplete entry - 
          it can be discussed and updated on GitHub following submission.

        </p>
      </Container>

      <h4>Prerequistes</h4>

      <Container className="text-block">
        <Alert variant="secondary">
          <ul className="list-spaced">
            <li>
              You have a GitHub account
              <ul>
                <li>
                  You can sign up for a free account by clicking the Login
                  button below and choosing "Create an account" when prompted
                  for your credentials
                </li>
              </ul>
            </li>
            <li>
              {" "}
              Your data is in a publicly accessible location (for example, on{" "}
              <a href="https://zenodo.org/">Zenodo</a>
              ).
              <ul>
                <li>
                  The Scivision catalog does not host your data directly, just
                  some metadata about it, so this must be accessible elsewhere.
                </li>
              </ul>
            </li>

            <li>
              {" "}
              <strong>(Optionally)</strong> Your data repository is in the{" "}
              <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-repo-structure">
                format expected by Scivision
              </a>{" "}
              <ul>
                <li>
                  This has the benefit of allowing programmatic access to the
                  data using Scivision.Py
                </li>
                <li>
                  {" "}
                  If it is in the Scivision format, make a note of the direct
                  link to the{" "}
                  <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-config-file">
                    data config file
                  </a>{" "}
                  in your repository
                </li>
              </ul>
            </li>
          </ul>
        </Alert>
      </Container>

      <h4>Add your datasource</h4>

      <Container className="text-block">
        {!gh_logged_in ? (
          <div
            className="m-5"
            style={{ display: "flex", "justify-content": "center" }}
          >
            <LoginButton>Log in with GitHub to continue</LoginButton>
          </div>
        ) : (
          <CatalogEntryForm
            gh_logged_in={gh_logged_in}
            schema={datasource_schema}
            uiSchema={{
              "ui:title": " ",
              description: {
                "ui:widget": "textarea",
              },
              tasks: {
                "ui:widget": "checkboxes",
                "ui:options": {
                  inline: true,
                },
              },
              labels_provided: {
                "ui:widget": "radio",
              },
            }}
            formData={JSON.parse(
              sessionStorage.getItem("new-datasource-form-data"),
            )}
            onChange={(e) =>
              sessionStorage.setItem(
                "new-datasource-form-data",
                JSON.stringify(e.formData),
              )
            }
            thumbnailData={sessionStorage.getItem(
              "new-datasource-thumbnail/jpeg",
            )}
            onChangeThumbnail={(imgData) =>
              sessionStorage.setItem("new-datasource-thumbnail/jpeg", imgData)
            }
            catalog_kind="datasource"
            catalog_path="src/scivision/catalog/data/datasources.json"
            thumbnail_directory="src/scivision/catalog/data/thumbnails/datasources"
            download_filename="one-datasource.json"
          />
        )}
        <div className="p-3"></div>
      </Container>
    </>
  );
}
