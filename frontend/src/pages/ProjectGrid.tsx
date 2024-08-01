import { ProjectCard } from '@/components/Card'

import { ProjectsHeader } from '@/components/Typography'

import projects from '../catalog/data/projects.json'
import { makeExcerpt } from '@/utils/MakeExcerpt'

// Component: Models, thumbnail grid view
// route: /model-grid
export default function ProjectGrid() {
    return (
        <>
            <ProjectsHeader />

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-12 sm:gap-x-6 md:grid-cols-2 md:gap-y-12 lg:gap-x-8">
                {projects.entries.map((project) => (
                    <ProjectCard
                        name={project.name}
                        key={project.name}
                        description={makeExcerpt(project.description)}
                        tasks={project.tasks}
                        type="project"
                        header={project.header}
                    />
                ))}
            </div>
        </>
    )
}
