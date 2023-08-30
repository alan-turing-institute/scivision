import { Row, Col } from "react-bootstrap";

import ModelNav from "./ModelNav.js";
import { Model } from "./item_pages.js";

export default function ModelDetails() {
    return (
        <>
            <ModelNav />
            <Row className="justify-content-md-center">
                <Col md={{span:8, offset:2}}>
                    <Model />
                </Col>
            </Row>
        </>
    );
}
