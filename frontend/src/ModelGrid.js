import GridContents from "./GridContents.js"
import ModelNav from "./ModelNav.js"

import models from './catalog/data/models.json';
import { model_thumbnails } from "./thumbnails.js"

function ModelGridContents() {
    return (<GridContents
                catalog={models}
                thumbnails={model_thumbnails}
                baseRoute="/model"
            />);
}

// Component: Models, thumbnail grid view
// route: /model-grid
export default function ModelGrid() {
    return (<>
                <ModelNav />
                <ModelGridContents />
            </>);
}
