import { Buffer } from 'buffer'
import { useState } from 'react'
import { Spinner, Modal, Alert, Button, Col } from 'react-bootstrap'
import MarkdownView from 'react-showdown'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'

import ImageUpload, { PlaceholderImage } from '../ImageUpload.jsx'
import { download } from '@/utils/utils.js'
import { OctokitPRPlugin, GH_TOKEN_KEY } from '@/config.js'

// Template (for rjsf) to allow Markdown formatting in form field
// descriptions
function DescriptionFieldTemplate({ description, id }) {
    return (
        <div id={id}>
            <MarkdownView markdown={description} options={{ emoji: true }} />
        </div>
    )
}

function ImageUploadModal({ onChangeThumbnail, show, setShow }) {
    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <h5>Thumbnail image upload</h5>
            </Modal.Header>
            <div className="mb-4 mt-2">
                <ImageUpload
                    onSave={(imgData) => {
                        console.log(imgData)
                        onChangeThumbnail(imgData)
                        setShow(false)
                    }}
                />
            </div>
        </Modal>
    )
}

// Component: Form to create new catalog entry (for download or PR)
// routes: /new-model, /new-datasource
//
// The two submit options either download the form data as json, or
// create a pull request with the new entry on behalf of the user.
//
// This Component can be used for both the model and datasource
// catalogs, through the props.
//
// * gh_logged_in - login status (grey out the PR button if not logged in)
// * schema - json schema object, used to generate the form
// * catalog_kind - "datasource" or "model",
export default function CatalogEntryForm({
    gh_logged_in,
    schema,
    uiSchema,
    templates,
    formData,
    onChange,
    thumbnailData,
    onChangeThumbnail,
    catalog_kind,
    catalog_path,
    thumbnail_directory,
    download_filename,
}) {
    // The modal dialogue shows when 'pr_failed' is true.  Separate
    // state variable (pr_message) for the message, since closing the
    // modal clears the failure flag, but the message is still visible
    // briefly
    const [pr_message, set_pr_message] = useState('')
    const [pr_failed, set_pr_failed] = useState(false)
    const [pr_loading, set_pr_loading] = useState(false)

    const [currentThumbnailPreview, setCurrentThumbnailPreview] =
        useState(thumbnailData)
    const [showThumbnailModal, setShowThumbnailModal] = useState(false)

    // There is a single onSubmit event for both buttons, but can
    // use the onClick of the button to set this flag and decide
    // which one
    let pr_flag

    async function submitEntryToGitHub(entry_submitted) {
        const entry = entry_submitted.formData
        const trimElements = ['name', 'description']
        trimElements.forEach((item) => {
            const entryTrimmed = entry[item] ? entry[item].trim() : ''
            entry[item] = entryTrimmed
        })
        if (pr_flag) {
            const octokit = new OctokitPRPlugin({
                auth: sessionStorage[GH_TOKEN_KEY],
            })

            set_pr_loading(true)

            try {
                const {
                    data: { login: gh_username },
                } = await octokit.rest.users.getAuthenticated()

                ///////////
                // Sync user fork
                //
                // This is a workaround to a possible bug in octokit-plugin-create-pull-request
                // triggered when the user has an out of date fork, resulting in a 404.
                // The workaround is just to synchronise the fork.
                //
                // With the workaround there is a theoretical chance that the base repository
                // is updated after the call to mergeUpstream but before createPullRequest, but
                // this can really only be fixed upstream.

                const scivision_forks = await octokit.rest.repos.listForks({
                    owner: 'alan-turing-institute',
                    repo: 'scivision',
                })

                const user_scivision_fork = scivision_forks.data.find(
                    (fork) => fork.owner && fork.owner.login === gh_username
                )

                // Array.find returns undefined if no matches -- in that case,
                // no need to update anything (octokit.createPullRequest
                // will create a fresh one)
                if (user_scivision_fork !== undefined) {
                    await octokit.rest.repos.mergeUpstream({
                        owner: gh_username,
                        repo: user_scivision_fork.name,
                        branch: user_scivision_fork.default_branch,
                    })
                }

                //
                ///////////

                const thumbnail_path =
                    thumbnail_directory + '/' + entry.name + '.jpg'
                const thumbnailChange =
                    thumbnailData === null
                        ? {}
                        : {
                              [thumbnail_path]: {
                                  content: thumbnailData.split(';base64,')[1],
                                  encoding: 'base64',
                              },
                          }

                const response = await octokit.createPullRequest({
                    owner: 'alan-turing-institute',
                    repo: 'scivision',
                    title: `Add "${entry.name}" to the ${catalog_kind} catalog`,
                    body: `This is an automated message from the Scivision frontend (https://sci.vision):

> Your submission was successful and will be reviewed by the Scivision
> maintainers before being added to the catalog, thank you.  If we have any
> questions about your submission we will post them here.`,
                    base: 'main',
                    head: `add-${catalog_kind}-${crypto.randomUUID().toUpperCase()}`,
                    update: false,
                    forceFork: true,
                    changes: [
                        {
                            files: {
                                [catalog_path]: ({
                                    exists,
                                    encoding,
                                    content,
                                }) => {
                                    const content_str = Buffer.from(
                                        content,
                                        encoding
                                    )
                                    let cat = JSON.parse(content_str)
                                    cat.entries.push(entry)
                                    return JSON.stringify(cat, null, 2)
                                },
                                ...thumbnailChange,
                            },
                            commit: `Create entry for "${entry.name}" in the ${catalog_kind} catalog`,
                        },
                    ],
                })
                if (response.status >= 200 && response.status < 300) {
                    window.location = response.data.html_url
                } else {
                    throw new Error(response.data)
                }
            } catch (e) {
                set_pr_message(e.message)
                set_pr_failed(true)
                set_pr_loading(false)
            }
        } else {
            download(download_filename, JSON.stringify(entry, null, 2))
        }
    }

    // Modal has a 'open an issue' link, pre-filled with the error message
    const issue_body_text = `https://github.com/alan-turing-institute/scivision/issues/new?title=sci.vision%20error%20opening%20pull%20request&labels=bug%2Cfrontend&body=The%20error%20message%20was:%0A%0A%3E%20${pr_message}`

    return (
        <div className="mb-5">
            <Modal show={!!pr_failed} onHide={() => set_pr_failed(false)}>
                <Modal.Header closeButton>
                    <b>Error opening pull request on GitHub</b>
                </Modal.Header>
                <Modal.Body>
                    The error was:
                    <p>
                        <div className="text-monospace col mt-2">
                            {pr_message}
                        </div>
                    </p>
                    <p>
                        This may be a bug. If the problem persists, please{' '}
                        <a href={issue_body_text}>open an issue</a>.
                    </p>
                </Modal.Body>
            </Modal>
            <Form
                onSubmit={submitEntryToGitHub}
                schema={schema}
                uiSchema={uiSchema}
                templates={{ DescriptionFieldTemplate, ...templates }}
                formData={formData}
                onChange={onChange}
                validator={validator}
            >
                <h5>Thumbnail Image</h5>
                <hr
                    className="bg-secondary border-0"
                    style={{ height: '1px' }}
                />
                <div className="d-flex justify-content-end align-items-center flex-wrap">
                    <div class="flex-grow-1">
                        {currentThumbnailPreview ? (
                            <img
                                src={currentThumbnailPreview}
                                width="256"
                                height="256"
                            />
                        ) : (
                            <PlaceholderImage size="256px" />
                        )}
                    </div>
                    <div>
                        <Button onClick={() => setShowThumbnailModal(true)}>
                            Choose thumbnail image
                        </Button>
                    </div>
                    <ImageUploadModal
                        onChangeThumbnail={(imageData) => {
                            onChangeThumbnail(imageData)
                            setCurrentThumbnailPreview(imageData)
                        }}
                        show={showThumbnailModal}
                        setShow={setShowThumbnailModal}
                    />
                </div>
                <hr
                    className="bg-secondary border-0"
                    style={{ height: '1px' }}
                />
                <Col className="my-3">
                    <Button
                        type="submit"
                        onClick={() => (pr_flag = true)}
                        disabled={!gh_logged_in || pr_loading}
                    >
                        Open Pull Request on GitHub{' '}
                        {pr_loading ? (
                            <Spinner
                                animation="border"
                                role="status"
                                size="sm"
                            />
                        ) : null}
                        {gh_logged_in ? null : <> (login to enable)</>}
                    </Button>
                    <Button
                        type="submit"
                        variant="link"
                        onClick={() => (pr_flag = false)}
                    >
                        Download entry data as json
                    </Button>
                </Col>
            </Form>
        </div>
    )
}

export function CatalogFormHowItWorksBox() {
    return (
        <Alert variant="secondary">
            <ul className="list-spaced">
                <li>
                    The Scivision catalogs are stored as plain text (json) files
                    in the Scivision GitHub repository.
                </li>
                <li>
                    Rather than hand-editing a json file and making the change
                    on GitHub yourself, using this form will propose the change
                    automatically (it will submit a GitHub pull request on your
                    behalf)
                </li>
                <li>
                    Further discussion and changes are possible on GitHub after
                    submission (incomplete entries or entries needing further
                    discussion are fine)
                </li>
                <li>
                    After submitting your entry, a maintainer will review and
                    merge it, and then it will be included in the catalog
                </li>
            </ul>
        </Alert>
    )
}
