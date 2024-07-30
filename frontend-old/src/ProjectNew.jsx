import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CatalogEntryForm from "./CatalogEntryForm.jsx";
import ProjectNav from "./ProjectNav.jsx";

import project_schema from "./catalog/project_schema.js";

export default function ProjectNew({ gh_logged_in }) {
  return (
    <>
      <ProjectNav />
      <h3>Create a Scivision project page for your research</h3>
      <h4>Prerequistes</h4>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <ul>
            <li>
              You have already added the datasources used in your project to the{" "}
              <Link to="../datasource-grid">Scivision data catalog</Link>. Click
              here to add a <Link to="../new-datasource">new datasource</Link>.
            </li>
            <li>
              You have already added the computer vision models used in your
              project to the{" "}
              <Link to="../model-grid">Scivision model catalog</Link>. Click
              here to add a <Link to="../new-model">new model</Link>.
            </li>
          </ul>
        </Col>
      </Row>

      <h4> Add your project</h4>

      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <p>
            Add the details that will form the basis of your project's Scivision
            page below. You can format the text with{" "}
            <a href="https://daringfireball.net/projects/markdown/basics">
              markdown
            </a>
            , which will allow you to include any headers, lists and links you
            feel are appropriate. You can then select the models and data you
            added.
          </p>
          <p>
            Submitting the form will open a pull request (from your GitHub user
            account) that adds details of your project page to Scivision.
            Further discussion is possible at that point, so it doesn't need to
            be complete or perfect at this stage.
          </p>
          <p>
            Make sure to <strong>log in with the link above</strong> before
            completing the form
          </p>
        </Col>
        <Col md={{ span: 8, offset: 2 }}>
          <CatalogEntryForm
            gh_logged_in={gh_logged_in}
            schema={project_schema}
            uiSchema={{ page: { "ui:widget": "textarea" } }}
            formData={JSON.parse(
              sessionStorage.getItem("new-project-form-data"),
            )}
            onChange={(e) =>
              sessionStorage.setItem(
                "new-project-form-data",
                JSON.stringify(e.formData),
              )
            }
            thumbnailData={sessionStorage.getItem("new-project-thumbnail/jpeg")}
            onChangeThumbnail={(imgData) =>
              sessionStorage.setItem("new-project-thumbnail/jpeg", imgData)
            }
            catalog_kind="project"
            catalog_path="src/scivision/catalog/data/projects.json"
            thumbnail_directory="src/scivision/catalog/data/thumbnails/projects/"
            download_filename="one-project.json"
          />
        </Col>
      </Row>
    </>
  );
}
