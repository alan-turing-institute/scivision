import { ProjectTableContents } from "./table.js"
import ProjectNav from "./ProjectNav.js"

// Component: Projects, table view
// route: /projects
export default function ProjectTable() {
    return (<>
                <ProjectNav />
                <ProjectTableContents />
            </>);
}
