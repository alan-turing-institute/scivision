import { Row, Col } from "react-bootstrap";

import DatasourceNav from "./DatasourceNav.js";
import { Datasource } from "./item_pages.js";

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
