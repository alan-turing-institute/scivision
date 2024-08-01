import { React } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

// Component: List of models or datasources (depending on prop), with
// choice of grid or table view.  One of these views will be rendered,
// depending on the route
//
// route: /model-table, /model-grid, /datasource-table, /datasource-grid etc
//
// * props - { gridRoute, tableRoute }
//   where
//     gridRoute, tableRoute - the route for the grid and table views
export default function CatalogNavBar(props) {
  return (
    <Nav className="mb-2" variant="tabs">
      <Nav.Item>
        <Nav.Link to={props.gridRoute} as={NavLink}>
          <i className="bi bi-grid" />
          {/* Thumbnails*/}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link to={props.tableRoute} as={NavLink}>
          <i className="bi bi-list-ul" />
          {/* Table*/}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="ml-auto">
        <Nav.Link to={props.createNewRoute} as={NavLink}>
          <i className="bi bi-file-earmark-plus" /> Contribute an entry
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
