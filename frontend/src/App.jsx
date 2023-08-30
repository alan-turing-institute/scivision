import "./App.css";

import { React, useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";

import "bootstrap-icons/font/bootstrap-icons.css";

import { GH_TOKEN_KEY } from "./config.js";

import { Login, LoginStatusLink } from "./login.jsx";

import Home from "./Home.jsx";
import About from "./About.jsx";

import ModelGrid from "./ModelGrid.jsx";
import ModelTable from "./ModelTable.jsx";
import ModelDetails from "./ModelDetails.jsx";
import ModelNew from "./ModelNew.jsx";

import DatasourceGrid from "./DatasourceGrid.jsx";
import DatasourceTable from "./DatasourceTable.jsx";
import DatasourceDetails from "./DatasourceDetails.jsx";
import DatasourceNew from "./DatasourceNew.jsx";

import ProjectGrid from "./ProjectGrid.jsx";
import ProjectTable from "./ProjectTable.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import ProjectNew from "./ProjectNew.jsx";

import ScivisionPy from "./ScivisionPy.jsx";
import Community from "./Community.jsx";

// Component: The app
//
// Display the header and sidebar, and handle routing with React Router
function App() {
  const gh_token = sessionStorage[GH_TOKEN_KEY];
  const [gh_logged_in, set_gh_logged_in] = useState(!!gh_token);
  const location = useLocation();
  const location_root = location.pathname.split("/")[1]; // path starts with a '/'

  // A few functions to help determine which navigation items to show
  // as selected

  function model_tab_active() {
    return (
      location_root === "model-grid" ||
      location_root === "model-table" ||
      location_root === "new-model" ||
      location_root === "model"
    );
  }

  function datasource_tab_active() {
    return (
      location_root === "datasource-grid" ||
      location_root === "datasource-table" ||
      location_root === "new-datasource" ||
      location_root === "datasource"
    );
  }

  function project_tab_active() {
    return (
      location_root === "project-grid" ||
      location_root === "project-table" ||
      location_root === "new-project" ||
      location_root === "project"
    );
  }

  function any_catalog_active() {
    return (
      model_tab_active() || datasource_tab_active() || project_tab_active()
    );
  }

  return (
    <div className="app">
      {/* Main header (Navbar used as a convenient 'banner'
          element, but does not actually contain navigation
          links) */}
      <Container fluid className="bg-light p-0">
        <Container>
          <Navbar expand="md flex-nowrap">
            <Navbar.Brand>
              <Nav.Link to="" as={NavLink} className="p-0 ">
                <img
                  src="https://github.com/alan-turing-institute/scivision/blob/main/imgs/logo_name.png?raw=true"
                  className="brandLogo"
                  alt="Scivision"
                />
              </Nav.Link>
            </Navbar.Brand>
            <span>
              <a href="https://github.com/alan-turing-institute/scivision">
                <i
                  className="bi bi-github"
                  aria-label="GitHub"
                  style={{ fontSize: "2.5rem", color: "Black" }}
                ></i>
              </a>
            </span>
          </Navbar>

          {/* Navigation bar */}
          <Navbar collapseOnSelect expand="md" className="px-0">
            <Container fluid className="p-0">
              <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="ml-auto"
              />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link to="" as={NavLink} eventKey="home">
                    Home
                  </Nav.Link>

                  <Nav.Link to="about" as={NavLink} eventKey="about">
                    About
                  </Nav.Link>

                  {/* We want to have the Datasource and Model menu items
                      highlighted (as if visited) for any of the routes
                      associated with these things.  This is the meaning of the
                      expression given for 'active' below. There is probably a
                      better way of doing this... */}

                  <NavDropdown title="Catalog" active={any_catalog_active()}>
                    <NavDropdown.Item
                      to="model-grid"
                      as={NavLink}
                      active={model_tab_active()}
                      eventKey="model"
                    >
                      Models
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      to="datasource-grid"
                      as={NavLink}
                      active={datasource_tab_active()}
                      eventKey="datasource"
                    >
                      Data
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      to="project-grid"
                      as={NavLink}
                      active={project_tab_active()}
                      eventKey="project"
                    >
                      Projects
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Contribute</NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link
                    to="scivisionpy"
                    as={NavLink}
                    eventKey="scivisionpy"
                  >
                    Scivision.Py
                  </Nav.Link>

                  <Nav.Link to="community" as={NavLink} eventKey="community">
                    Community
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
        <Container fluid className="login-bar p-0">
          <Container className="login-bar px-3 mb-3 text-right">
            <Navbar.Text>
              <LoginStatusLink
                gh_logged_in={gh_logged_in}
                set_gh_logged_in={set_gh_logged_in}
              />
            </Navbar.Text>
          </Container>
        </Container>
      </Container>
      {/* Routing table */}
      <Container>
        {/* prettier-ignore */}
        <Routes>
          <Route path="" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/scivisionpy" element={<ScivisionPy />} />
          <Route path="/model-grid" element={<ModelGrid />} />
          <Route path="/model-table" element={<ModelTable />} />
          <Route path="/model/:model_name_encoded" element={<ModelDetails />} />
          <Route path="/new-model" element={<ModelNew gh_logged_in={gh_logged_in} />} />
          <Route path="/datasource-grid" element={<DatasourceGrid />} />
          <Route path="/datasource-table" element={<DatasourceTable />} />
          <Route path="/datasource/:datasource_name_encoded" element={<DatasourceDetails />} />
          <Route path="/new-datasource" element={<DatasourceNew />} />
          <Route path="/project-grid" element={<ProjectGrid />} />
          <Route path="/project-table" element={<ProjectTable />} />
          <Route path="/project/:project_name_encoded" element={<ProjectDetails />} />
          <Route path="/new-project" element={<ProjectNew />} />
          <Route path="/community" element={<Community />} />
          <Route path="/login/:referrer_encoded"
                 element={
                     <Login
                         gh_logged_in={gh_logged_in}
                         set_gh_logged_in={set_gh_logged_in}
                     />
                 }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
