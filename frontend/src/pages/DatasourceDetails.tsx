import { Link, useParams } from 'react-router-dom'

import datasources from '../catalog/data/datasources.json'

import { DatasourceSingleView } from '@/components/SingleView'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Component: Details about a model
// route: /model/:model-name
export default function DatasourceDetails() {
    const { datasource_name_encoded } = useParams()
    const ds_name =
        datasource_name_encoded && decodeURIComponent(datasource_name_encoded)
    const ds = datasources.entries.find((ds) => ds.name === ds_name)
    console.log(ds)
    return (
        <>
            {ds ? (
                <DatasourceSingleView
                    name={ds.name}
                    key={ds.name}
                    description={ds.description}
                    tasks={ds.tasks}
                    labels_provided={ds.labels_provided}
                    type="datasource"
                    url={ds.url}
                    tags={ds.tags}
                    domains={ds.domains}
                    institution={ds.institution}
                />
            ) : (
                <p>There is no data source with this name.</p>
            )}
            <div className=" border-t-2 border-scipurple">
                <Link
                    to="/datasource-grid"
                    className="flex gap-2 py-4 no-underline"
                >
                    <ArrowLeftIcon className="w-4" />
                    <span>Back to all data sources</span>
                </Link>
            </div>
        </>
    )
}
