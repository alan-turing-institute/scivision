import { NavLink } from "react-router-dom";

import { React } from 'react';
import { Nav } from "react-bootstrap";

// Component: List of models or datasources (depending on prop), with
// choice of grid or table view.  One of these views will be rendered,
// depending on the route
//
// route: /model-table, /model-grid, /datasource-table, /datasource-grid
//
// * props - { gridRoute, tableRoute }
//   where
//     gridRoute, tableRoute - the route for the grid and table views
function CatalogNavBar(props) {
    return (
        <Nav className="mb-2" variant="tabs">
            <Nav.Item>
                <Nav.Link to={props.gridRoute} as={NavLink}>
                    <i className="bi bi-grid" />{/* Thumbnails*/}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link to={props.tableRoute} as={NavLink}>
                    <i className="bi bi-list-ul" />{/* Table*/}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item className="ml-auto">
                <Nav.Link to={props.createNewRoute} as={NavLink}>
                    <i className="bi bi-file-earmark-plus" /> Create new entry
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}


// Component: Tab-bar for models (grid, table, create etc)
export function ModelNav() {
    return (
        <>
            <CatalogNavBar
                gridRoute="/model-grid"
                tableRoute="/model-table"
                createNewRoute="/new-model"
            />
        </>
    );
}

// Component: Tab-bar for datasources (grid, table, create etc)
export function DatasourceNav() {
    return (
        <CatalogNavBar
            gridRoute="/datasource-grid"
            tableRoute="/datasource-table"
            createNewRoute="/new-datasource"
        />
    );
}

// Component: Tab-bar for projects (grid, table, create etc)
export function ProjectNav() {
    return (
        <CatalogNavBar
            gridRoute="/project-grid"
            tableRoute="/project-table"
            createNewRoute="/new-project"
        />
    );
}