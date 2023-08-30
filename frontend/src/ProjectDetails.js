import { Row, Col } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Link, useParams } from "react-router-dom";
import MarkdownView from 'react-showdown';

import ProjectNav from "./ProjectNav.js";
import { makePopover } from "./GridContents.js"

import {
    model_thumbnails,
    datasource_thumbnails,
    project_thumbnails
} from "./thumbnails.js"

import datasources from './catalog/data/datasources.json';
import models from './catalog/data/models.json';
import projects from './catalog/data/projects.json';

function Project() {
    const { project_name_encoded } = useParams();
    const project_name = decodeURIComponent(project_name_encoded);
    const project = projects.entries.find(ds => ds.name === project_name);
    let model_path = "../model/"
    let data_path = "../datasource/"
    const datasource_links = [];
    const model_links = [];
    for (const model_name of project.models) {
        let full_path = model_path.concat(model_name)
        const model = models.entries.find(model => model.name === model_name);
        let thumbnail = <Link to={full_path}><img src={model_thumbnails[`./${model.name}.jpg`]} className="halfsize_thumbnails" alt={model.name}/></Link>;
        model_links.push(<OverlayTrigger
                             key = {model.name}
                             overlay={makePopover(model)}
                             placement="auto">
                             {thumbnail}
                         </OverlayTrigger>
                        );
    }
    for (const datasource_name of project.datasources) {
        let full_path = data_path.concat(datasource_name)
        const datasource = datasources.entries.find(datasource => datasource.name === datasource_name);
        let thumbnail = <Link to={full_path}><img src={datasource_thumbnails[`./${datasource.name}.jpg`]} className="halfsize_thumbnails" alt={datasource.name}/></Link>;
        datasource_links.push(<OverlayTrigger
                                  key = {datasource.name}
                                  overlay={makePopover(datasource)}
                                  placement="auto">
                                  {thumbnail}
                              </OverlayTrigger>
                             );
    }
    return (
        <>
            <h1>{project.header}</h1>
            <img src={project_thumbnails[`./${project.name}.jpg`]} alt={project.header} />
            <MarkdownView
                markdown={project.page}
                options={{ tables: true, emoji: true }}
            />
            <h2>Associated CV models and data:</h2>
            <dl className="row">
                <dt className="col-sm-3">Models</dt>
                <dd className="col-sm-9">{model_links}</dd>
                <dt className="col-sm-3">Data</dt>
                <dd className="col-sm-9">{datasource_links}</dd>
            </dl>
        </>
    );
}

// Component: Details about a project
// route: /project/:project-name
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
