import DataTable from 'react-data-table-component'
import { ProjectsHeader } from '@/components/Typography'

import { extractThumbnailFromName } from '@/utils/ExtractThumbnails'
import {
    renderThumbnailForTable,
    TableCardDropdown,
} from '../table_helpers.jsx'
import { TaskBadge } from '@/components/Badges'

import projects from '../catalog/data/projects.json'

// Component: Fragment containing definition items for the expanded
// view of the project table and the page for one project
//
// * data - one project
function ProjectDefinitionList({ data }) {
    return (
        <dl className="row">
            <dt className="col-sm-3">
                {data.header ? data.header : '(none provided)'}
            </dt>
            <dd className="col-sm-9">
                {data.description ? data.description : '(none provided)'}
            </dd>
        </dl>
    )
}

// Component: Projects, table view
// route: /projects
function ProjectTableContents() {
    const columns = [
        {
            name: 'Thumbnail',
            width: '150px',
            selector: (row) =>
                extractThumbnailFromName('project', row.name) === undefined,
            sortable: true,
            cell: (row) => {
                const thumb = extractThumbnailFromName('project', row.name)
                return renderThumbnailForTable(thumb, row.name, 'project')
            },
        },
        {
            selector: (row) => row.name,
            name: 'Name',
            sortable: true,
            grow: 0.3,
        },
        {
            selector: (row) => row.tasks,
            name: 'Tasks',
            cell: (row) =>
                row.tasks.map((t) => <TaskBadge key={t} taskName={t} />),
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={projects.entries}
            title=""
            expandableRowsComponent={(props) => (
                <TableCardDropdown
                    element={<ProjectDefinitionList {...props} />}
                />
            )}
            expandableRows
            expandableRowsHideExpander
            expandOnRowClicked
        />
    )
}

// Component: Projects, table view
// route: /projects
export default function ProjectTable() {
    return (
        <>
            <ProjectsHeader />
            <ProjectTableContents />
        </>
    )
}
