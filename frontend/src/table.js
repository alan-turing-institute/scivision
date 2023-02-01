import { React } from 'react';

import datasources from './data/datasources.json';
import models from './data/models.json';
import projects from './data/projects.json';
import DataTable from 'react-data-table-component';

import {
    model_thumbnails,  
    datasource_thumbnails, 
    project_thumbnails
} from "./thumbnails.js"

import { TaskBadge } from './badges.js'

// Helper function (used in ModelTable and DatasourceTable -- not the
// corresponding Gridviews) returning a thumbnail element
function renderThumbnailForTable(thumb) {
    if (thumb != undefined) {
        return (
            <img src={thumb}
                 width="128"
                 height="128"
                 className="img-thumbnail"
            />
        );
    } else {
        return (<></>);
    }
}

// Component: Format the element in an 'info box'.
// Used for expanded rows in ModelTable/DatasourceTable
function TableCardDropdown({element}) {
    return (
        <div className="border-bottom">
            <div className="card mt-1 mb-3 bg-light">
                <div className="card-body">
                    <dl className="row">
                        {element}
                    </dl>
                </div>
            </div>
        </div>
    );
}

// Component: Models, table view
// route: /models
export function ModelTable() {
    const columns = [
        {
            name: 'Thumbnail',
            width: "150px",
            selector: row => model_thumbnails[`./${row.name}.jpg`] === undefined,
            sortable: true,
            cell: (row, index, column, id) => {
                const thumb = model_thumbnails[`./${row.name}.jpg`];
                return renderThumbnailForTable(thumb);
            }
        },
        {
            name: "Name",
            sortable: true,
            grow: 0.5,
            selector: row => row.name,
        },
        {
            name: "Tasks",
            selector: row => row.tasks,
            cell: (row, index, column, id) => row.tasks.map(
                (t) => <TaskBadge taskName={t} />
            ),
        },
    ];

    return (
        <DataTable columns={columns} data={models.entries} title=""
                   expandableRowsComponent={(props) => (
                       <TableCardDropdown
                           element={
                               <ModelDefinitionListFragment {...props}/>
                           } />
                   )}
                   expandableRows
                   expandableRowsHideExpander
                   expandOnRowClicked
        />
    );
}

// Component: Datasources, table view
// route: /datasources
export function DatasourceTable() {
    const columns = [
        {
            name: 'Thumbnail',
            width: "150px",
            selector: row => datasource_thumbnails[`./${row.name}.jpg`] === undefined,
            sortable: true,
            cell: (row, index, column, id) => {
                const thumb = datasource_thumbnails[`./${row.name}.jpg`];
                return renderThumbnailForTable(thumb);
            }
        },
        {
            selector: row => row.name,
            name: 'Name',
            sortable: true,
            grow: 0.3
        },
        {
            selector: row => row.tasks,
            name: 'Tasks',
            cell: (row, index, column, id) => row.tasks.map(
                (t) => <TaskBadge taskName={t} />
            )
        },
    ];

    return (
        <DataTable columns={columns} data={datasources.entries} title=""
                   expandableRowsComponent={(props) => (
                       <TableCardDropdown
                           element={
                               <DatasourceDefinitionListFragment {...props}/>
                           } />
                   )}
                   expandableRows
                   expandableRowsHideExpander
                   expandOnRowClicked
        />
    );
}

// Component: Projects, table view
// route: /projects
export function ProjectTable() {
    const columns = [
        {
            name: 'Thumbnail',
            width: "150px",
            selector: row => project_thumbnails[`./${row.name}.jpg`] === undefined,
            sortable: true,
            cell: (row, index, column, id) => {
                const thumb = project_thumbnails[`./${row.name}.jpg`];
                return renderThumbnailForTable(thumb);
            }
        },
        {
            selector: row => row.name,
            name: 'Name',
            sortable: true,
            grow: 0.3
        },
        {
            selector: row => row.tasks,
            name: 'Tasks',
            cell: (row, index, column, id) => row.tasks.map(
                (t) => <TaskBadge taskName={t} />
            )
        },
    ];

    return (
        <DataTable columns={columns} data={projects.entries} title=""
                   expandableRowsComponent={(props) => (
                       <TableCardDropdown
                           element={
                               <ProjectDefinitionListFragment {...props}/>
                           } />
                   )}
                   expandableRows
                   expandableRowsHideExpander
                   expandOnRowClicked
        />
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

// Component: Fragment containing definition items for the expanded
// view of the project table and the page for one project
//
// * data - one project
function ProjectDefinitionListFragment({data}) {
    return (<>
  
                <dt className="col-sm-3">{data.header?data.header:"(none provided)"}</dt>
                <dd className="col-sm-9">{data.description?data.description:"(none provided)"}</dd>

            </>);
}
