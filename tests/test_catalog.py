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
        assert len(cat.models == 2)
        assert len(cat.datasources == 2)
        assert cat.models.iloc[0]["name"] == "example-model-1"
        assert cat.datasources.iloc[0]["name"] == "example-datasource-1"

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

        assert len(cat.models == 2)
        assert len(cat.datasources == 2)
        assert cat.models.iloc[0]["name"] == "example-model-1"
        assert cat.datasources.iloc[0]["name"] == "example-datasource-1"


class TestCompatible:
    """Checks that compatible models and datasources in a catalog can be
    correctly identified"""

    @pytest.fixture
    def cat(self):
        return PandasCatalog(
            datasources="tests/test_datasource_catalog.json",
            models="tests/test_model_catalog.json",
        )

    def test_compatible_models_named(self, cat):
        assert len(cat.compatible_models("example-datasource-1")) == 2
        assert len(cat.compatible_models("example-datasource-2")) == 1

    def test_compatible_datasources_named(self, cat):
        assert len(cat.compatible_datasources("example-model-1")) == 1
        assert len(cat.compatible_datasources("example-model-2")) == 2

    def test_compatible_models_dict(self, cat):
        compat = cat.compatible_models(
            {"labels": False, "tasks": ["object-detection"], "format": "image"}
        )
        assert len(compat) == 1 and compat["name"].item() == "example-model-2"

    def test_compatible_datasources_dict(self, cat):
        compat = cat.compatible_datasources(
            {"labels_required": False, "tasks": ["object-detection"], "format": "image"}
        )
        assert len(compat) == 1 and compat["name"].item() == "example-datasource-1"
