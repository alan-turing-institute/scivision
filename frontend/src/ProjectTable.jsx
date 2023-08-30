import DataTable from 'react-data-table-component';

import ProjectNav from "./ProjectNav.jsx"
import { project_thumbnails } from "./thumbnails.js"
import { renderThumbnailForTable, TableCardDropdown } from "./table_helpers.jsx"
import { TaskBadge } from "./badges.jsx";

import projects from './catalog/data/projects.json';

// Component: Fragment containing definition items for the expanded
// view of the project table and the page for one project
//
// * data - one project
function ProjectDefinitionList({data}) {
    return (<dl className="row">
                <dt className="col-sm-3">{data.header?data.header:"(none provided)"}</dt>
                <dd className="col-sm-9">{data.description?data.description:"(none provided)"}</dd>
            </dl>);
}

// Component: Projects, table view
// route: /projects
function ProjectTableContents() {
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
                (t) => <TaskBadge key={t} taskName={t} />
            )
        },
    ];

    return (
        <DataTable columns={columns} data={projects.entries} title=""
                   expandableRowsComponent={(props) => (
                       <TableCardDropdown
                           element={
                               <ProjectDefinitionList {...props}/>
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
export default function ProjectTable() {
    return (<>
                <ProjectNav />
                <ProjectTableContents />
            </>);
}
