import pytest
import scivision.catalog
from pydantic import ValidationError
from pathlib import Path
from scivision.catalog import PandasCatalog


class TestPandasCatalogInit:
    """Checks that PandasCatalogs can be constructed from several argument
    types."""

    def test_init_default(self):
        """Load the default catalog. Check that no exceptions are raised
        (default catalog may get updated, so no further checks)
        """

        PandasCatalog()

    def test_init_filenames(self):
        """Load catalog from explicit paths, and check that the entries are as
        expected
        """
        cat = PandasCatalog(
            "tests/test_datasource_catalog.json", "tests/test_model_catalog.json"
        )
        assert len(cat.models == 1)
        assert len(cat.datasources == 1)
        assert cat.models.iloc[0]["name"] == "model-000"
        assert cat.datasources.iloc[0]["name"] == "data-000"

    def test_init_bad(self):
        """Check that an exception is raised when the json does not conform to
        the schema
        """
        with pytest.raises(ValidationError):
            PandasCatalog(
                datasources="tests/test_datasource_catalog_bad.json",
                models="tests/test_model_catalog.json",
            )

    def test_init_entry(self):
        """Load catalog from CatalogDatasources/CatalogModels instances"""

        # Instances created from json strings separately first
        datasources = scivision.catalog.CatalogDatasources.parse_raw(
            Path("tests/test_datasource_catalog.json").read_text()
        )

        models = scivision.catalog.CatalogModels.parse_raw(
            Path("tests/test_model_catalog.json").read_text()
        )
        # Then used to initialize the catalog
        cat = PandasCatalog(datasources, models)

        assert len(cat.models == 1)
        assert len(cat.datasources == 1)
        assert cat.models.iloc[0]["name"] == "model-000"
        assert cat.datasources.iloc[0]["name"] == "data-000"
