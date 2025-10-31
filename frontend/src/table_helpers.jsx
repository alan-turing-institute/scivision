// Various helper functions for making the model, datasource and
// project table views

// Helper function (used in ModelTable and DatasourceTable -- not the
// corresponding Gridviews) returning a thumbnail element

// export function renderThumbnailForTable(thumb) {
//   if (thumb !== undefined) {
//     return (
//       <img src={thumb} width="128" height="128" className="img-thumbnail" />
//     );
//   } else {
//     return <></>;
//   }
// }

export function renderThumbnailForTable(thumb, name, type) {
    if (thumb !== undefined) {
        return (
            <img
                src={`/scivision/catalog/data/thumbnails/${type}s/${name}.jpg`}
                width="128"
                height="128"
                className="img-thumbnail"
            />
        )
    } else {
        return <></>
    }
}

// Component: Format the element in an 'info box'.
// Used for expanded rows in ModelTable/DatasourceTable
export function TableCardDropdown({ element }) {
    return (
        <div className="border-bottom">
            <div className="card bg-light mb-3 mt-1">
                <div className="card-body">{element}</div>
            </div>
        </div>
    )
}
