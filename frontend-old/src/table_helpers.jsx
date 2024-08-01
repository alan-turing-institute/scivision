// Various helper functions for making the model, datasource and
// project table views

// Helper function (used in ModelTable and DatasourceTable -- not the
// corresponding Gridviews) returning a thumbnail element
export function renderThumbnailForTable(thumb) {
  if (thumb !== undefined) {
    return (
      <img src={thumb} width="128" height="128" className="img-thumbnail" />
    );
  } else {
    return <></>;
  }
}

// Component: Format the element in an 'info box'.
// Used for expanded rows in ModelTable/DatasourceTable
export function TableCardDropdown({ element }) {
  return (
    <div className="border-bottom">
      <div className="card mt-1 mb-3 bg-light">
        <div className="card-body">{element}</div>
      </div>
    </div>
  );
}
