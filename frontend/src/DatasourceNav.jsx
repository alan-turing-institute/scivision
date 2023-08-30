import CatalogNavBar from "./CatalogNavBar.jsx"

// Component: Tab-bar for datasources (grid, table, create etc)
export default function DatasourceNav() {
    return (
        <CatalogNavBar
            gridRoute="/datasource-grid"
            tableRoute="/datasource-table"
            createNewRoute="/new-datasource"
        />
    );
}
