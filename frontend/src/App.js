import logo from './logo.png';
import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Form from '@rjsf/bootstrap-4';
import datasource_schema from './datasource_schema.js'
import model_schema from './model_schema.js'

import { Nav, Navbar } from "react-bootstrap";

import datasources from './datasources.json';
import models from './models.json';
import DataTable from 'react-data-table-component';

import { Octokit, App } from "octokit";

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function DataSourceForm() {
    return (<Form onSubmit={
                      (input) => {
                          download("one-datasource.json", JSON.stringify(input.formData, null, 4));
                          // datasources.entries.push(input.formData)
                      }
                  } 
                  uiSchema={{"ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } }}}
                  schema={datasource_schema} />);
}

function ModelForm() {
    return (<Form onSubmit={
                      (input) => {
                          download("one-model.json", JSON.stringify(input.formData, null, 4))
                          // models.entries.push(input.formData)
                      }
                  }
                  uiSchema={{"ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } }}}
                  schema={model_schema} />);
}

function AboutText() {
    return (<p>Add text here</p>);
}

function GitHubConnect() {

    var github_auth_url = new URL('https://github.com/login/oauth/authorize')
    github_auth_url.search = new URLSearchParams({
        client_id: '13bcb3c2a2c31a9f6f02',
        redirect_uri: 'https://alan-turing-institute.github.io/scivision'
    }).toString()

    <a href={github_auth_url}>Connect to GitHub</a>
}

function Datasources() {
    const columns = [
        {
            selector: row => row.name,
            name: 'Name',
            sortable: true,
            grow: 0.3
        },
        {
            selector: row => row.description,
            name: 'Description',
            grow: 2
        },
        {
            selector: row => row.tasks,
            name: 'Tasks',
        },
        {
            selector: row => row.url,
            name: 'URL',
        },
        {
            selector: row => row.format,
            name: 'Format',
            sortable: true,
            minWidth: "10px",
            maxWidth: "100px"

        },
        {
            selector: row => row.labels_provided,
            name: 'Labels provided',
            sortable: true,
            minWidth: "10px",
            maxWidth: "200px"
        },
        {
            selector: row => row.institution,
            name: 'Institution',
            sortable: true
        },
        {
            selector: row => row.tags,
            name: 'Tags',
        },
    ];

    return <DataTable columns={columns} data={datasources.entries} title="Datasources" width="500px" />;
}

function Models() {
    const columns = [
        {
            name: "Name",
            selector: row => row.name,
        },
        {
            name: "Description",
            selector: row => row.description,
        },
        {
            name: "Tasks",
            selector: row => row.tasks,
        },
        {
            name: "URL",
            selector: row => row.url,
        },
        {
            name: "Package URL (pip)",
            selector: row => row.pkg_url,
        }

    ];

    return <DataTable columns={columns} data={models.entries} title="Models" />;
}

function App() {
  return (
      <div className="app">
          <div className="container-fluid">
              <Navbar bg="light" expand="lg">
                  <Navbar.Brand>
                      <p class="h1"> <img src={logo} alt="Scivision logo" /> Scivision Catalog Utility</p>
                  </Navbar.Brand>
              </Navbar>
              <div class="row px-4 mt-2">
                  <Router basename={process.env.PUBLIC_URL}>
                      <Nav className="col-auto d-block sidebar">
                          <Nav.Item>
                              <Link to="">About</Link>
                          </Nav.Item>
                          <p />
                          <Nav.Item>
                              <Link to="datasources">Datasources</Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Link to="datasource">New datasource entry</Link>
                          </Nav.Item>
                          <p />

                          <Nav.Item>
                              <Link to="models">Models</Link>
                          </Nav.Item>

                          <Nav.Item>
                              <Link to="model">New model entry</Link>
                          </Nav.Item>
                      </Nav>
                      <Routes>
                          <Route exact path="/" element={
                                     <div className="col-md-auto">
                                         <AboutText />
                                     </div>
                                 } />
                          <Route path="/gh-connect" element={
                                     <div className="col-md-auto">
                                         <GitHubConnect />
                                     </div>
                                 } />
                          <Route path="/datasources" element={
                                     <div className="col" style={{width: 500}}>
                                         <Datasources />
                                     </div>
                                 } />
                          <Route path="/datasource" element={
                                     <div className="col-auto">
                                         <DataSourceForm />
                                     </div>
                                 }/>
                          <Route path="/models" element={
                                     <div className="col" style={{width: 500}}>
                                         <Models />
                                     </div>
                                 } />
                          <Route path="/model" element={
                                     <div className="col-auto">
                                         <ModelForm />
                                     </div>
                                 } />
                      </Routes>
                  </Router>
              </div>
          </div>
      </div>
  );
}

export default App;
