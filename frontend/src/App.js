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

import { Nav, NavDropdown, Navbar, Container, Alert } from "react-bootstrap";
import SidebarMenu from 'react-bootstrap-sidebar-menu';

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
  return (<Form onSubmit={(input) => download("one-datasource.json", JSON.stringify(input.formData, null, 4))}
                uiSchema={{"ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } }}}
                schema={datasource_schema} />);
}

function ModelForm() {
  return (<Form onSubmit={(input) => download("one-model.json", JSON.stringify(input.formData, null, 4))}
                uiSchema={{"ui:options": { "submitButtonOptions": { "norender": false, "submitText": "Download" } }}}
                schema={model_schema} />);
}

function AboutText() {
  return (<p>Add text here</p>);
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
                  <Router>
                      <Nav className="col-lg-2 d-block d-none sidebar">
                          <Nav.Item>
                              <Link to="">About</Link>
                          </Nav.Item>                          
                          <Nav.Item>
                              <Link to="datasource">New datasource entry</Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Link to="model">New model entry</Link>
                          </Nav.Item>
                      </Nav>
                      <div className="col-md-6">
                          <Routes>
                              <Route exact path="/" element={<AboutText/>} />
                              <Route path="/datasource" element={
                                             <DataSourceForm />
                                     }/>
                              <Route path="/model" element={
                                             <ModelForm />
                                     } />
                          </Routes>
                      </div>
                  </Router>
              </div>
          </div>
      </div>
  );
}

export default App;
