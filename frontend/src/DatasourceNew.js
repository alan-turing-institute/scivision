import { useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropzone from "react-dropzone";
import AvatarEditor from "react-avatar-editor";
import CatalogEntryForm from "./CatalogEntryForm.js";
import DatasourceNav from "./DatasourceNav.js";

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
        <div>
            { haveImage ?
              (<AvatarEditor
                   ref={editor}
                   image={image}
                   width={256}
                   height={256}
                   scale={1.0}
                   border={20.0}
               />) :
              (<div
                   style={{
                       "width": "296px",
                       "height": "296px",
                       "background-color": "#eeeeee",
                       "border-style": "inset",
                       "border-width": "2px",
                       "border-color": "lightGray",
                       "display": "flex",
                       "align-items": "center",
                       "justify-content": "center",
                       "padding": "20px",
                       "font-size": "small"
                   }}
                   className="m-1"
               >
                   Select a thumbnail image to upload below
               </div>)
            }
            <Form.Control type="range" disabled={!haveImage} width=""/>
            <Form.Control type="file" accept="image/*" onChange={handleUpdateImage} className="my-3"/>
            <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                    setImage(null);
                    setHaveImage(false);
                }}>
                Clear selected image
            </Button>
            <button onClick={() => {
                        if (editor) {
                            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
                            // drawn on another canvas, or added to the DOM.
                            // window.canvas = editor.current.getImage();

                            // If you want the image resized to the canvas size (also a HTMLCanvasElement)
                            window.canvasScaled = editor.current.getImageScaledToCanvas().toDataURL("image/jpeg");
                            window.haveImage = haveImage;
                        }
                    }}>Save</button>

        </div>
    );
}

export default function DatasourceNew({ gh_logged_in }) {
    return (
        <>
            <DatasourceNav />

            <h3>Add a datasource to the catalog</h3>
            <h4>Prerequistes</h4>

            <Row>
                <Col md={{ span:8, offset: 2}}>
                    <ul>
                        <li> Your data is in a publicly accessible location (for example, on <a href="https://zenodo.org/">Zenodo</a>). The Scivision catalog does not host your data directly, just some metadata about it, so this must be accessible elsewhere.</li>
                        <li> Your data repository is in the <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-repo-structure">format expected by Scivision</a> </li>
                        <li> Make a note of the direct link to the <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-config-file">data config file</a> in your repository, to use below</li>
                    </ul>
                </Col>
            </Row>

            <h4> Add your datasource</h4>

            <Row>
                <Col md={{ span:8, offset: 2}}>
                    <p>Add some details about your data below. Submitting the form will open a pull request (from your GitHub user account) that adds details of your datasource to the catalog. Further discussion is possible at that point, so it doesn't need to be complete or perfect at this stage.</p>

                    <p>Make sure to <strong>log in with the link above</strong> before completing the form</p>
                </Col>

                <Col md={{ span:8, offset: 2}}>
                    <ImageUpload />
                </Col>

                <Col md={{ span:8, offset: 2}}>
                    <CatalogEntryForm
                        gh_logged_in={gh_logged_in}
                        schema={datasource_schema}
                        catalog_kind="datasource"
                        catalog_path="scivision/catalog/data/datasources.json"
                        download_filename="one-datasource.json"
                    />
                </Col>
            </Row>
        </>
    );
}
