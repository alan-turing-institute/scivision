#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import pkgutil
from typing import Dict, List

import pandas as pd
import json

from .base_catalog import BaseCatalog
from ..koala import koala


class PandasCatalog(BaseCatalog):
    def __init__(self):
        super().__init__()

        datasources_uri = pkgutil.get_data(__name__, "data/datasources.json")
        models_uri = pkgutil.get_data(__name__, "data/models.json")

        datasources = pd.read_json(datasources_uri, orient="index")
        models = pd.read_json(models_uri, orient="index")

        self._models = models.explode("task").explode("data_format")
        self._datasources = datasources.explode("task").explode("format")

    @property
    def _database(self) -> pd.DataFrame:
        return self._models.merge(
            self._datasources,
            suffixes=("_model", "_data"),
            how="inner",
            left_on=["task", "data_format"],
            right_on=["task", "format"],
        )

    def _query(self, query: Dict[str, str]) -> list:
        """Query the Pandas dataframe."""
        queries = [f"{k} == '{v}'" for k, v in query.items()]
        query_str = " & ".join(queries)
        result = self._database.query(query_str)
        return result.to_dict("records")

    @property
    def keys(self) -> List[str]:
        """Return the query keys."""
        return self._database.columns.tolist()

    def values(self, key: str) -> List[str]:
        """Return the unique values for a query key."""
        if key not in self.keys:
            raise ValueError(f"Key {key} not found.")
        values = self._database[key].tolist()
        return list(set(values))


_catalog = PandasCatalog()


@koala
def query(query: Dict[str, str]) -> list:
    """Search the catalog using the query.

    Parameters
    ----------
    query : dict
        A dictionary describing the search query as key value pairs.

    Returns
    -------
    result : list
        A list of catalog entries matching the search requirements.
    """

    result = _catalog.query(query)
    return result


@koala
def keys() -> List[str]:
    return _catalog.keys


@koala
def values(key: str) -> List[str]:
    return _catalog.values(key)
    
    
def add_dataset(dataset: str, catalog: str) -> None:
    """Add a new dataset entry to the dataset catalog.
    
    Parameters
    ----------
    dataset : str
        A path to the json file specifying the dataset to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision dataset catalog.
    """
    with open(dataset) as file:
        entry = json.load(file)
    with open(catalog) as file:
        catalog_dict = json.load(file)
    catalog_dict = catalog_dict | entry # Note: Python 3.9+ only
    with open(catalog, 'w') as datasources:
        json.dump(catalog_dict, datasources, sort_keys=True, indent=4)


def add_model(entry):
    return 1
