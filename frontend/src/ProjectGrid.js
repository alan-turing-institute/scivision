import GridContents from "./grid.js"
import ProjectNav from "./ProjectNav.js"

import projects from './catalog/data/projects.json';
import { project_thumbnails } from "./thumbnails.js"

function ProjectGridContents() {
    return (<GridContents
                catalog={projects}
                thumbnails={project_thumbnails}
                baseRoute="/project"
            />);
}

// Component: Projects, thumbnail grid view
// route: /project-grid
export default function ProjectGrid() {
    return (<>
                <ProjectNav />
                <ProjectGridContents />
            </>);
}
