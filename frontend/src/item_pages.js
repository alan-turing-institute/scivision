import { Link, useParams } from "react-router-dom";

import { React } from 'react';

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import datasources from './data/datasources.json';
import models from './data/models.json';
import projects from './data/projects.json';
import MarkdownView from 'react-showdown';

import {
    model_thumbnails, 
    datasource_thumbnails, 
    project_thumbnails
} from "./thumbnails.js"

import { makePopover } from "./grid.js"


// Component: Details about a model
// route: /model/:model-name
export function Model() {
    const { model_name_encoded } = useParams();
    const model_name = decodeURIComponent(model_name_encoded);
    const model = models.entries.find(model => model.name == model_name);

    return (<>
                <h3>{model.name}</h3>
                <img src={model_thumbnails[`./${model.name}.jpg`]} />
                <dl className="row">
                    <ModelDefinitionListFragment data={model} />
                </dl>
            </>);
}

// Component: Details about a datasource
// route: /datasource/:datasource-name
export function Datasource() {
    const { datasource_name_encoded } = useParams();
    const datasource_name = decodeURIComponent(datasource_name_encoded);
    const datasource = datasources.entries.find(ds => ds.name == datasource_name);

    return (<>
                <h3>{datasource.name}</h3>
                <img src={datasource_thumbnails[`./${datasource.name}.jpg`]} />
                <dl className="row">
                    <DatasourceDefinitionListFragment data={datasource} />
                </dl>
            </>);
}

// Component: Details about a project
// route: /project/:project-name
export function Project() {
  const { project_name_encoded } = useParams();
  const project_name = decodeURIComponent(project_name_encoded);
  const project = projects.entries.find(ds => ds.name == project_name);
  let model_path = "../model/"
  let data_path = "../datasource/"
  const datasource_links = [];
  const model_links = [];
  for (const model_name of project.models) {
    let full_path = model_path.concat(model_name)
    const model = models.entries.find(model => model.name == model_name);
    let thumbnail = <Link to={full_path}><img src={model_thumbnails[`./${model.name}.jpg`]} class="halfsize_thumbnails"/></Link>;
    model_links.push(<OverlayTrigger
                        overlay={makePopover(model)}
                        placement="auto">
                        {thumbnail}
                     </OverlayTrigger>
                    );
  }
  for (const datasource_name of project.datasources) {
    let full_path = data_path.concat(datasource_name)
    const datasource = datasources.entries.find(datasource => datasource.name == datasource_name);
    let thumbnail = <Link to={full_path}><img src={datasource_thumbnails[`./${datasource.name}.jpg`]} class="halfsize_thumbnails"/></Link>;
    datasource_links.push(<OverlayTrigger
                            overlay={makePopover(datasource)}
                            placement="auto">
                            {thumbnail}
                            </OverlayTrigger>
                          );
  }
    return (
      <>
          <h1>{project.header}</h1>
          <img src={project_thumbnails[`./${project.name}.jpg`]} />
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

// Component: Fragment containing definition items for the expanded
// view of the model table, and the model page
//
// * data - one model
function ModelDefinitionListFragment({data}) {
    return (<>
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{data.description?data.description:"(none provided)"}</dd>

                <dt className="col-sm-3">Homepage</dt>
                <dd className="col-sm-9"><a href={data.url}>{data.url}</a></dd>

                <dt className="col-sm-3">Install with pip</dt>
                <dd className="col-sm-9">
                    <div><code>pip install {data.pkg_url}</code></div>
                </dd>
            </>);
}

// Component: Fragment containing definition items for the expanded
// view of the datasource table and the page for one datasource
//
// * data - one datasource
function DatasourceDefinitionListFragment({data}) {
    return (<>
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{data.description?data.description:"(none provided)"}</dd>

                <dt className="col-sm-3">Location</dt>
                <dd className="col-sm-9"><a href={data.url}>{data.url}</a></dd>
            </>);
}

