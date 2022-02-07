#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pkgutil
import pandas as pd
import os
from pathlib import Path
from typing import Dict, List, Optional
from pydantic import BaseModel
from enum import Enum

from .base_catalog import BaseCatalog
from ..koala import koala


class TaskEnum(str, Enum):
    classificiation = "classification"
    object_detection = "object-detection"
    segmentation = "segmentation"
    thresholding = "thresholding"


class ModelCatalogEntry(BaseModel, extra="forbid"):
    name: str
    description: Optional[str]
    tasks: List[TaskEnum]
    url: str
    pkg_url: str
    format: str
    pretrained: bool
    labels_required: bool
    language: Optional[str]
    institution: Optional[str]
    tags: List[str]


class ModelCatalog(BaseModel, extra="forbid"):
    catalog_type: str = "scivision model catalog"
    name: str
    entries: List[ModelCatalogEntry]


class DataCatalogEntry(BaseModel, extra="forbid"):
    name: str
    description: Optional[str]
    tasks: List[TaskEnum]
    domains: List[str]
    url: str
    format: str
    labels: bool
    institution: Optional[str]
    tags: List[str]


class DataCatalog(BaseModel, extra="forbid"):
    catalog_type: str = "scivision datasource catalog"
    name: str
    entries: List[DataCatalogEntry]


class PandasCatalog(BaseCatalog):
    def __init__(self):
        super().__init__()

        datasources_raw = pkgutil.get_data(__name__, "data/datasources.json")
        models_raw = pkgutil.get_data(__name__, "data/models.json")

        datasources_cat = DataCatalog.parse_raw(datasources_raw)
        models_cat = ModelCatalog.parse_raw(models_raw)

        datasources = pd.DataFrame([ent.dict() for ent in datasources_cat.entries])
        models = pd.DataFrame([ent.dict() for ent in models_cat.entries])

        self._models = models.explode("tasks").explode("format")
        self._datasources = datasources.explode("tasks").explode("format")

    @property
    def _database(self) -> pd.DataFrame:
        return self._models.merge(
            self._datasources,
            suffixes=("_model", "_data"),
            how="inner",
            left_on=["tasks", "format"],
            right_on=["tasks", "format"],
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
