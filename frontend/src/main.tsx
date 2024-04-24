// Main engine: React, ReactDOM, React Router
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from 'react-router-dom'

// Styling and typography imports
import '@/main.css'
import '@fontsource-variable/source-code-pro'
import '@fontsource-variable/source-sans-3'

// login components
// import { GH_TOKEN_KEY } from "@/config.js";

// import { Login, LoginStatusLink } from "@/login.jsx";

// default layout import
import DefaultLayout from '@/layouts/DefaultLayout.tsx'
import HomeLayout from '@/layouts/HomeLayout'

// Home page import
import Home from '@/pages/Home'

// Regular pages import
import About from '@/pages/About'
import Contribute from '@/pages/Contribute'
import ScivisionPy from '@/pages/ScivisionPy'
import Community from '@/pages/Community'

import ModelGrid from '@/pages/ModelGrid'
import ModelTable from '@/pages/ModelTable.jsx'
import ModelDetails from '@/pages/ModelDetails'
import ModelNew from '@/pages/ModelNew.jsx'

import DatasourceGrid from '@/pages/DatasourceGrid'
import DatasourceTable from '@/pages/DatasourceTable.jsx'
import DatasourceDetails from '@/pages/DatasourceDetails'
import DatasourceNew from '@/pages/DatasourceNew.jsx'

import ProjectGrid from '@/pages/ProjectGrid'
import ProjectTable from '@/pages/ProjectTable.jsx'
import ProjectDetails from '@/pages/ProjectDetails'
import ProjectNew from '@/pages/ProjectNew.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<HomeLayout />}>
                <Route index element={<Home />} />
            </Route>
            <Route element={<DefaultLayout />}>
                <Route path="/about" element={<About />} />
                <Route path="/model-grid" element={<ModelGrid />} />
                <Route path="/model-table" element={<ModelTable />} />
                <Route
                    path="/model/:model_name_encoded"
                    element={<ModelDetails />}
                />
                <Route
                    path="/new-model"
                    element={<ModelNew gh_logged_in={true} />}
                />

                <Route path="/datasource-grid" element={<DatasourceGrid />} />
                <Route path="/datasource-table" element={<DatasourceTable />} />
                <Route
                    path="/datasource/:datasource_name_encoded"
                    element={<DatasourceDetails />}
                />
                <Route
                    path="/new-datasource"
                    element={<DatasourceNew gh_logged_in={true} />}
                />

                <Route path="/project-grid" element={<ProjectGrid />} />
                <Route path="/project-table" element={<ProjectTable />} />
                <Route
                    path="/project/:project_name_encoded"
                    element={<ProjectDetails />}
                />
                <Route
                    path="/new-project"
                    element={<ProjectNew gh_logged_in={true} />}
                />

                <Route path="/contribute" element={<Contribute />} />
                <Route path="/scivisionpy" element={<ScivisionPy />} />
                <Route path="/community" element={<Community />} />
            </Route>
        </>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
