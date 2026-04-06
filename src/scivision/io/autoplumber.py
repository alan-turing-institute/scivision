#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import importlib
import inspect
from typing import NamedTuple

import numpy as np


_ALLOWED_IMPORT_PREFIXES = ("scivision",)


def _validate_import_path(import_path: str):
    if not isinstance(import_path, str) or not import_path:
        raise ValueError("`import` must be a non-empty string.")

    parts = import_path.split(".")
    if not all(part.isidentifier() for part in parts):
        raise ValueError(f"Invalid import path `{import_path}` in configuration.")

    if parts[0] not in _ALLOWED_IMPORT_PREFIXES:
        raise ValueError(
            f"Import path `{import_path}` is not allowed. "
            f"Allowed top-level modules: {_ALLOWED_IMPORT_PREFIXES}."
        )


def _validate_attr_name(attr: str, field: str):
    if not isinstance(attr, str) or not attr or not attr.isidentifier() or attr.startswith("_"):
        raise ValueError(f"`{field}` must be a public identifier.")


class DataPipe(NamedTuple):
    input: inspect.Parameter
    output: inspect.Parameter


class AutoPlumber:
    """Automagically plumb a model using the Scivision config file.

    This class will inspect the module and try to work out how to
    map the inputs of the Callable to the Scivision function
    signature.

    Attributes
    ----------
    config : dict
        The Scivision config as a dictionary.

    """

    def __init__(self, config: dict):

        # import the module and get the model object
        import_path = config["import"]
        _validate_import_path(import_path)
        _validate_attr_name(config["model"], "model")
        _validate_attr_name(config["prediction_fn"]["call"], "prediction_fn.call")

        self._module = importlib.import_module(import_path)
        model = getattr(self._module, config["model"])

        # we could instantiate the model using the args here
        # args = config["args"]
        self._model = model()

        self._fn = getattr(self._model, config["prediction_fn"]["call"])

        # get the call signature
        self._model_signature = inspect.signature(self._fn)
        model_input = config["prediction_fn"]["args"]["X"]
        try:
            model_param = self._model_signature.parameters[model_input]
        except KeyError:
            raise KeyError(
                f"Parameter `{model_input}` not found in "
                f"`{self._model.__class__.__name__}`. There was an error "
                f"parsing the `.scivision/model.yml` configuration file."
            )

        # this is a bit weird as we're determining our own signature, but...
        X = inspect.signature(self).parameters["X"]
        self._pipe = DataPipe(X, model_param)

    @property
    def module(self):
        return self._module

    @property
    def model(self):
        return self._model

    @property
    def pipe(self):
        return self._pipe

    def __call__(self, X: np.ndarray, **kwargs):
        """Redirect the input X to the correct input of the model."""

        # TODO(arl): this is where the actual piping needs to happen
        model_args = []
        model_kwargs = {self.pipe.output.name: X}

        # optionally, we can also pass on other keyword arguments to the model
        model_kwargs.update(kwargs)
        return self._fn(*model_args, **model_kwargs)


class DataPlumber:
    """Automagically plumb a data plugin using the Scivision config file.

    This class will inspect the module and try to work out how to
    map the inputs of the Callable to the Scivision function
    signature.

    Attributes
    ----------
    config : dict
        The Scivision config as a dictionary.

    """

    def __init__(self, config: dict):

        # import the module and get the data function
        import_path = config["import"]
        _validate_import_path(import_path)
        _validate_attr_name(config["class"], "class")
        _validate_attr_name(config["func"]["call"], "func.call")

        self._module = importlib.import_module(import_path)
        data_class = getattr(self._module, config['class'])
        self._fn = getattr(data_class, config['func']['call'])

        self._data_func_signature = inspect.signature(self._fn)

    @property
    def module(self):
        return self._module

    def __call__(self, **kwargs):
        """Redirect the input X to the correct input of the data function."""

        data_func_args = []
        data_func_kwargs = {}

        # optionally, we can also pass on other keyword arguments to the data_func
        data_func_kwargs.update(kwargs)
        return self._fn(*data_func_args, **data_func_kwargs)
