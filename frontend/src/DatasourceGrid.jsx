import GridContents from "./GridContents.jsx"
import DatasourceNav from "./DatasourceNav.jsx"

import datasources from './catalog/data/datasources.json';
import { datasource_thumbnails } from "./thumbnails.js"

function DatasourceGridContents() {
    return (<GridContents
                catalog={datasources}
                thumbnails={datasource_thumbnails}
                baseRoute="/datasource"
            />);
}

// Component: Datasources, thumbnail grid view
// route: /datasource-grid
export default function DatasourceGrid() {
    return (<>
                <DatasourceNav />
                <DatasourceGridContents />
            </>);
}
