import { Link, useParams } from 'react-router-dom'
import projects from '../catalog/data/projects.json'

import { ProjectSingleView } from '@/components/SingleView'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Component: Details about a model
// route: /model/:model-name
export default function ProjectDetails() {
    const { project_name_encoded } = useParams()
    const project_name =
        project_name_encoded && decodeURIComponent(project_name_encoded)
    const project = projects.entries.find(
        (project) => project.name === project_name
    )
    return (
        <>
            {project ? (
                <ProjectSingleView
                    name={project.name}
                    key={project.name}
                    description={project.description}
                    tasks={project.tasks}
                    type={'project'}
                    page={project.page}
                    header={project.header}
                    tags={project.tags}
                    models={project.models}
                    datasources={project.datasources}
                    institution={project.institution}
                />
            ) : (
                <p>There is no project with this name.</p>
            )}
            <div className=" border-t-2 border-scipurple">
                <Link
                    to="/project-grid"
                    className="flex gap-2 py-4 no-underline"
                >
                    <ArrowLeftIcon className="w-4" />
                    <span>Back to all projects</span>
                </Link>
            </div>
        </>
    )
}
