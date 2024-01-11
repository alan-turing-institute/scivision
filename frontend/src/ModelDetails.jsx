import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ModelNav from "./ModelNav.jsx";
import { model_thumbnails } from "./thumbnails.js";

import models from "./catalog/data/models.json";

function Model() {
  const { model_name_encoded } = useParams();
  const model_name = decodeURIComponent(model_name_encoded);
  const model = models.entries.find((model) => model.name === model_name);

  const scivision_code = model.scivision_usable ? (
    <>
      <dt className="col-sm-3">
        Use me with{" "}
        <a href="https://scivision.readthedocs.io/en/latest/api.html">
          Scivision.Py
        </a>
        :
      </dt>
      <dd className="col-sm-9">
        <p>
          <code>from scivision import load_pretrained_model</code>
        </p>
        <p>
          <code>load_pretrained_model("{model.url}")</code>
        </p>
      </dd>
    </>
  ) : (
    <></>
  );

  // TODO: make the install instructions model specific

  return (
    <>
      <h3>{model.name.charAt(0).toUpperCase() + model.name.slice(1)}</h3>
      <img src={model_thumbnails[`./${model.name}.jpg`]} alt={model.name} />
      <dl className="row">
        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">
          {model.description ? model.description : "(none provided)"}
        </dd>

        <dt className="col-sm-3">Homepage</dt>
        <dd className="col-sm-9">
          <a href={model.url}>{model.url}</a>
        </dd>

        <dt className="col-sm-3">Install with pip</dt>
        <dd className="col-sm-9">
          <div>
            <code>pip install {model.pkg_url}</code>
          </div>
        </dd>
        {scivision_code}
      </dl>
    </>
  );
}

// Component: Details about a model
// route: /model/:model-name
export default function ModelDetails() {
  return (
    <>
      <ModelNav />
      <Row className="justify-content-md-center">
        <Col md={{ span: 8, offset: 2 }}>
          <Model />
        </Col>
      </Row>
    </>
  );
}
