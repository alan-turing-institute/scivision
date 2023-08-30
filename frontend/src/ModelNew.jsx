import { Row, Col } from "react-bootstrap";
import CatalogEntryForm from "./CatalogEntryForm.jsx";
import ModelNav from "./ModelNav.jsx";

import model_schema from "./catalog/model_schema.js";

export default function ModelNew({ gh_logged_in }) {
    return (
        <>
            <ModelNav />
            <h3>Add a model to the catalog</h3>
            <h4>Prerequistes</h4>

            <Row>
                <Col md={{ span:8, offset: 2}}>
                    <ul>
                        <li> The source code of your model is shared in a public repository (GitHub or elsewhere). The Scivision catalog does not host your model source code directly, just some metadata about it, so this must be accessible elsewhere.</li>
                        <li> Your model is in the <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-repo-structure">correct format for Scivision</a></li>
                        <li> Make a note of the direct link to the <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-config-file">model config file</a> in your repository, to use below</li>
                    </ul>
                </Col>
            </Row>

            <h4> Add your model</h4>

            <Row>
                <Col md ={{ span:8, offset: 2}}>
                    <p>Add some details about your model below. Submitting the form will open a pull request (from your GitHub user account) that adds details of your model to the catalog. Further discussion is possible at that point, so it doesn't need to be complete or perfect at this stage.</p>
                    <p>Make sure to <strong>log in with the link above</strong> before completing the form</p>
                </Col>
                <Col md ={{ span:8, offset: 2}}>
                    <CatalogEntryForm
                        gh_logged_in={gh_logged_in}
                        schema={model_schema}
                        catalog_kind="model"
                        catalog_path="scivision/catalog/data/models.json"
                        download_filename="one-model.json"
                    />
                </Col>
            </Row>
        </>
    );
}
