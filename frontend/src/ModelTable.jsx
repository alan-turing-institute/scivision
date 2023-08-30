import DataTable from "react-data-table-component";

import ModelNav from "./ModelNav.jsx";
import { model_thumbnails } from "./thumbnails.js";
import {
  renderThumbnailForTable,
  TableCardDropdown,
} from "./table_helpers.jsx";
import { TaskBadge } from "./badges.jsx";

import models from "./catalog/data/models.json";

// Component: Fragment containing definition items for the expanded
// view of the model table, and the model page
//
// * data - one model
function ModelDefinitionList({ data }) {
  return (
    <dl className="row">
      <dt className="col-sm-3">Description</dt>
      <dd className="col-sm-9">
        {data.description ? data.description : "(none provided)"}
      </dd>

      <dt className="col-sm-3">Homepage</dt>
      <dd className="col-sm-9">
        <a href={data.url}>{data.url}</a>
      </dd>

      <dt className="col-sm-3">Install with pip</dt>
      <dd className="col-sm-9">
        <div>
          <code>pip install {data.pkg_url}</code>
        </div>
      </dd>
    </dl>
  );
}

function ModelTableContents() {
  const columns = [
    {
      name: "Thumbnail",
      width: "150px",
      selector: (row) => model_thumbnails[`./${row.name}.jpg`] === undefined,
      sortable: true,
      cell: (row, index, column, id) => {
        const thumb = model_thumbnails[`./${row.name}.jpg`];
        return renderThumbnailForTable(thumb);
      },
    },
    {
      name: "Name",
      sortable: true,
      grow: 0.5,
      selector: (row) => row.name,
    },
    {
      name: "Tasks",
      selector: (row) => row.tasks,
      cell: (row, index, column, id) =>
        row.tasks.map((t) => <TaskBadge key={t} taskName={t} />),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={models.entries}
      title=""
      expandableRowsComponent={(props) => (
        <TableCardDropdown element={<ModelDefinitionList {...props} />} />
      )}
      expandableRows
      expandableRowsHideExpander
      expandOnRowClicked
    />
  );
}

// Component: Models, table view
// route: /models
export default function ModelTable() {
  return (
    <>
      <ModelNav />
      <ModelTableContents />
    </>
  );
}
