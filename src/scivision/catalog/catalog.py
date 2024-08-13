#!/usr/bin/env python
# -*- coding: utf-8 -*-

import pkgutil
import pandas as pd
import os
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Any, Dict, FrozenSet, Optional, Tuple, Union
from pydantic import AnyUrl, BaseModel, Field, validator
from enum import Enum
from collections import Counter


class TaskEnum(str, Enum):
    classificiation = "classification"
    object_detection = "object-detection"
    segmentation = "segmentation"
    thresholding = "thresholding"
    shape_analysis = "shape-analysis"
    object_tracking = "object-tracking"
    other = "other"


class FlexibleUrl(AnyUrl):
    host_required = False


class CatalogModelEntry(BaseModel, extra="forbid", title="A model catalog entry"):
    # tasks, institution and tags are Tuples (rather than Lists) so
    # that they are immutable - Tuple is being used as an immutable
    # sequence here. This means that these fields are hashable, which
    # can be more convenient when included in a dataframe
    # (e.g. unique()). Could consider using a Frozenset for these
    # fields instead, since duplicates and ordering should not be
    # significant.
    name: str = Field(
        ...,
        title="Name",
        description="""Short, unique name for the model (one or two words, under 20 characters recommended)

- Good example :white_check_mark:: **Quux Classifier**
- Okay example :heavy_check_mark:: **quux-classifier**
- Bad example :x:: **model-456** (prefer a descriptive name)
- Bad example :x:: **The Quux classification model** (too long; no need to include 'model' in the name)""",
    )
    description: Optional[str] = Field(
        None,
        title="Description",
        description="Detailed description of the model",
    )
    tasks: FrozenSet[TaskEnum] = Field(
        (),
        title="Tasks",
        description="Which task (or tasks) does the model perform?",
    )
    pkg_url: str = Field(
        ...,
        title="Python package",
        description="""A pip requirement specifier to install the model

This might be just the name of your package if your model is a python package on PyPI, or a URL to the source repository on GitHub or another location (see examples below)

- Good example :white_check_mark:: `sampleproject` (install sampleproject from PyPI)
- Good example :white_check_mark:: `git+https://github.com/pypa/sampleproject@main` (install sampleproject directly from GitHub, main branch)
- Bad example :x:: `pip install my-python-package` (don't include the actual pip command, just the package name)
""",
    )
    scivision_usable: bool = Field(
        False,
        title="Model runs with Scivision?",
        description="""Can the model be installed and loaded with the Scivision Python package, using the command below?

```
scivision.load_pretrained_model(<model url>, allow_install=True)
```

Select 'no' if not sure""",
    )

    url: Optional[FlexibleUrl] = Field(
        None,
        title="Scivision metadata URL",
        description="""The URL to the Scivision metadata yaml file if the model runs with Scivision (leave blank if not)

- Good example :white_check_mark:: `https://raw.githubusercontent.com/alan-turing-institute/scivision_classifier/main/.scivision/model.yml`"""
    )

    institution: Tuple[str, ...] = Field(
        (),
        title="Institutions or organizations",
        description="A list of institutions or organizations that produced or "
        "are associated with the model (one per item)",
    )
    tags: Tuple[str, ...] = Field(
        (),
        title="Tags",
        description="A list of free-form labels to associate with a model",
    )

    def __getitem__(self, item):
        return getattr(self, item)


class CatalogModels(BaseModel, extra="forbid"):
    catalog_type: str = "scivision model catalog"
    name: str
    # Tuple: see comment on CatalogModelEntry
    entries: Tuple[CatalogModelEntry, ...]

    @validator("entries")
    def name_unique_key(cls, entries):
        name_counts = Counter([entry['name'] for entry in entries])
        dups = [item for item, count in name_counts.items() if count > 1]

        if dups:
            raise ValueError(f"The 'name' field in the model catalog should be unique (duplicates: {dups})")

        return entries


class CatalogDatasourceEntry(
    BaseModel, extra="forbid", title="Datasource catalog entry"
):
    name: str = Field(
        ...,
        title="Name",
        description="""Short, unique name for the datasource (one or two words, under 20 characters recommended)

- Good example :white_check_mark:: **Foobar Penguins**
- Okay example :heavy_check_mark:: **foobar-penguins**
- Bad example :x:: **dataset-123** (prefer a descriptive name)
- Bad example :x:: **Data from the Foobar penguin study** (too long; no need to include 'data' in the title)""",
    )

    description: Optional[str] = Field(
        None,
        title="Description",
        description="Detailed description of the dataset (no length limit)",
    )
    url: FlexibleUrl = Field(
        None,
        title="URL",
        description="""The URL to the datasource.  If your datasource has an associated Scivision yaml file, this should point to it.  Otherwise, give a URL for downloading the data

- Good example :white_check_mark:: `https://example.com/path/to/datasource.yml` (location of the Scivision yml file)
- Good example :white_check_mark:: `https://example.com/dataset/download/data.zip` (data download URL)
- Bad example :x:: `example.com/path/to/datasource.yml` (missing URL scheme, like 'https://')
""",
    )
    tasks: FrozenSet[TaskEnum] = Field(
        None,
        title="Suitable tasks",
        description="For which computer vision task or tasks is this "
        "datasource likely to be suitable? Select any number"
    )
    labels_provided: bool = Field(
        False,
        title="Labels included?",
        description="Does the datasource contain labelled examples, suitable for model training or validation?"
    )
    domains: FrozenSet[str] = Field(
        None,
        title="Domain areas",
        description="Which domain area or areas is this datasource from? (One per item, no duplicates)",
        # Note: using uniqueItems (used for the json schema) rather
        # than unique_items (which is not possible to enforce on a
        # Tuple).  Could use a set/frozenset instead, or a tuple
        # variant with a constraint.
        uniqueItems=True,
    )
    institution: Tuple[str, ...] = Field(
        (),
        title="Institutions or organizations",
        description="A list of institutions or organizations that produced or are "
        "associated with the dataset (one per item)",
    )
    tags: Tuple[str, ...] = Field(
        (),
        title="Tags",
        description="A list of free-form labels to associate with a datasource",
    )

    def __getitem__(self, item):
        return getattr(self, item)


class CatalogDatasources(BaseModel, extra="forbid"):
    catalog_type: str = "scivision datasource catalog"
    name: str
    # Tuple: see comment on CatalogModelEntry
    entries: Tuple[CatalogDatasourceEntry, ...]

    @validator("entries")
    def name_unique_key(cls, entries):
        name_counts = Counter([entry['name'] for entry in entries])
        dups = [item for item, count in name_counts.items() if count > 1]

        if dups:
            raise ValueError(f"The 'name' field in the datasource catalog should be unique (duplicates: {dups})")

        return entries


class CatalogProjectEntry(BaseModel, extra="forbid", title="A project catalog entry"):
    name: str = Field(
        ...,
        title="Name",
        description="Short, unique name for the project (one or two words, under 20 characters recommended)",
    )
    header: str = Field(
        ...,
        title="Header",
        description="Header that will display at the top of the project page",
    )
    description: Optional[str] = Field(
        None,
        title="Description",
        description="Short description of the project (that will appear when hovering on the project thumbnail)",
    )
    page: str = Field(
        None,
        title="Page",
        description="Markdown formatted content for the project page",
    )
    models: Tuple[str, ...] = Field(
        (),
        title="Models",
        description="Which model(s) from the Scivision catalog are used in the project? (There must be at least one model)",
    )
    datasources: Tuple[str, ...] = Field(
        (),
        title="Datasources",
        description="Which datasource(s) from the Scivision catalog are used in the project? (There must be at least one datasource)",
    )
    tasks: FrozenSet[TaskEnum] = Field(
        (),
        title="Tasks",
        description="Which task (or tasks) do the CV models used in the project perform?",
    )
    institution: Tuple[str, ...] = Field(
        (),
        title="Institutions or organizations",
        description="A list of institutions or organizations that produced or are "
        "associated with the project (one per item)",
    )
    tags: Tuple[str, ...]

    def __getitem__(self, item):
        return getattr(self, item)


class CatalogProjects(BaseModel, extra="forbid"):
    catalog_type: str = "scivision project catalog"
    name: str
    # Tuple: see comment on CatalogModelEntry
    entries: Tuple[CatalogProjectEntry, ...]

    @validator("entries")
    def name_unique_key(cls, entries):
        name_counts = Counter([entry['name'] for entry in entries])
        dups = [item for item, count in name_counts.items() if count > 1]

        if dups:
            raise ValueError(f"The 'name' field in the project catalog should be unique (duplicates: {dups})")

        return entries


def _coerce_datasources_catalog(
    datasources: Union[CatalogDatasources, os.PathLike, None]
) -> CatalogDatasources:
    """Returns a CatalogDatasources determined from the argument: either
    the one passed, or one loaded from a file
    """
    if isinstance(datasources, CatalogDatasources):
        return datasources
    elif isinstance(datasources, (bytes, str, os.PathLike)):
        datasources_raw = Path(datasources).read_text()
        return CatalogDatasources.parse_raw(datasources_raw)
    elif datasources is None:
        datasources_raw = pkgutil.get_data(__name__, "data/datasources.json")
        return CatalogDatasources.parse_raw(datasources_raw)
    else:
        raise TypeError("Cannot load datasource from unsupported type")


def _coerce_models_catalog(
    models: Union[CatalogModels, os.PathLike, None]
) -> CatalogModels:
    """Returns a CatalogModels determined from the argument: either the
    one passed, or one loaded from a file
    """
    if isinstance(models, CatalogModels):
        return models
    elif isinstance(models, (bytes, str, os.PathLike)):
        models_raw = Path(models).read_text()
        return CatalogModels.parse_raw(models_raw)
    elif models is None:
        models_raw = pkgutil.get_data(__name__, "data/models.json")
        return CatalogModels.parse_raw(models_raw)
    else:
        raise TypeError("Cannot load model from unsupported type")


def _coerce_projects_catalog(
    projects: Union[CatalogProjects, os.PathLike, None]
) -> CatalogProjects:
    """Returns a CatalogProjects determined from the argument: either the
    one passed, or one loaded from a file
    """
    if isinstance(projects, CatalogProjects):
        return projects
    elif isinstance(projects, (bytes, str, os.PathLike)):
        projects_raw = Path(projects).read_text()
        return CatalogProjects.parse_raw(projects_raw)
    elif projects is None:
        projects_raw = pkgutil.get_data(__name__, "data/projects.json")
        return CatalogProjects.parse_raw(projects_raw)
    else:
        raise TypeError("Cannot load project from unsupported type")


class QueryResult(ABC):
    @abstractmethod
    def to_dataframe(self) -> pd.DataFrame:
        ...

    def to_dict(self) -> Dict[str, Any]:
        return self.to_dataframe().to_dict(orient="records")


class PandasQueryResult(QueryResult):
    def __init__(self, result: pd.DataFrame):
        self._result = result

    def to_dataframe(self) -> pd.DataFrame:
        return self._result


class PandasCatalog:
    def __init__(self, datasources=None, models=None, projects=None):
        super().__init__()

        if isinstance(datasources, pd.DataFrame):
            self._datasources = datasources
        else:
            datasources_cat = _coerce_datasources_catalog(datasources)
            self._datasources = pd.DataFrame(
                [ent.dict() for ent in datasources_cat.entries]
            )

        if isinstance(models, pd.DataFrame):
            self._models = models
        else:
            models_cat = _coerce_models_catalog(models)
            self._models = pd.DataFrame([ent.dict() for ent in models_cat.entries])

        if isinstance(projects, pd.DataFrame):
            self._projects = projects
        else:
            projects_cat = _coerce_projects_catalog(projects)
            self._projects = pd.DataFrame([ent.dict() for ent in projects_cat.entries])

        self.validate()

    def validate(self):
        """Extra validation

        Raise ValueError if projects refer to nonexistent models or datasources
        """
        for _, proj in self._projects.iterrows():
            proj_models = pd.Series(proj.models)
            unknown_models = proj_models[~proj_models.isin(self._models.name)]
            if len(unknown_models) > 0:
                unknown_models_str = ', '.join(unknown_models.tolist())
                raise ValueError(
                    "A project catalog entry refers to a model not in the "
                    f"model catalog\n  Project: {proj['name']}\n  Unknown models: "
                    f"{unknown_models_str}"
                )

            proj_datasources = pd.Series(proj.datasources)
            unknown_datasources = proj_models[
                ~proj_datasources.isin(self._datasources.name)
            ]
            if len(unknown_datasources) > 0:
                unknown_datasources_str = ', '.join(unknown_datasources.tolist())
                raise ValueError(
                    "A project catalog entry refers to a datasource not in the "
                    f"datasource catalog\n  Project: {proj['name']}\n  Unknown "
                    f"datasources: {unknown_datasources_str}"
                )

    @property
    def models(self) -> PandasQueryResult:
        return PandasQueryResult(self._models)

    @property
    def datasources(self) -> PandasQueryResult:
        return PandasQueryResult(self._datasources)

    @property
    def projects(self) -> PandasQueryResult:
        return PandasQueryResult(self._projects)

    def _compatible_models(self, datasource) -> PandasQueryResult:
        datasource_tasks = pd.DataFrame(datasource["tasks"], columns=["tasks"])
        models_compatible_tasks = (
            self._models[["name", "tasks"]]
            .explode("tasks")
            .merge(
                datasource_tasks,
                on="tasks",
                suffixes=("_model", "_datasource"),
            )
            .name.drop_duplicates()
        )
        result_df = self._models[
            self._models.name.isin(models_compatible_tasks)
        ]

        return PandasQueryResult(result_df)

    def _compatible_datasources(self, model) -> PandasQueryResult:
        model_tasks = pd.DataFrame(model["tasks"], columns=["tasks"])
        datasources_compatible_tasks = (
            self._datasources[["name", "tasks"]]
            .explode("tasks")
            .merge(
                model_tasks,
                on="tasks",
                suffixes=("_model", "_datasource"),
            )
            .name.drop_duplicates()
        )
        result_df = self._datasources[
            self._datasources.name.isin(datasources_compatible_tasks)
        ]

        return PandasQueryResult(result_df)

    def compatible_models(self, datasource) -> PandasQueryResult:
        """Return all models that are compatible with datasource

        Parameters
        ----------
        datasource : str or dict-like
            Any dictionary-like (including CatalogDatasourceEntry) that
            has keys 'format', 'tasks' and 'labels_provided', representing
            these properties of the datasource.
            If a string is passed, this is used to look up the datasource
            (in `self._datasources`).

        Returns
        -------
        result: QueryResult
            A QueryResult instance containing the models compatible with the
            given datasource (convertible to a dict or pd.DataFrame).

        """
        if isinstance(datasource, str):
            return self._compatible_models(
                self._datasources.set_index("name").loc[datasource]
            )
        else:
            return self._compatible_models(datasource)

    def compatible_datasources(self, model) -> PandasQueryResult:
        """Return all datasources that are compatible with model

        Parameters
        ----------
        model : str or dict-like
            Any dictionary-like (including CatalogModelEntry) that has
            keys 'format', 'tasks' and 'labels_required', representing
            these properties of the model.
            If a string is passed, this is used to look up the model (in `self._models`).

        Returns
        -------
        result: QueryResult
            A QueryResult instance containing the datasources compatible with
            the given model (convertible to a dict or pd.DataFrame).

        """
        if isinstance(model, str):
            return self._compatible_datasources(
                self._models.set_index("name").loc[model]
            )
        else:
            return self._compatible_datasources(model)


default_catalog = PandasCatalog()
