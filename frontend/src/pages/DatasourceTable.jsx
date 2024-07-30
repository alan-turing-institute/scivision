import { global_CheckDatasetReport } from '@/consts/check_datasets.js'

import DataTable from 'react-data-table-component'

import { extractThumbnailFromName } from '@/utils/ExtractThumbnails'
import {
    renderThumbnailForTable,
    TableCardDropdown,
} from '../table_helpers.jsx'
import { TaskBadge } from '@/components/Badges'

import datasources from '../catalog/data/datasources.json'
import { DataHeader } from '@/components/Typography'

// Component: Fragment containing definition items for the expanded
// view of the datasource table and the page for one datasource
//
// * data - one datasource
function DatasourceDefinitionList({ data }) {
    return (
        <dl className="row">
            <dt className="col-sm-3">Description</dt>
            <dd className="col-sm-9">
                {data.description ? data.description : '(none provided)'}
            </dd>

            <dt className="col-sm-3">Location</dt>
            <dd className="col-sm-9">
                <a href={data.url}>{data.url}</a>
            </dd>
        </dl>
    )
}

// Component: Datasources, table view
// route: /datasources
function DatasourceTableContents() {
    const datasourceChecksReport = global_CheckDatasetReport

    function datasourceCheckResult(name) {
        if (datasourceChecksReport !== null) {
            const report = datasourceChecksReport.report[name]
            if (report !== undefined) {
                return report.check_result
            } else {
                return 'Unknown'
            }
        } else {
            return 'Unknown'
        }
    }

    function datasourceCheckTime() {
        if (datasourceChecksReport) {
            var time = new Date(datasourceChecksReport.time)
            return time.toUTCString()
        } else {
            return '(never)'
        }
    }

    function datasourceValidationTimeString() {
        return `last run ${datasourceCheckTime()}`
    }

    const columns = [
        {
            name: 'Thumbnail',
            width: '150px',
            selector: (row) =>
                extractThumbnailFromName('datasource', row.name) === undefined,
            sortable: true,
            cell: (row) => {
                const thumb = extractThumbnailFromName('datasource', row.name)
                return renderThumbnailForTable(thumb, row.name, 'datasource')
            },
        },
        {
            selector: (row) => row.name,
            name: 'Name',
            sortable: true,
            grow: 0.5,
        },
        {
            selector: (row) => row.tasks,
            name: 'Tasks',
            cell: (row) =>
                row.tasks.map((t) => <TaskBadge key={t} taskName={t} />),
        },
        {
            selector: (row) => {
                const result = datasourceCheckResult(row.name)

                if (result === 'Pass') {
                    return (
                        <img
                            src="https://img.shields.io/badge/scivision_metadata-pass-green"
                            title="The metadata for this datasource was successfully loaded by scivision, from the location in the catalog"
                        />
                    )
                } else if (result === 'Fail') {
                    return (
                        <img
                            src="https://img.shields.io/badge/scivision_metadata-fail-red"
                            title="Scivision metadata (yaml) file for this datasource failed to load or was missing at the indicated location"
                        />
                    )
                } else {
                    return (
                        <img
                            src="https://img.shields.io/badge/scivision_metadata-unknown-lightgray"
                            title="Could not access the result for this validation check"
                        />
                    )
                }
            },
            name: (
                <span
                    className="tooltip-available"
                    title={datasourceValidationTimeString()}
                >
                    Validation checks
                </span>
            ),
            grow: 0.5,
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={datasources.entries}
            defaultSortFieldId={2} 
            title=""
            expandableRowsComponent={(props) => (
                <TableCardDropdown
                    element={<DatasourceDefinitionList {...props} />}
                />
            )}
            expandableRows
            expandableRowsHideExpander
            expandOnRowClicked
        />
    )
}

// Component: Models, table view
// route: /datasources
export default function DatasourceTable() {
    return (
        <>
            <DataHeader />
            <DatasourceTableContents />
        </>
    )
}
