import CatalogEntryForm, {
    CatalogFormHowItWorksBox,
} from '@/components/CatalogEntryForm.jsx'

import 'bootstrap-icons/font/bootstrap-icons.css'

import datasource_schema from '../catalog/datasource_schema.js'

import { PageTitle } from '@/components/Typography'

export default function DatasourceNew() {
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
                                like to be included in the Datasource catalog.<br /><br />
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
                                                You can sign up for a free account by going to{' '} 
                                                <a href="https://github.com/">https://github.com/</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        Your data is in a publicly accessible
                                        location (for example, on{' '}
                                        <a href="https://zenodo.org/">Zenodo</a>
                                        )
                                        <ul>
                                            <li>
                                                The Scivision catalog does not
                                                host your data directly, just
                                                some metadata about it, so this
                                                must be accessible elsewhere
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        <strong>(Optionally)</strong> Your data
                                        repository is in the{' '}
                                        <a href="https://scivision.readthedocs.io/en/latest/data_repository_template.html#requirements-for-the-scivision-api">
                                            format expected by Scivision
                                        </a>{' '}
                                        <ul>
                                            <li>
                                                This has the benefit of allowing
                                                programmatic access to the data
                                                using{' '} <a href="/scivisionpy">Scivision.Py</a> 
                                            </li>
                                            <li>
                                                {' '}
                                                If it is in the Scivision
                                                format, <em>URL </em>
                                                should be a direct link to the{' '}
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
                <CatalogEntryForm
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
                    catalog_kind="datasource"
                    catalog_path="src/scivision/catalog/data/datasources.json"
                    download_filename="one-datasource.json"
                />
                <div className="p-3"></div>
            </div>
        </>
    )
}
