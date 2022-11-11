import logo from './logo.png';
import './App.css';

import { Buffer } from 'buffer';

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

import { withRouter, useNavigate } from "react-router";

import { React, useState, useEffect, useRef } from 'react';

import Form from '@rjsf/bootstrap-4';
import datasource_schema from './datasource_schema.js'
import model_schema from './model_schema.js'

import { Nav, Navbar } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import datasources from './data/datasources.json';
import models from './data/models.json';
import DataTable from 'react-data-table-component';

import { Octokit } from "octokit";
import { createPullRequest } from "octokit-plugin-create-pull-request";

const server_configs = {
    development: {
        uri: 'https://scivision-dev-gh-gatekeeper.azurewebsites.net/authenticate/',
        client_id: 'b1f4db23eb46160d16b7',
        redirect_uri: 'http://localhost:3000/scivision/#/login/'
    },
    production: {
        uri: 'https://scivision-gh-gatekeeper.azurewebsites.net/authenticate/',
        client_id: '13bcb3c2a2c31a9f6f02',
        redirect_uri: 'https://alan-turing-institute.github.io/scivision/#/login/'
    }
}

const server_config_selected = server_configs[process.env.NODE_ENV];

const OctokitPRPlugin = Octokit.plugin(createPullRequest);
const GH_TOKEN_KEY = "gh_token";
const RANDOM_UUID_KEY = "random_uuid";


// Load the thumbnail images
//
// require.context returns a webpack object, which is callable.
// Calling it with the name of a resource returns the path to that
// resource.  It also has a '.keys()' method, which returns all the
// included resources
const model_thumbnails_ctxt = require.context(
    './data/thumbnails/models', false, /\.jpg$/
);

// From the webpack object, make a dictionary from resource name to
//
// Could strip the leading './' and trailing extension (and then handle
// several file types)
const model_thumbnails = model_thumbnails_ctxt.keys().reduce((dict, mod) => {
    dict[mod] = model_thumbnails_ctxt(mod);
    return dict;
}, {});


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function CatalogEntryForm({ gh_logged_in, schema, catalog_kind, catalog_path, download_filename }) {

    // The modal dialogue shows when 'pr_failed' is true.  Separate
    // state variable for the message, since closing the modal
    // clears the failure flag, but the message is still visible
    // briefly
    const [ pr_message, set_pr_message ] = useState("");
    const [ pr_failed, set_pr_failed ] = useState(false);
    const [ pr_loading, set_pr_loading ] = useState(false);

    // There is a single onSubmit event for both buttons, but can
    // use the onClick of the button to set this flag and decide
    // which one
    let pr_flag;

    return (
        <div className="mb-5">
            <Modal show={!!pr_failed} onHide={() => set_pr_failed(false)} >
                <Modal.Header closeButton>
                    <b>Error opening pull request on GitHub</b>
                </Modal.Header>
                <Modal.Body>
                    The error was:<div className="text-monospace mt-2 col">{pr_message}</div>
                </Modal.Body>
            </Modal>
            <Form onSubmit={
                      (new_entry_submission) => {
                          const entry = new_entry_submission.formData;
                          if (pr_flag) {
                              const octokit = new OctokitPRPlugin({
                                  auth: sessionStorage[GH_TOKEN_KEY]
                              });

                              set_pr_loading(true);

                              octokit.createPullRequest({
                                  owner: "alan-turing-institute",
                                  repo: "scivision",
                                  title: `Add "${entry.name}" to the ${catalog_kind} catalog`,
                                  body: "This PR was automatically generated by the Scivision frontend.",
                                  base: "main",
                                  head: `add-${catalog_kind}-${crypto.randomUUID().toUpperCase()}`,
                                  update: false,
                                  forceFork: true,
                                  changes: [
                                      {
                                          files: {
                                              [catalog_path]:
                                              ({ exists, encoding, content}) => {
                                                  const content_str = Buffer.from(content, encoding);
                                                  let cat = JSON.parse(content_str);
                                                  cat.entries.push(entry);
                                                  return JSON.stringify(cat, null, 2);
                                              }
                                          },
                                          commit: `Create entry for "${entry.name}" in the ${catalog_kind} catalog`
                                      }
                                  ]
                              })
                                  .then(
                                      response => {
                                          if (response.status >= 200 && response.status < 300) {
                                              window.location = response.data.html_url;
                                          } else {
                                              return Promise.reject(response.data);
                                          }
                                      }
                                  )
                                  .catch(e => {
                                      set_pr_message(e.message);
                                      set_pr_failed(true);
                                      set_pr_loading(false);
                                  });
                          } else {
                              download(download_filename, JSON.stringify(entry, null, 2));
                          }
                      }
                  }
                  schema={schema}>

                <button type="submit"
                        onClick={ () => pr_flag = true }
                        className="btn btn-primary"
                        disabled={!gh_logged_in || pr_loading}>
                    Open Pull Request on GitHub
                    { pr_loading ? <>&nbsp;<Spinner animation="border" role="status" size="sm"/></> : <></> }
                    { gh_logged_in ? <></> : <>(login to enable)</> }
                </button>
                <button type="submit"
                        onClick={ () => pr_flag = false }
                        className="btn btn-link">
                    Download entry data as json
                </button>
            </Form>
        </div>);
}


async function get_github_token(gh_code) {
    const response = await fetch(server_config_selected.uri + gh_code);
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
    const navigate = useNavigate();

    const location = new URL(window.location);
    const query_params = location.searchParams;

    const gh_code = query_params.get('code');
    const gh_state = query_params.get('state');

    const random_uuid = sessionStorage[RANDOM_UUID_KEY];

    const referrer = decodeURIComponent(referrer_encoded);

    useEffect(() => {
        if (!login_attempted.current) {
            login_attempted.current = true;
            if (gh_code) {
                (async () => {
                    if (gh_logged_in) throw "Already logged in to GitHub";
                    if (gh_state != random_uuid) throw "OAuth state mismatch";
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
                        // Clearing the search parameters triggers a
                        // reload, and then 'navigate' is never called.
                        //
                        // window.location.search = "";
                        navigate(referrer);
                    });
            } else {
                console.log("Missing 'code' query parameter");
            }
        }
    }, []);

    return (
        <div>
            Logging in...&nbsp;&nbsp;
            <p>Navigate away from this page to abort</p>
            <p />
            <Spinner animation="border" role="status" size="sm"/>
        </div>
    );
}


function github_auth({ referrer, gh_logged_in }) {
    if (gh_logged_in) {
        console.log("Already logged in to GitHub");
        return <Navigate to={referrer} />;
    } else {
        var github_auth_url = new URL('https://github.com/login/oauth/authorize');

        const random_uuid = crypto.randomUUID();
        sessionStorage[RANDOM_UUID_KEY] = random_uuid;

        const referrer_encoded = encodeURIComponent(encodeURIComponent(referrer));

        github_auth_url.search = new URLSearchParams({
            client_id: server_config_selected.client_id,
            redirect_uri: server_config_selected.redirect_uri + referrer_encoded,
            scope: "public_repo",
            state: random_uuid,
        }).toString();

        window.location = github_auth_url;

        return (<div>Redirecting to GitHub...</div>);
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
            name: 'Thumbnail',
            width: "150px",
            selector: row => model_thumbnails[`./${row.name}.jpg`] == undefined,
            sortable: true,
            cell: (row, index, column, id) =>
            (
                <img src={model_thumbnails[`./${row.name}.jpg`]} width="128" height="128" />
            )
        },
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


function LoginStatusLink({ gh_logged_in, set_gh_logged_in }) {
    const loc = useLocation();

    if (!gh_logged_in) {
        return (
            <a href="javascript:;"
                   onClick={() => {
                   github_auth({
                       referrer: loc.pathname,
                       gh_logged_in: gh_logged_in,
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
    const random_uuid = sessionStorage[RANDOM_UUID_KEY];
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

                        <Nav.Item>
                            <a href="https://scivision.readthedocs.io/en/latest/">Documentation</a>
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
                                       <CatalogEntryForm
                                           gh_logged_in={gh_logged_in}
                                           schema={datasource_schema}
                                           catalog_kind="datasource"
                                           catalog_path="scivision/catalog/data/datasources.json"
                                           download_filename="one-datasource.json"
                                       />
                                   </div>
                               }/>
                        <Route path="/models" element={
                                   <div className="col" style={{width: 500}}>
                                       <Models />
                                   </div>
                               } />
                        <Route path="/model" element={
                                   <div className="col-auto">
                                       <CatalogEntryForm
                                           gh_logged_in={gh_logged_in}
                                           schema={model_schema}
                                           catalog_kind="model"
                                           catalog_path="scivision/catalog/data/models.json"
                                           download_filename="one-model.json"
                                       />
                                   </div>
                               } />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
