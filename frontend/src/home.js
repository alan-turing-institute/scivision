import { Link } from "react-router-dom";

import { React } from 'react';
import datasources from './data/datasources.json';
import models from './data/models.json';
import projects from './data/projects.json';

import { sample_without_replacement } from "./utils.js";

import {
    model_thumbnails, 
    datasource_thumbnails, 
    project_thumbnails
} from "./thumbnails.js"

import { makeThumbnail } from "./grid.js"

// Component: The home page
// route: /
export function Home() {

    // pick three random models and datasources (with thumbnails)
    //
    const models_sample = sample_without_replacement(
        models.entries, 3
    );
    const datasources_sample = sample_without_replacement(
        datasources.entries, 3
    );
    const projects_sample = sample_without_replacement(
        projects.entries, 3
    );

    return (
        <>
            <div className="mb-5">
                <h4>Models</h4>

                <div className="w-75 mx-auto m-3">

                    <p className="small">Pre-trained computer vision models that can be loaded and run with the <Link to="scivisionpy">Scivision Python library.</Link></p>

                    <div className="card-deck">
                        {
                            models_sample.map((model) => (
                                <div className="card" key = {model.name}>
                                    {
                                        makeThumbnail({
                                            getThumbnail: (data) => model_thumbnails[`./${data.name}.jpg`],
                                            getLink: (data) => "/model/" + encodeURIComponent(data.name),
                                            doPopover: true,
                                        })(model)
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <p className="p-1 pl-2 small bg-highlight">
                        Discover more models in the complete <Link to="model-grid"><strong>model catalog</strong></Link>
                    </p>
                </div>
            </div>


            <div className="mb-5">
                <h4>Data</h4>

                <div className="w-75 mx-auto m-3">
                    <p className="small">Curated image datasets from diverse scientific domains, suitable for a variety of computer vision tasks and loadable as array data via the numerical Python stack.</p>
                    <div className="card-deck">
                        {
                            datasources_sample.map((ds) => (
                                <div className="card" key={ds.name}>
                                    {
                                        makeThumbnail({
                                            getThumbnail: (data) => datasource_thumbnails[`./${data.name}.jpg`],
                                            getLink: (data) => "/datasource/" + encodeURIComponent(data.name),
                                            doPopover: true,
                                        })(ds)
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-highlight">
                        <p className="p-1 pl-2 small">
                            Explore the full <Link to="datasource-grid"><strong>datasource catalog</strong></Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-5">
                <h4>Projects</h4>

                <div className="w-75 mx-auto m-3">
                    <p className="small">Research projects that have contributed scientific image data and computer vision models to the Scivision catalog.</p>
                    <div className="card-deck">
                        {
                            projects_sample.map((proj) => (
                                <div className="card" key={proj.name}>
                                    {
                                        makeThumbnail({
                                            getThumbnail: (project) => project_thumbnails[`./${project.name}.jpg`],
                                            getLink: (project) => "/project/" + encodeURIComponent(project.name),
                                            doPopover: true,
                                        })(proj)
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-highlight">
                        <p className="p-1 pl-2 small">
                            Explore the full <Link to="project-grid"><strong>project catalog</strong></Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}
