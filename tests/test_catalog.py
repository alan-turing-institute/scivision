from scivision.catalog import PandasCatalog


class TestPandasCatalogInit:
    """Checks that PandasCatalogs can be constructed from several argument
    types (currently just that no exceptions are raised)."""

    def test_init_default(self):
        """Load the default catalog"""
        PandasCatalog()

    def test_init_filenames(self):
        """Load catalog from explicit paths"""
        PandasCatalog(
            "tests/test_datasource_catalog.json", "tests/test_model_catalog.json"
        )
