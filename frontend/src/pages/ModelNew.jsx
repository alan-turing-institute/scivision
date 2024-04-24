import CatalogEntryForm, {
    CatalogFormHowItWorksBox,
} from '@/components/CatalogEntryForm.jsx'
import { LoginButton } from '../utils/login.jsx'
import { PageTitle } from '@/components/Typography'

import model_schema from '../catalog/model_schema.js'

export default function ModelNew({ gh_logged_in }) {
    return (
        <>
            <PageTitle>Add a model to the catalog</PageTitle>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <h3>What is this?</h3>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 md:text-base">
                            <p>
                                Use this form to propose a pre-trained model for
                                inclusion in the catalog.
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
                                <ul className="">
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
                                        Your model is publically available from
                                        a source repository or on a package
                                        server
                                        <ul>
                                            <li>
                                                The Scivision catalog does not
                                                host your model, just a link to
                                                it, so it must be publically
                                                accessible somewhere
                                            </li>
                                            <li>
                                                For example, your model may be
                                                published on PyPI or have its
                                                source code available on GitHub,
                                                Gitlab or elsewhere
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Your model includes everything needed to
                                        run it, including any weights and
                                        parameters
                                        <ul>
                                            <li>
                                                Not <em>just</em> model weights
                                            </li>
                                            <li>
                                                Note: Models that require
                                                training or fitting to data
                                                before running can be suggested,
                                                but answer 'No' to{' '}
                                                <em>
                                                    Model runs with Scivision?
                                                </em>{' '}
                                                below
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Your model is set up as a Python
                                        package, and is installable with pip
                                        <ul>
                                            <li>
                                                Your model could be published to
                                                PyPI or another package server,
                                                but installing from a direct
                                                link to the source repository is
                                                also accepted
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        {' '}
                                        <strong>(Optionally)</strong> your model
                                        is in the{' '}
                                        <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-repo-structure">
                                            correct format for Scivision
                                        </a>
                                        <ul>
                                            <li>
                                                This has the benefit of allowing
                                                programmatic access to the model
                                                through Scivision.Py
                                            </li>
                                            <li>
                                                {' '}
                                                In this case, make a note of the
                                                direct link to the{' '}
                                                <a href="https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-config-file">
                                                    model config file
                                                </a>{' '}
                                                in your repository to provide
                                                below
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>

            <h2>Add your model</h2>

            <div className="">
                {!gh_logged_in ? (
                    <div
                        className="m-5"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <LoginButton gh_logged_in={gh_logged_in}>
                            Log in with GitHub to continue
                        </LoginButton>
                    </div>
                ) : (
                    <CatalogEntryForm
                        gh_logged_in={gh_logged_in}
                        schema={model_schema}
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
                            scivision_usable: {
                                'ui:widget': 'radio',
                            },
                        }}
                        formData={JSON.parse(
                            sessionStorage.getItem('new-model-form-data')
                        )}
                        onChange={(e) =>
                            sessionStorage.setItem(
                                'new-model-form-data',
                                JSON.stringify(e.formData)
                            )
                        }
                        thumbnailData={sessionStorage.getItem(
                            'new-model-thumbnail/jpeg'
                        )}
                        onChangeThumbnail={(imgData) =>
                            sessionStorage.setItem(
                                'new-model-thumbnail/jpeg',
                                imgData
                            )
                        }
                        catalog_kind="model"
                        catalog_path="src/scivision/catalog/data/models.json"
                        thumbnail_directory="src/scivision/catalog/data/thumbnails/models"
                        download_filename="one-model.json"
                    />
                )}
                <div className="p-3"></div>
            </div>
        </>
    )
}
