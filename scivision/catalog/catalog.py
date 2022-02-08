#!/usr/bin/env python
# -*- coding: utf-8 -*-

import abc
import pkgutil
import pandas as pd
import os
from pathlib import Path
from typing import Dict, List, Optional, FrozenSet, Tuple
from pydantic import BaseModel, AnyUrl
from enum import Enum

from ..koala import koala


class TaskEnum(str, Enum):
    classificiation = "classification"
    object_detection = "object-detection"
    segmentation = "segmentation"
    thresholding = "thresholding"


class CatalogModelEntry(BaseModel, extra="forbid"):
    name: str
    description: Optional[str]
    tasks: Tuple[TaskEnum, ...]
    url: AnyUrl
    pkg_url: AnyUrl
    format: str
    pretrained: bool
    labels_required: bool
    institution: Optional[str]
    tags: Tuple[str, ...]


class CatalogModels(BaseModel, extra="forbid"):
    catalog_type: str = "scivision model catalog"
    name: str
    entries: Tuple[CatalogModelEntry, ...]


class CatalogDatasourceEntry(BaseModel, extra="forbid"):
    name: str
    description: Optional[str]
    tasks: Tuple[TaskEnum, ...]
    domains: Tuple[str, ...]
    url: str
    format: str
    labels: bool
    institution: Optional[str]
    tags: Tuple[str, ...]


class CatalogDatasources(BaseModel, extra="forbid"):
    catalog_type: str = "scivision datasource catalog"
    name: str
    entries: Tuple[CatalogDatasourceEntry, ...]


class BaseCatalog(abc.ABC):
    @abc.abstractmethod
    def query(self, query: Dict[str, str]) -> list:
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
        raise NotImplementedError

    @abc.abstractmethod
    def keys(self) -> List[str]:
        raise NotImplementedError

    @abc.abstractmethod
    def values(self, key: str) -> List[str]:
        raise NotImplementedError


class PandasCatalog(BaseCatalog):
    def __init__(self, datasource_catalog=None, model_catalog=None):
        super().__init__()

        if datasource_catalog is None:
            datasources_raw = pkgutil.get_data(__name__, "data/datasources.json")
        else:
            datasources_raw = Path(datasource_catalog).read_text()

        if model_catalog is None:
            models_raw = pkgutil.get_data(__name__, "data/models.json")
        else:
            models_raw = Path(model_catalog).read_text()

        cat_datasources = CatalogDatasources.parse_raw(datasources_raw)
        cat_models = CatalogModels.parse_raw(models_raw)

        datasources = pd.DataFrame([ent.dict() for ent in cat_datasources.entries])
        models = pd.DataFrame([ent.dict() for ent in cat_models.entries])

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

    def models() ->
    
    def query(self, query: Dict[str, str]) -> list:
        """Query the Pandas dataframe."""
        queries = [f"{k} == '{v}'" for k, v in query.items()]
        query_str = " & ".join(queries)
        result = self._database.query(query_str)
        return result.to_dict("records")

    def keys(self) -> List[str]:
        """Return the query keys."""
        return self._database.columns.tolist()

    def values(self, key: str) -> List[str]:
        """Return the unique values for a query key."""
        if key not in self.keys():
            raise ValueError(f"Key {key} not found.")
        values = self._database[key].tolist()
        return list(set(values))


default_catalog = PandasCatalog()
