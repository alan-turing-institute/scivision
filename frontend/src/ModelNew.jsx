import { Alert, Container } from "react-bootstrap";

import CatalogEntryForm, {
  CatalogFormHowItWorksBox,
} from "./CatalogEntryForm.jsx";
import ModelNav from "./ModelNav.jsx";
import { LoginButton } from "./login.jsx";

import model_schema from "./catalog/model_schema.js";

export default function ModelNew({ gh_logged_in }) {
  return (
    <>
      <ModelNav />
      <h3>Add a model to the catalog</h3>

      <h4>What is this?</h4>

      <Container className="text-block">
        <p>
          Use this form to propose a pre-trained model for inclusion in the
          catalog.
        </p>

        <CatalogFormHowItWorksBox />
      </Container>

      <h4>Prerequisites</h4>

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
              Your model is publically avaiable from a source repository or on a
              package server
              <ul>
                <li>
                  The Scivision catalog does not host your model, just a link to
                  it, so it must be publically accessible somewhere
                </li>
                <li>
                  For example, your model may be published on PyPI or have its
                  source code available on GitHub, Gitlab or elsewhere
                </li>
              </ul>
            </li>
            <li>
              Your model includes everything needed to run it, including any
              weights and parameters
              <ul>
                <li>
                  Not <em>just</em> model weights
                </li>
                <li>
                  Note: Models that require training or fitting to data before
                  running can be suggested, but answer 'No' to{" "}
                  <em>Model runs with Scivision?</em> below
                </li>
              </ul>
            </li>
            <li>
              Your model is set up as a Python package, and is installable with
              pip
              <ul>
                <li>
                  Your model could be published to PyPI or another package
                  server, but installing from a direct link to the source
                  repository is also accepted
                </li>
              </ul>
            </li>
            <li>
              {" "}
              <strong>(Optionally)</strong> your model is in the{" "}
              <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-repo-structure">
                correct format for Scivision
              </a>
              <ul>
                <li>
                  This has the benefit of allowing programmatic access to the
                  model through Scivision.Py
                </li>
                <li>
                  {" "}
                  In this case, make a note of the direct link to the{" "}
                  <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-config-file">
                    model config file
                  </a>{" "}
                  in your repository to provide below
                </li>
              </ul>
            </li>
          </ul>
        </Alert>
      </Container>

      <h4>Add your model</h4>

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
            schema={model_schema}
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
              scivision_usable: {
                "ui:widget": "radio",
              },
            }}
            catalog_kind="model"
            catalog_path="scivision/catalog/data/models.json"
            download_filename="one-model.json"
          />
        )}
        <div className="p-3"></div>
      </Container>
    </>
  );
}
