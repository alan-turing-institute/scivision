import Card from '@/components/Card'

import { ModelsHeader } from '@/components/Typography.js'

import models from '../catalog/data/models.json'
import { makeExcerpt } from '@/utils/MakeExcerpt'

// Component: Models, thumbnail grid view
// route: /model-grid
export default function ModelGrid() {
    return (
        <>
            <ModelsHeader />

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:gap-x-6 md:grid-cols-4 md:gap-y-12 lg:gap-x-8">
                {models.entries.map((model) => (
                    <Card
                        name={model.name}
                        key={model.name}
                        description={makeExcerpt(model.description)}
                        tasks={model.tasks}
                        scivision_usable={model.scivision_usable}
                        type="model"
                    />
                ))}
            </div>
        </>
    )
}
