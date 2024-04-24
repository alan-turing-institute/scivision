import Card from '@/components/Card'

import { DataHeader } from '@/components/Typography.js'

import datasources from '../catalog/data/datasources.json'
import { makeExcerpt } from '@/utils/MakeExcerpt'

// Component: Models, thumbnail grid view
// route: /model-grid
export default function DatasourceGrid() {
    return (
        <>
            <DataHeader />

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:gap-x-6 md:grid-cols-4 md:gap-y-12 lg:gap-x-8">
                {datasources.entries.map((ds) => (
                    <Card
                        name={ds.name}
                        key={ds.name}
                        description={makeExcerpt(ds.description)}
                        tasks={ds.tasks}
                        type="datasource"
                    />
                ))}
            </div>
        </>
    )
}
