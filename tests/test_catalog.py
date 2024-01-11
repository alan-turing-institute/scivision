import pytest
import scivision.catalog
from pydantic import ValidationError
from pathlib import Path
from scivision.catalog import PandasCatalog, CatalogModels


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
            datasources="tests/test_datasource_catalog.json",
            models="tests/test_model_catalog.json",
            projects="tests/test_project_catalog.json",
        )

        models = cat.models.to_dataframe()
        datasources = cat.datasources.to_dataframe()

        assert len(models == 2)
        assert len(datasources == 2)
        assert models.iloc[0]["name"] == "example-model-1"
        assert datasources.iloc[0]["name"] == "example-datasource-1"

    def test_init_bad(self):
        """Check that an exception is raised when the json does not conform to
        the schema
        """
        with pytest.raises(ValidationError):
            PandasCatalog(
                datasources="tests/test_datasource_catalog_bad.json",
                models="tests/test_model_catalog.json",
                projects="tests/test_project_catalog.json",
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

        projects = scivision.catalog.CatalogProjects.parse_raw(
            Path("tests/test_project_catalog.json").read_text()
        )

        # Then used to initialize the catalog
        cat = PandasCatalog(datasources, models, projects)

        models = cat.models.to_dataframe()
        datasources = cat.datasources.to_dataframe()

        assert len(models == 2)
        assert len(datasources == 2)
        assert models.iloc[0]["name"] == "example-model-1"
        assert datasources.iloc[0]["name"] == "example-datasource-1"


class TestCompatible:
    """Checks that compatible models and datasources in a catalog can be
    correctly identified"""

    @pytest.fixture
    def cat(self):
        return PandasCatalog(
            datasources="tests/test_datasource_catalog.json",
            models="tests/test_model_catalog.json",
            projects="tests/test_project_catalog.json",
        )

    def test_compatible_models_named(self, cat):
        assert len(cat.compatible_models("example-datasource-1").to_dataframe()) == 2
        assert len(cat.compatible_models("example-datasource-2").to_dataframe()) == 1

    def test_compatible_datasources_named(self, cat):
        assert len(cat.compatible_datasources("example-model-1").to_dataframe()) == 1
        assert len(cat.compatible_datasources("example-model-2").to_dataframe()) == 2

    def test_compatible_models_dict(self, cat):
        compat = cat.compatible_models(
            {"tasks": ["segmentation"]}
        ).to_dataframe()
        assert len(compat) == 1 and compat["name"].item() == "example-model-2"

    def test_compatible_datasources_dict(self, cat):
        compat = cat.compatible_datasources(
            {"tasks": ["segmentation"]}
        ).to_dataframe()
        assert len(compat) == 1 and compat["name"].item() == "example-datasource-2"


def test_query_to_catalog_entry():
    """Check that a pair of CatalogModels/CatalogDatasources can be
    converted to a PandasCatalog and back
    """
    datasources_cat_expected = scivision.catalog.CatalogDatasources.parse_raw(
        Path("tests/test_datasource_catalog.json").read_text()
    )
    models_cat_expected = scivision.catalog.CatalogModels.parse_raw(
        Path("tests/test_model_catalog.json").read_text()
    )
    projects_cat_expected = scivision.catalog.CatalogProjects.parse_raw(
        Path("tests/test_project_catalog.json").read_text()
    )
    cat = PandasCatalog(
        datasources=datasources_cat_expected,
        models=models_cat_expected,
        projects=projects_cat_expected,
    )
    models_cat_actual = CatalogModels(
        entries=cat.models.to_dict(),
        catalog_type=models_cat_expected.catalog_type,
        name=models_cat_expected.name,
    )
    assert models_cat_actual == models_cat_expected
