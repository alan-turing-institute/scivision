import logo from './logo.png';
import './App.css';

import {
    HashRouter as Router,
    Routes,
    Route,
    Navigate,
    Link,
    useSearchParams,
    useParams,
    useLocation
} from "react-router-dom";

import { withRouter } from "react-router";

import { React, useState, useEffect, useRef } from 'react';

import Form from '@rjsf/bootstrap-4';
import datasource_schema from './datasource_schema.js'
import model_schema from './model_schema.js'

import { Nav, Navbar } from "react-bootstrap";

import datasources from './datasources.json';
import models from './models.json';
import DataTable from 'react-data-table-component';

import { Octokit } from "octokit";
import { createPullRequest } from "octokit-plugin-create-pull-request";

const OctokitPRPlugin = Octokit.plugin(createPullRequest);


const GH_TOKEN_KEY = "gh_token";


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function TestPR() {
    const octokit = new OctokitPRPlugin({
        auth: sessionStorage[GH_TOKEN_KEY]
    });

    const update_attempted = useRef(false);

    useEffect(() => {
        if (!update_attempted.current) {
            update_attempted.current = true;
            octokit.createPullRequest({
                owner: "alan-turing-institute",
                repo: "scivision",
                title: "test update catalog",
                body: "",
                base: "main",
                head: "test-update-catalog",
                update: false,
                forceFork: false,
                changes: [
                    {
                        files: {
                            "scivision/catalog/data/datasources.json": "New catalog contents"
                        },
                        commit: "Test update catalog"
                        
                    }
                ]
            });
        }
    });
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


async function get_github_token(gh_code) {
    const response = await fetch("https://scivision-gh-gatekeeper.azurewebsites.net/authenticate/" + gh_code);
    const json = await response.json();
    if (!json.token) {
        if (json.error) {
            throw json.error;
        } else {
            throw "An unknown error occurred";
        }
    }
    return json.token;
}


function AboutText() {
    return (<p>Welcome to Scivision</p>);
}


function Login({ gh_logged_in, set_gh_logged_in }) {
    const login_attempted = useRef(false);
    const { referrer_encoded } = useParams();

    const location = new URL(window.location);
    const query_params = location.searchParams;

    const gh_code = query_params.get('code');

    useEffect(() => {
        if (!login_attempted.current) {
            login_attempted.current = true;
            if (gh_code) {
                (async () => {
                    if (gh_logged_in) throw "Already logged in to GitHub";
                    return get_github_token(gh_code);
                })()
                    .then((tok) => {
                        sessionStorage[GH_TOKEN_KEY] = tok;
                        set_gh_logged_in(true);
                    })
                    .catch((e) => {
                        console.log(`Could not log in to GitHub.  The reason was: ${e}`);
                    })
                    .finally(() => {
                        window.location.search = "";
                    });
            } else {
                console.log("Missing 'code' query parameter");
            }
        }
    }, []);

    const referrer = decodeURIComponent(referrer_encoded);

    return <Navigate to={referrer} />;
}


function GitHubConnect({ referrer, gh_logged_in }) {
    if (gh_logged_in) {
        console.log("Already logged in to GitHub");
        return <Navigate to={referrer} />;
    } else {
        //const random_uuid = crypto.randomUUID();
        var github_auth_url = new URL('https://github.com/login/oauth/authorize');

        const referrer_encoded = encodeURIComponent(encodeURIComponent(referrer));

        github_auth_url.search = new URLSearchParams({
            client_id: '13bcb3c2a2c31a9f6f02',
            //redirect_uri: 'https://alan-turing-institute.github.io/scivision/#/login/' + referrer_encoded,
            redirect_uri: 'http://localhost:3000/scivision/#/login/' + referrer_encoded,
            // state: random_uuid
        }).toString();

        window.location = github_auth_url;

        return (<div>Redirecting to GitHub</div>);
    }
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


function LoginStatusLinkLoggedIn({ set_gh_logged_in }) {
    const octokit = new Octokit({ auth: sessionStorage[GH_TOKEN_KEY] });
    const [ gh_username, set_gh_username ] = useState("...");
    useEffect(() => {
        (async () => {
            const {
                data: { login },
            } = await octokit.rest.users.getAuthenticated();
            set_gh_username(login);
        })();
    }, [gh_username]);

    return (
        <>
            <div>Logged in as {gh_username}</div>
            <a href="javascript:;"
               onClick={() => {
                   set_gh_logged_in(false);
                   sessionStorage.removeItem(GH_TOKEN_KEY);
               }}>
                (logout)
            </a>
        </>
    );
}


function LoginStatusLink({ gh_logged_in , set_gh_logged_in }) {
    const loc = useLocation();
    
    if (!gh_logged_in) {
        return (
            <a href="javascript:;"
                   onClick={() => {
                   GitHubConnect({
                       referrer: loc.pathname,
                       gh_logged_in: gh_logged_in
                   });
               }}>
                Login with GitHub
            </a>
        );
    } else {
        return (<LoginStatusLinkLoggedIn set_gh_logged_in={set_gh_logged_in} />);
    }    
}


function App() {
    const gh_token = sessionStorage[GH_TOKEN_KEY];
    const [ gh_logged_in, set_gh_logged_in ] = useState(!!gh_token);

    return (
        <div className="app">
            <div className="container-fluid">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <p className="h1"> <img src={logo} alt="Scivision logo" /> Scivision Catalog Utility</p>
                    </Navbar.Brand>
                </Navbar>
                <div className="row px-4 mt-2">
                    <Nav className="col-auto d-block sidebar">
                        <Nav.Item>
                            <Link to="">About</Link>
                        </Nav.Item>

                        <p />

                        <Nav.Item>
                            <LoginStatusLink gh_logged_in={gh_logged_in}
                                             set_gh_logged_in={set_gh_logged_in} />
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
                                       <AboutText gh_logged_in={gh_logged_in} />
                                   </div>
                               } />

                        <Route path="/login/:referrer_encoded" element={
                                   <div className="col-md-auto">
                                       <Login
                                           gh_logged_in={gh_logged_in}
                                           set_gh_logged_in={set_gh_logged_in}
                                       />
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
                        <Route path="/update" element={
                                   <div className="col-auto">
                                       <TestPR />
                                   </div>
                               } />
                        
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
