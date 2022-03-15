#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import os
from urllib.parse import urlparse

import fsspec
import intake
import yaml

from ..koala import koala
from .installer import install_package
from .wrapper import PretrainedModel

import warnings


def _is_url(path: os.PathLike) -> bool:
    return urlparse(path).scheme in (
        "http",
        "https",
    )


def _parse_url(path: os.PathLike, branch: str = "main"):
    """Parse a URL and convert to a raw github url if necessary."""

    parsed = urlparse(path)

    if parsed.netloc not in ["github.com"]:
        return parsed.geturl()

    if parsed.netloc == "github.com":
        # construct the new github path
        parsed = parsed._replace(netloc="raw.githubusercontent.com")
        split = list(filter(None, parsed.path.split("/")))
        if branch not in split:
            new_path = "/".join(split[:2]) + f"/{branch}/" + "/".join(split[2:])
        else:
            new_path = "/".join(split)
        new_path = new_path.replace("/blob", "")

        parsed = parsed._replace(path=new_path)
        return parsed.geturl()
    else:
        raise NotImplementedError


def _get_model_configs(
    full_config: dict, load_multiple: bool = False, model: str = "default"
):
    """Get one config per model from a multi-model config.

    Parameters
    ----------
    full_config : dict
        Dictionary of a .scivision/model.yml config loaded from yaml.
    load_multiple : bool, default = False
        Modifies the return to be a list of scivision.PretrainedModel's.
    model : str, default = default
        Specify the name of a model to get the config for.

    Returns
    -------
    List of dictionaries
        One dictionary per config model.
    """
    # Create a list that will contain one or multiple model configs
    config_list = []
    if (
        "models" in full_config
    ):  # if there are multiple models specified in the config yml
        if load_multiple:
            # Create a config for each model
            for model_dict in full_config["models"]:
                new_config = {}
                new_config["name"] = full_config["name"]
                new_config["url"] = full_config["url"]
                new_config["import"] = full_config["import"]
                new_config["model"] = model_dict["model"]
                new_config["args"] = model_dict["args"]
                new_config["prediction_fn"] = model_dict["prediction_fn"]
                config_list.append(new_config)
        else:
            # Choose the first model in the list by default
            if model == "default":
                full_config["model"] = full_config["models"][0]["model"]
                full_config["args"] = full_config["models"][0]["args"]
                full_config["prediction_fn"] = full_config["models"][0]["prediction_fn"]
            # Choose the named model:
            else:
                for model_dict in full_config["models"]:
                    if model_dict["model"] == model:
                        full_config["model"] = model_dict["model"]
                        full_config["args"] = model_dict["args"]
                        full_config["prediction_fn"] = model_dict["prediction_fn"]
                        break
                # Check that a model of name "model" in .scivision/model.yml config
                if "model" not in full_config:
                    raise ValueError(
                        "model of name " + model + " not found in config yaml"
                    )
            config_list.append(full_config)
    else:  # if there is a single model specified in the config yml
        if load_multiple:
            warnings.warn(
                "Only one model found in config yaml "
                "(i.e., no 'models' section in the config file), "
                "will load that one..."
            )
        # Check that a model of name "model" in .scivision/model.yml config
        if model != "default" and full_config["model"] != model:
            raise ValueError("model of name " + model + " not found in config yaml")
        config_list.append(full_config)
    return config_list


@koala
def load_pretrained_model(
    path: os.PathLike,
    branch: str = "main",
    allow_install: bool = False,
    model: str = "default",
    load_multiple: bool = False,
    *args,
    **kwargs,
) -> PretrainedModel:
    """Load a pre-trained model.

    Parameters
    ----------
    path : PathLike
        The filename, path or URL of a pretrained model description.
    branch : str, default = main
        Specify the name of a github branch if loading from github.
    allow_install : bool, default = False
        Allow installation of remote package via pip.
    model : str, default = default
        Specify the name of the model if there is > 1.
    load_multiple : bool, default = False
        Modifies the return to be a list of scivision.PretrainedModel's.

    Returns
    -------
    pretrained_model : scivision.PretrainedModel
        The instantiated pre-trained model.
    """

    if _is_url(path):
        path = _parse_url(path, branch)
    # check that this is a path to a yaml file
    # if not, assume it is a repo containing ".scivision/model.yml"
    if not path.endswith(
        (
            ".yml",
            ".yaml",
        )
    ):
        path = path + ".scivision/model.yml"
    # fsspec will throw an error if the path does not exist
    file = fsspec.open(path)
    # parse the config file:
    with file as config_file:
        stream = config_file.read()
        config = yaml.safe_load(stream)
    config_list = _get_model_configs(config, load_multiple, model)
    loaded_models = []
    for config in config_list:
        # make sure a model at least has an input to the function
        assert "X" in config["prediction_fn"]["args"].keys()

        # try to install the package if necessary
        install_package(config, allow_install=allow_install, branch=branch)

        loaded_models.append(PretrainedModel(config))
    if load_multiple:
        return loaded_models
    # By default, return a single PretrainedModel
    return loaded_models[0]


def load_dataset(
    path: os.PathLike, branch: str = "main"
) -> intake.catalog.local.YAMLFileCatalog:
    """Load a dataset.

    Parameters
    ----------
    path : PathLike
        The filename, path or URL of an intake catalog, which links to a dataset.
    branch : str, default = main
        Specify the name of a github branch if loading from github.

    Returns
    -------
    intake.catalog.local.YAMLFileCatalog
        An intake catalog object representing the loaded dataset (see `intake.readthedocs <https://intake.readthedocs.io/en/latest/api_user.html?highlight=catalog.local.YAMLFileCatalog#intake.catalog.local.YAMLFileCatalog>`_).
    """

    if _is_url(path):
        path = _parse_url(path, branch)
    # check that this is a path to a yaml file
    # if not, assume it is a repo containing ".scivision/data.yml"
    if not path.endswith(
        (
            ".yml",
            ".yaml",
        )
    ):
        path = path + ".scivision/data.yml"
    # fsspec will throw an error if the path does not exist
    fsspec.open(path)

    intake_cat = intake.open_catalog(path)

    return intake_cat
