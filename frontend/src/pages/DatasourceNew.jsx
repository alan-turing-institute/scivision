import CatalogEntryForm, {
    CatalogFormHowItWorksBox,
} from '@/components/CatalogEntryForm.jsx'
import { LoginButton } from '../utils/login.jsx'

import 'bootstrap-icons/font/bootstrap-icons.css'

import datasource_schema from '../catalog/datasource_schema.js'

import { PageTitle } from '@/components/Typography'

export default function DatasourceNew({ gh_logged_in }) {
    return (
        <>
            <PageTitle>Add a datasource to the catalog</PageTitle>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <h3>What is this?</h3>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 md:text-base">
                            <p>
                                Use this form if you have a dataset you would
                                like to be included in the Datasource catalog.
                            </p>
                            <CatalogFormHowItWorksBox />
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <h3>Prerequisites</h3>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0">
                            <div className="prose mt-1 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
                                <ul className="list-spaced">
                                    <li>
                                        You have a GitHub account
                                        <ul>
                                            <li>
                                                You can sign up for a free
                                                account by clicking the Login
                                                button below and choosing
                                                "Create an account" when
                                                prompted for your credentials
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        Your data is in a publicly accessible
                                        location (for example, on{' '}
                                        <a href="https://zenodo.org/">Zenodo</a>
                                        ).
                                        <ul>
                                            <li>
                                                The Scivision catalog does not
                                                host your data directly, just
                                                some metadata about it, so this
                                                must be accessible elsewhere.
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        <strong>(Optionally)</strong> Your data
                                        repository is in the{' '}
                                        <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-repo-structure">
                                            format expected by Scivision
                                        </a>{' '}
                                        <ul>
                                            <li>
                                                This has the benefit of allowing
                                                programmatic access to the data
                                                using Scivision.Py
                                            </li>
                                            <li>
                                                {' '}
                                                If it is in the Scivision
                                                format, make a note of the
                                                direct link to the{' '}
                                                <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-config-file">
                                                    data config file
                                                </a>{' '}
                                                in your repository
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>

            <h2>Add your datasource</h2>

            <div className="">
                {!gh_logged_in ? (
                    <div
                        className="m-5"
                        style={{ display: 'flex', 'justify-content': 'center' }}
                    >
                        <LoginButton>
                            Log in with GitHub to continue
                        </LoginButton>
                    </div>
                ) : (
                    <CatalogEntryForm
                        gh_logged_in={gh_logged_in}
                        schema={datasource_schema}
                        uiSchema={{
                            'ui:title': ' ',
                            description: {
                                'ui:widget': 'textarea',
                            },
                            tasks: {
                                'ui:widget': 'checkboxes',
                                'ui:options': {
                                    inline: true,
                                },
                            },
                            labels_provided: {
                                'ui:widget': 'radio',
                            },
                        }}
                        formData={JSON.parse(
                            sessionStorage.getItem('new-datasource-form-data')
                        )}
                        onChange={(e) =>
                            sessionStorage.setItem(
                                'new-datasource-form-data',
                                JSON.stringify(e.formData)
                            )
                        }
                        thumbnailData={sessionStorage.getItem(
                            'new-datasource-thumbnail/jpeg'
                        )}
                        onChangeThumbnail={(imgData) =>
                            sessionStorage.setItem(
                                'new-datasource-thumbnail/jpeg',
                                imgData
                            )
                        }
                        catalog_kind="datasource"
                        catalog_path="src/scivision/catalog/data/datasources.json"
                        thumbnail_directory="src/scivision/catalog/data/thumbnails/datasources"
                        download_filename="one-datasource.json"
                    />
                )}
                <div className="p-3"></div>
            </div>
        </>
    )
}
