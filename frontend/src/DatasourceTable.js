import { DatasourceTableContents } from "./table.js"
import DatasourceNav from "./DatasourceNav.js"

// Component: Models, table view
// route: /datasources
export default function DatasourceTable() {
    return (<>
                <DatasourceNav />
                <DatasourceTableContents />
            </>);
}
