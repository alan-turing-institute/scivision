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

            formats = list(cat.format.explode().unique())
            schema['properties']['format']['examples'] = formats

            institutions = list(cat.institution.explode().unique())
            schema['properties']['institution']['items']['examples'] = institutions


def main():
    schema = DatasourceWithExamples.schema_json()
    with open("datasource_schema.js", "w") as f:
        print(f"const schema = {schema}", file=f)


if __name__=="__main__":
    main()
