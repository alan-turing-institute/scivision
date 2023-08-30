import { Row, Col } from "react-bootstrap";

import ProjectNav from "./ProjectNav.js";
import { Project } from "./item_pages.js";

export default function ProjectDetails() {
    return (
        <>
            <ProjectNav />
            <Row className="justify-content-md-center">
                <Col md={{span:8, offset:2}}>
                    <Project />
                </Col>
            </Row>
        </>
    );
}
