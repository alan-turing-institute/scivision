import scivision.catalog


class DatasourceWithExamples(scivision.catalog.CatalogDatasourceEntry):
    class Config:
        @staticmethod
        def schema_extra(schema, model):
            cat = scivision.catalog.default_catalog.datasources.to_dataframe()

            tags = list(cat.tags.explode().unique())
            schema['properties']['tags']['items']['examples'] = tags

            domains = list(cat.domains.explode().unique())
            schema['properties']['domains']['items']['examples'] = domains

            institutions = list(cat.institution.explode().unique())
            schema['properties']['institution']['items']['examples'] = institutions


def entry_point():
    """
    Write the json schema for datasource and model catalog entries to files

    This is the entry point for the 'scivision-catalog-json-schema' command.

    This command writes the files datasource_schema.js and model_schema.js.
    """

    datasource_schema = DatasourceWithExamples.schema_json()
    with open("datasource_schema.js", "w") as f:
        print(f"const schema = {datasource_schema};", file=f)
        print("export default schema;", file=f)

    model_schema = scivision.catalog.CatalogModelEntry.schema_json()
    with open("model_schema.js", "w") as f:
        print(f"const schema = {model_schema};", file=f)
        print("export default schema;", file=f)

    project_schema = scivision.catalog.CatalogProjectEntry.schema_json()
    with open("project_schema.js", "w") as f:
        print(f"const schema = {project_schema};", file=f)
        print("export default schema;", file=f)
