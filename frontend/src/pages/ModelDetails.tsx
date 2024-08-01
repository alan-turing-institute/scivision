import { Link, useParams } from 'react-router-dom'

import models from '../catalog/data/models.json'

import { ModelSingleView } from '@/components/SingleView'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Component: Details about a model
// route: /model/:model-name
export default function ModelDetails() {
    const { model_name_encoded } = useParams()
    const model_name =
        model_name_encoded && decodeURIComponent(model_name_encoded)
    const model = models.entries.find((model) => model.name === model_name)
    return (
        <>
            {model ? (
                <ModelSingleView
                    name={model.name}
                    key={model.name}
                    description={model.description}
                    tasks={model.tasks}
                    scivision_usable={model.scivision_usable}
                    type="model"
                    url={model.url}
                    pkg_url={model.pkg_url}
                />
            ) : (
                <p>There is no model with this name.</p>
            )}
            <div className=" border-t-2 border-scipurple">
                <Link to="/model-grid" className="flex gap-2 py-4 no-underline">
                    <ArrowLeftIcon className="w-4" />
                    <span>Back to all models</span>
                </Link>
            </div>
        </>
    )
}
