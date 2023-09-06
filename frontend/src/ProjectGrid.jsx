import GridContents from "./GridContents.jsx";
import ProjectNav from "./ProjectNav.jsx";

import projects from "./catalog/data/projects.json";
import { project_thumbnails } from "./thumbnails.js";

function ProjectGridContents() {
  return (
    <GridContents
      catalog={projects}
      thumbnails={project_thumbnails}
      baseRoute="/project"
    />
  );
}

// Component: Projects, thumbnail grid view
// route: /project-grid
export default function ProjectGrid() {
  return (
    <>
      <ProjectNav />
      <h3>Projects using Scivision</h3>
      <ProjectGridContents />
    </>
  );
}
