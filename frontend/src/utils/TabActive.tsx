// A few functions to help determine which navigation items to show
// as selected
const location_root = location.pathname.split('/')[1] // path starts with a '/'

export function model_tab_active() {
    return (
        location_root === 'model-grid' ||
        location_root === 'model-table' ||
        location_root === 'new-model' ||
        location_root === 'model'
    )
}

export function datasource_tab_active() {
    return (
        location_root === 'datasource-grid' ||
        location_root === 'datasource-table' ||
        location_root === 'new-datasource' ||
        location_root === 'datasource'
    )
}

export function project_tab_active() {
    return (
        location_root === 'project-grid' ||
        location_root === 'project-table' ||
        location_root === 'new-project' ||
        location_root === 'project'
    )
}

export function contribute_tab_active() {
    return location_root === 'contribute'
}

export function any_catalog_active() {
    return (
        model_tab_active() ||
        datasource_tab_active() ||
        project_tab_active() ||
        contribute_tab_active()
    )
}
