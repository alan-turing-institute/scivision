import CatalogNavBar from "./CatalogNavBar.jsx"

// Component: Tab-bar for projects (grid, table, create etc)
export default function ProjectNav() {
    return (
        <CatalogNavBar
            gridRoute="/project-grid"
            tableRoute="/project-table"
            createNewRoute="/new-project"
        />
    );
}
