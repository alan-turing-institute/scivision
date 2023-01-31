// import './App.css';
// import { AboutText } from './about.js'

// import biglogo from './logo-full.png';
// import nbScreenshot1 from './nb-1.jpg'
// import nbScreenshot2 from './nb-2.jpg'


// import { Buffer } from 'buffer';

// import {
//     HashRouter as Router,
//     Routes,
//     Route,
//     Navigate,
//     Link,
//     NavLink,
//     useSearchParams,
//     useParams,
//     useLocation
// } from "react-router-dom";

// import { withRouter, useNavigate } from "react-router";

// import { React, useState, useEffect, useRef } from 'react';

// import Form from '@rjsf/bootstrap-4';
// import datasource_schema from './datasource_schema.js'
// import model_schema from './model_schema.js'
// import project_schema from './project_schema.js'

// import { Nav, Navbar } from "react-bootstrap";
// import Spinner from "react-bootstrap/Spinner";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";

// import 'bootstrap-icons/font/bootstrap-icons.css';

// import datasources from './data/datasources.json';
// import models from './data/models.json';
// import projects from './data/projects.json';
// import DataTable from 'react-data-table-component';

import { Octokit } from "octokit";
import { createPullRequest } from "octokit-plugin-create-pull-request";

// import MarkdownView from 'react-showdown';

// import { download, sample_without_replacement } from "./utils.js";



export const server_configs = {
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

export const server_config_selected = server_configs[process.env.NODE_ENV];

export const OctokitPRPlugin = Octokit.plugin(createPullRequest);
export const GH_TOKEN_KEY = "gh_token";
export const RANDOM_UUID_KEY = "random_uuid";

