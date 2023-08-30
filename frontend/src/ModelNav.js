import CatalogNavBar from "./CatalogNavBar.js"

// Component: Tab-bar for models (grid, table, create etc)
export default function ModelNav() {
    return (<CatalogNavBar
                gridRoute="/model-grid"
                tableRoute="/model-table"
                createNewRoute="/new-model"
            />);
}
