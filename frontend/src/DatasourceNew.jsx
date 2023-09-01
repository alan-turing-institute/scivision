import { useState, useRef } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import CatalogEntryForm from "./CatalogEntryForm.jsx";
import DatasourceNav from "./DatasourceNav.jsx";
import { LoginButton } from "./login.jsx";

import "bootstrap-icons/font/bootstrap-icons.css";

import datasource_schema from "./catalog/datasource_schema.js";

function ImageUpload() {
  const editor = useRef(null);
  const [haveImage, setHaveImage] = useState(false);
  const [image, setImage] = useState("");

  function handleUpdateImage(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setHaveImage(true);
  }

  return (
    <div
      style={{
        display: "flex",
        "align-items": "stretch",
        "justify-content": "space-between",
      }}
    >
      <div>
        {haveImage ? (
          <AvatarEditor
            ref={editor}
            image={image}
            width={256}
            height={256}
            scale={1.0}
            border={20.0}
          />
        ) : (
          <div
            style={{
              width: "300px",
              "aspect-ratio": "1 / 1",
              "background-color": "#eeeeee",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              padding: "20px",
              "font-size": "small",
            }}
            className="m-1"
          >
            Select a thumbnail image to upload
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          "flex-direction": "column",
          "justify-content": "space-around",
        }}
      >
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleUpdateImage}
          className="my-3"
        />
        <div>
          {" "}
          Zoom: <Form.Control type="range" disabled={!haveImage} />
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => {
            setImage(null);
            setHaveImage(false);
          }}
        >
          Clear selected image
        </Button>
      </div>
      {/*
      <button
        onClick={() => {
          if (editor && haveImage) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            // window.canvas = editor.current.getImage();

            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
            window.canvasScaled = editor.current
              .getImageScaledToCanvas()
              .toDataURL("image/jpeg");
            window.haveImage = haveImage;
          }
        }}
      >
        Save
        </button> */}
    </div>
  );
}

function FormControlNote({ children }) {
  return (
    <Alert variant="info" style={{ "font-size": "small" }}>
      {children}
    </Alert>
  );
}

export default function DatasourceNew({ gh_logged_in }) {
  // const [formData, setFormData] = useState(null);

  return (
    <>
      <DatasourceNav />

      <h3>Add a datasource to the catalog</h3>

      <h4>What is this?</h4>

      <Container className="text-block">
        <p>
          Use this form if you have some data you would like to be included in
          the Datasource catalog.
        </p>

        <Alert variant="secondary">
          <ul>
            <li>
              The Scivision catalogs are stored as plain text (json) files in
              the Scivision GitHub repository.
            </li>
            <li>
              Rather than hand-editing a json file and making the change on
              GitHub yourself, using this form will propose the change
              automatically (it will submit a GitHub pull request on your behalf
              &mdash; logging in will prompt for the permissions needed to do
              this)
            </li>
            <li>
              Further discussion and changes are possible on GitHub at that
              point (incomplete entries or entries needing further discussion
              are fine)
            </li>
            <li>
              After submitting your entry, a maintainer will review and merge
              it, and then it will be included in the catalog
            </li>
          </ul>
        </Alert>
      </Container>

      <h4>Prerequistes</h4>

      <Container className="text-block">
        <Alert variant="secondary">
          <ul className="list-spaced">
            <li>You have a GitHub account</li>
            <ul>
              <li>
                You can sign up for a free account by clicking the Login button
                below and choosing "Create an account" when prompted for your
                credentials
              </li>
            </ul>
            <li>
              {" "}
              Your data is in a publicly accessible location (for example, on{" "}
              <a href="https://zenodo.org/">Zenodo</a>
              ).
            </li>
            <ul>
              <li>
                The Scivision catalog does not host your data directly, just
                some metadata about it, so this must be accessible elsewhere.
              </li>
            </ul>

            <li>
              {" "}
              <strong>(Optionally)</strong> Your data repository is in the{" "}
              <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-repo-structure">
                format expected by Scivision
              </a>{" "}
            </li>
            <ul>
              <li>
                This has the benefit of allowing programmatic access to the data
                using Scivision.Py
              </li>
              <li>
                {" "}
                If it is in the Scivision format, make a note of the direct link
                to the{" "}
                <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-config-file">
                  data config file
                </a>{" "}
                in your repository
              </li>
            </ul>
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
            formData={JSON.parse(sessionStorage.getItem("formData"))}
            onChange={(e) =>
              sessionStorage.setItem("formData", JSON.stringify(e.formData))
            }
            catalog_kind="datasource"
            catalog_path="scivision/catalog/data/datasources.json"
            download_filename="one-datasource.json"
          />
        )}
        <div className="p-3"></div>
      </Container>
    </>
  );
}
