import GridContents from "./grid.js"
import DatasourceNav from "./DatasourceNav.js"

import datasources from './data/datasources.json';
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
