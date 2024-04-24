import { Link } from 'react-router-dom'
import CatalogEntryForm from '@/components/CatalogEntryForm.jsx'
import { PageTitle } from '@/components/Typography'

import project_schema from '../catalog/project_schema.js'

export default function ProjectNew({ gh_logged_in }) {
    return (
        <>
            <PageTitle>
                Create a Scivision project page for your research
            </PageTitle>

            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <h3>Prerequisites</h3>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 md:text-base">
                            <div className="prose mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                <ul>
                                    <li>
                                        You have already added the datasources
                                        used in your project to the{' '}
                                        <Link to="../datasource-grid">
                                            Scivision Data catalog
                                        </Link>
                                        . Click here to add a{' '}
                                        <Link to="../new-datasource">
                                            new datasource
                                        </Link>
                                        .
                                    </li>
                                    <li>
                                        You have already added the computer
                                        vision models used in your project to
                                        the{' '}
                                        <Link to="../model-grid">
                                            Scivision Model catalog
                                        </Link>
                                        . Click here to add a{' '}
                                        <Link to="../new-model">new model</Link>
                                        .
                                    </li>
                                </ul>
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            <h3>Add your project</h3>
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 md:text-base">
                            <div className="prose mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                                <p>
                                    Add the details that will form the basis of
                                    your project's Scivision page below. You can
                                    format the text with{' '}
                                    <a href="https://daringfireball.net/projects/markdown/basics">
                                        Markdown
                                    </a>
                                    , which will allow you to include any
                                    headers, lists and links you feel are
                                    appropriate. You can then select the models
                                    and data you added.
                                </p>
                                <p>
                                    Submitting the form will open a pull request
                                    (from your GitHub user account) that adds
                                    details of your project page to Scivision.
                                    Further discussion is possible at that
                                    point, so it doesn't need to be complete or
                                    perfect at this stage.
                                </p>
                                <p>
                                    Make sure to{' '}
                                    <strong>log in with the link above</strong>{' '}
                                    before completing the form
                                </p>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>

            <CatalogEntryForm
                gh_logged_in={gh_logged_in}
                schema={project_schema}
                uiSchema={{ page: { 'ui:widget': 'textarea' } }}
                formData={JSON.parse(
                    sessionStorage.getItem('new-project-form-data')
                )}
                onChange={(e) =>
                    sessionStorage.setItem(
                        'new-project-form-data',
                        JSON.stringify(e.formData)
                    )
                }
                thumbnailData={sessionStorage.getItem(
                    'new-project-thumbnail/jpeg'
                )}
                onChangeThumbnail={(imgData) =>
                    sessionStorage.setItem(
                        'new-project-thumbnail/jpeg',
                        imgData
                    )
                }
                catalog_kind="project"
                catalog_path="src/scivision/catalog/data/projects.json"
                thumbnail_directory="src/scivision/catalog/data/thumbnails/projects/"
                download_filename="one-project.json"
            />
        </>
    )
}
