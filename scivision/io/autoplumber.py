#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import importlib
import inspect
from typing import NamedTuple

import numpy as np


class DataPipe(NamedTuple):
    input: inspect.Parameter
    output: inspect.Parameter


class AutoPlumber:
    """Automagically plumb a model using the scivision config file.

    This class will inspect the module and try to work out how to
    map the inputs of the Callable to the scivision function
    signature.

    Attributes
    ----------
    config : dict
        The scivision config as a dictionary.

    """

    def __init__(self, config: dict):

        # import the module and get the model object
        self._module = importlib.import_module(config["import"])
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
                f"parsing the `.scivision-config.yaml` configuration file."
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
    """Automagically plumb a data plugin using the scivision config file.

    This class will inspect the module and try to work out how to
    map the inputs of the Callable to the scivision function
    signature.

    Attributes
    ----------
    config : dict
        The scivision config as a dictionary.

    """

    def __init__(self, config: dict):
        
        # data_module = importlib.import_module(self._config['import'])
        # data_class = getattr(data_module, self._config['class'])
        # data_func = getattr(data_class, self._config['func']['call'])
        # return data_func()

        # import the module and get the data function
        self._module = importlib.import_module(config["import"])
        data_class = getattr(self._module, config['class'])
        self._class = data_class()
        self._fn = getattr(self._class, config['func']['call'])

        # self._fn = data_func()

        # self._fn = getattr(self._model, config["prediction_fn"]["call"])

        # get the call signature
        self._data_func_signature = inspect.signature(self._fn)
        # data_func_input = config["func"]["args"]["X"]
        # try:
        #     data_func_param = self._data_func_signature.parameters[data_func_input]
        # except KeyError:
        #     raise KeyError(
        #         f"Parameter `{data_func_input}` not found."
        #         f"There was an error parsing the `.stac.yml` configuration file."
        #     )
        # 
        # # this is a bit weird as we're determining our own signature, but...
        # X = inspect.signature(self).parameters["X"]
        # self._pipe = DataPipe(X, data_func_param)

    @property
    def module(self):
        return self._module

    # @property
    # def model(self):
    #     return self._model

    # @property
    # def pipe(self):
    #     return self._pipe

    def __call__(self, **kwargs):
        """Redirect the input X to the correct input of the data function."""

        # TODO(arl): this is where the actual piping needs to happen
        data_func_args = []
        data_func_kwargs = {}

        # optionally, we can also pass on other keyword arguments to the data_func
        data_func_kwargs.update(kwargs)
        return self._fn(*data_func_args, **data_func_kwargs)