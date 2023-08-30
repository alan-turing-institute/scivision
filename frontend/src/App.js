import './App.css';

import { React, useState } from 'react';
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

import 'bootstrap-icons/font/bootstrap-icons.css';

import { GH_TOKEN_KEY } from "./config.js";

import { Login, LoginStatusLink } from "./github_helper_funcs.js"

import Home from "./Home.js"
import About from './About.js'

import ModelGrid from "./ModelGrid.js"
import ModelTable from "./ModelTable.js"
import ModelDetails from "./ModelDetails.js"
import ModelNew from "./ModelNew.js"

import DatasourceGrid from "./DatasourceGrid.js"
import DatasourceTable from "./DatasourceTable.js"
import DatasourceDetails from "./DatasourceDetails.js"
import DatasourceNew from "./DatasourceNew.js"

import ProjectGrid from "./ProjectGrid.js"
import ProjectTable from "./ProjectTable.js"
import ProjectDetails from "./ProjectDetails.js"
import ProjectNew from "./ProjectNew.js"

import ScivisionPy from "./ScivisionPy.js"
import Community from "./Community.js"

// Component: The app
//
// Display the header and sidebar, and handle routing with React Router
function App() {
    const gh_token = sessionStorage[GH_TOKEN_KEY];
    const [gh_logged_in, set_gh_logged_in] = useState(!!gh_token);
    const location = useLocation();
    const location_root = location.pathname.split("/")[1]; // path starts with a '/'

    return (
        <div className="app">
            {/* Main header (Navbar used as a convenient 'banner'
                  * element, but does not actually contain navigation
                  * links) */}
            <Container fluid className="bg-light p-0">
                <Container>
                    <Navbar expand="md flex-nowrap">
                        <Navbar.Brand>
                            <Nav.Link to="" as={NavLink} className="p-0 ">
                                <img src="https://github.com/alan-turing-institute/scivision/blob/main/imgs/logo_name.png?raw=true" className="brandLogo" alt="Scivision" />
                            </Nav.Link>
                        </Navbar.Brand>
                        <span>
                            <a style={{ color: "Black" }} href="https://github.com/alan-turing-institute/scivision">
                                <i className="bi bi-github" aria-label="GitHub" style={{ fontSize: "2.5rem" }}></i>
                            </a>
                        </span>
                    </Navbar>

                    {/* Navigation bar */}
                    <Navbar collapseOnSelect expand="md" className="px-0">
                        <Container fluid className="p-0">
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link to="" as={NavLink} eventKey="home">
                                        Home
                                    </Nav.Link>

                                    <Nav.Link to="about" as={NavLink} eventKey="about">
                                        About
                                    </Nav.Link>

                                    <Nav.Link to="scivisionpy" as={NavLink} eventKey="scivisionpy">
                                        Scivision.Py
                                    </Nav.Link>

                                    {/* We want to have the Datasource and Model menu items
                                      * highlighted (as if visited) for any of the routes
                                      * associated with these things.  This is the meaning of the
                                      * expression given for 'active' below. There is probably a
                                      * better way of doing this...*/}

                                    <Nav.Link to="model-grid" as={NavLink}
                                        active={
                                            location_root === "model-table"
                                            || location_root === "new-model"
                                            || location_root === "model"
                                        } eventKey="model">
                                        Models
                                    </Nav.Link>

                                    <Nav.Link to="datasource-grid" as={NavLink}
                                        active={
                                            location_root === "datasource-table"
                                            || location_root === "new-datasource"
                                            || location_root === "datasource"
                                        } eventKey="datasource">
                                        Data
                                    </Nav.Link>
                                    <Nav.Link to="project-grid" as={NavLink}
                                        active={
                                            location_root === "project-table"
                                            || location_root === "new-project"
                                            || location_root === "project"
                                        } eventKey="project">
                                        Projects
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
                <Routes>
                    <Route path="" exact element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/scivisionpy" element={<ScivisionPy />} />
                    <Route path="/model-grid" element={<ModelGrid />} />
                    <Route path="/model-table" element={<ModelTable />} />
                    <Route path="/model/:model_name_encoded" element={<ModelDetails />} />
                    <Route path="/new-model" element={<ModelNew gh_logged_in={gh_logged_in} />} />
                    <Route path="/datasource-grid" element={<DatasourceGrid />}  />
                    <Route path="/datasource-table" element={<DatasourceTable />} />
                    <Route path="/datasource/:datasource_name_encoded" element={<DatasourceDetails />} />
                    <Route path="/new-datasource" element={<DatasourceNew />} />
                    <Route path="/project-grid" element={<ProjectGrid />} />
                    <Route path="/project-table" element={<ProjectTable />} />
                    <Route path="/project/:project_name_encoded" element={<ProjectDetails />} />
                    <Route path="/new-project" element={<ProjectNew />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/login/:referrer_encoded" element={
                               <Login
                                   gh_logged_in={gh_logged_in}
                                   set_gh_logged_in={set_gh_logged_in}
                               />
                           } />
                </Routes>
            </Container>
        </div>
    );
}

export default App;

