import { ModelTableContents } from "./table.js"
import ModelNav from "./ModelNav.js"

// Component: Models, table view
// route: /models
export default function ModelTable() {
    return (<>
                <ModelNav />
                <ModelTableContents />
            </>);
}
