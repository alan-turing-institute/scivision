// Load the thumbnail images

// From a webpack object returned by require.context (ctxt), make a
// dictionary from the resource name to its path
//
// ctxt is callable, and calling it with the name of a resource
// returns the path to that resource.  It also has a '.keys()' method,
// which returns all the included resources.
//
// Could strip the leading './' and trailing extension (and then handle
// several file types)
export function context_to_paths(ctxt) {
    return ctxt.keys().reduce((dict, name) => {
        dict[name] = ctxt(name);
        return dict;
    }, {});
}

export const model_thumbnails_ctxt = require.context(
    './data/thumbnails/models', false, /\.jpg$/
);
export const model_thumbnails = context_to_paths(model_thumbnails_ctxt);

export const datasource_thumbnails_ctxt = require.context(
    './data/thumbnails/datasources', false, /\.jpg$/
);
export const datasource_thumbnails = context_to_paths(datasource_thumbnails_ctxt);

export const project_thumbnails_ctxt = require.context(
    './data/thumbnails/projects', false, /\.jpg$/
);
export const project_thumbnails = context_to_paths(project_thumbnails_ctxt);
