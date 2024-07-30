import { Spinner, Modal, Alert, Button, Col } from 'react-bootstrap'
import MarkdownView from 'react-showdown'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'

import { download } from '@/utils/utils.js'

// Template (for rjsf) to allow Markdown formatting in form field
// descriptions
function DescriptionFieldTemplate({ description, id }) {
    return (
        <div id={id}>
            <MarkdownView markdown={description} options={{ emoji: true }} />
        </div>
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
// * schema - json schema object, used to generate the form
// * catalog_kind - "datasource" or "model",
export default function CatalogEntryForm({
    schema,
    uiSchema,
    templates,
    formData,
    onChange,
    catalog_kind,
    catalog_path,
    download_filename,
}) {
    // The modal dialogue shows when 'pr_failed' is true.  Separate
    // state variable (pr_message) for the message, since closing the
    // modal clears the failure flag, but the message is still visible
    // briefly
    // const [pr_message, set_pr_message] = useState('')
    // const [pr_failed, set_pr_failed] = useState(false)
    // const [pr_loading, set_pr_loading] = useState(false)

    // const [currentThumbnailPreview, setCurrentThumbnailPreview] =
    //     useState(thumbnailData)
    // const [showThumbnailModal, setShowThumbnailModal] = useState(false)

    // There is a single onSubmit event for both buttons, but can
    // use the onClick of the button to set this flag and decide
    // which one
    // let pr_flag

    async function createJsonForm(entry_submitted) {
        const entry = entry_submitted.formData
        const trimElements = ['name', 'description']
        trimElements.forEach((item) => {
            const entryTrimmed = entry[item] ? entry[item].trim() : ''
            entry[item] = entryTrimmed
        })
        download(download_filename, JSON.stringify(entry, null, 2))
        
    }

    return (
        <div className="mb-5">
            <Form
                onSubmit={createJsonForm}
                schema={schema}
                uiSchema={uiSchema}
                templates={{ DescriptionFieldTemplate, ...templates }}
                formData={formData}
                onChange={onChange}
                validator={validator}
            >
                <Col className="my-3">
                    <Button
                        type="submit"
                        variant="link"
                        onClick={() => (pr_flag = false)}
                    >
                        Download entry data as JSON
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
                    in the Scivision GitHub repository. Using this form will
                    generate a json file in the right format which you can then
                    submit through GitHub. Open an issue in the{' '}
                    <a href="https://github.com/alan-turing-institute/scivision">
                        scivision repository
                    </a>
                    , attaching this json file and an appropriate thumbnail, to
                    add your entry to the catalog.
                    <br />
                    <br />
                    You may choose to submit an incomplete entry - it can be
                    discussed and updated on GitHub following submission. After
                    submitting your entry, a maintainer will review and merge
                    it, and then it will be included in the catalog. It will
                    appear on this website, and it will be installable through
                    the GitHub repository. However, it won't be available
                    through PyPI until after the next release.
                </li>
            </ul>
        </Alert>
    )
}
