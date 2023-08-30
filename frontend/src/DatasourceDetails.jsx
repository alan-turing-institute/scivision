import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

import DatasourceNav from "./DatasourceNav.jsx";

import { datasource_thumbnails } from "./thumbnails.js";

import datasources from "./catalog/data/datasources.json";


function Datasource() {
    const { datasource_name_encoded } = useParams();
    const datasource_name = decodeURIComponent(datasource_name_encoded);
    const datasource = datasources.entries.find(ds => ds.name === datasource_name);

    return (<>
                <h3>{datasource.name.charAt(0).toUpperCase() + datasource.name.slice(1)}</h3>
                <img src={datasource_thumbnails[`./${datasource.name}.jpg`]} alt = {datasource.name}/>
                <dl className="row">
                  <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{datasource.description?datasource.description:"(none provided)"}</dd>

                  <dt className="col-sm-3">Location</dt>
                  <dd className="col-sm-9"><a href={datasource.url}>{datasource.url}</a></dd>
                </dl>
            </>);
}

// Component: Details about a datasource
// route: /datasource/:datasource-name
export default function DatasourceDetails() {
    return (
        <>
            <DatasourceNav />
            <Row className="justify-content-md-center">
                <Col md={{span:8, offset:2}}>
                    <Datasource />
                </Col>
            </Row>
        </>
    );
}
