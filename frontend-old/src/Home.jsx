import { React } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { makeThumbnail } from "./GridContents.jsx";

import { sample_without_replacement } from "./utils.js";

import {
  model_thumbnails,
  datasource_thumbnails,
  project_thumbnails,
} from "./thumbnails.js";

import datasources from "./catalog/data/datasources.json";
import models from "./catalog/data/models.json";
import projects from "./catalog/data/projects.json";

// Component: The home page
// route: /
export default function Home() {
  // pick three random models and datasources (with thumbnails)
  //
  const models_sample = sample_without_replacement(models.entries, 3);
  const datasources_sample = sample_without_replacement(datasources.entries, 3);
  const projects_sample = sample_without_replacement(projects.entries, 3);

  return (
    <>
      <Container>
        <h4>Models</h4>
        <div className="w-75 mx-auto m-3">
          <p className="small">
            Pre-trained computer vision models that can be loaded and run with
            the <Link to="scivisionpy">Scivision Python library.</Link>
          </p>

          <Row xs={1} sm={3} className="justify-content-md-center">
            {models_sample.map((model) => (
              <Col key={model.name}>
                <Card className="mb-3 mb-sm-0">
                  {makeThumbnail({
                    getThumbnail: (data) =>
                      model_thumbnails[`./${data.name}.jpg`],
                    getLink: (data) =>
                      "/model/" + encodeURIComponent(data.name),
                    doPopover: true,
                  })(model)}
                </Card>
              </Col>
            ))}
          </Row>
          <p className="p-1 pl-2 small bg-highlight">
            Discover more models in the complete{" "}
            <Link to="model-grid">
              <strong>model catalog</strong>
            </Link>
          </p>
        </div>
      </Container>

      <Container>
        <h4>Data</h4>
        <div className="w-75 mx-auto m-3">
          <p className="small">
            Curated image datasets from diverse scientific domains, suitable for
            a variety of computer vision tasks.
          </p>
          <Row xs={1} sm={3} className="justify-content-md-center">
            {datasources_sample.map((ds) => (
              <Col key={ds.name}>
                <Card className="mb-3 mb-sm-0">
                  {makeThumbnail({
                    getThumbnail: (data) =>
                      datasource_thumbnails[`./${data.name}.jpg`],
                    getLink: (data) =>
                      "/datasource/" + encodeURIComponent(data.name),
                    doPopover: true,
                  })(ds)}
                </Card>
              </Col>
            ))}
          </Row>
          <p className="p-1 pl-2 small bg-highlight">
            Explore the full{" "}
            <Link to="datasource-grid">
              <strong>datasource catalog</strong>
            </Link>
          </p>
        </div>
      </Container>

      <Container>
        <h4>Projects</h4>

        <div className="w-75 mx-auto m-3">
          <p className="small">
            Research projects that have contributed scientific image data and
            computer vision models to the Scivision catalog.
          </p>
          <Row xs={1} sm={3} className="justify-content-md-center">
            {projects_sample.map((proj) => (
              <Col key={proj.name}>
                <Card className="mb-3 mb-sm-0">
                  {makeThumbnail({
                    getThumbnail: (project) =>
                      project_thumbnails[`./${project.name}.jpg`],
                    getLink: (project) =>
                      "/project/" + encodeURIComponent(project.name),
                    doPopover: true,
                  })(proj)}
                </Card>
              </Col>
            ))}
          </Row>
          <p className="p-1 pl-2 small bg-highlight">
            Explore the full{" "}
            <Link to="project-grid">
              <strong>project catalog</strong>
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
