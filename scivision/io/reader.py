import os
from urllib.parse import urlparse

import fsspec
import yaml

from .installer import install_package
from .wrapper import PretrainedModel

SCIVISION_YAML_CONFIG = ".scivision-config.yaml"


def _is_url(path: os.PathLike) -> bool:
    return urlparse(path).scheme in ("http", "https",)


def _parse_url(path: os.PathLike, branch: str = "main"):
    """Parse a URL and convert to a raw github url if necessary."""
    parsed = urlparse(path)
    if not parsed.netloc == "github.com":
        return parsed.geturl()

    # construct the new github path
    parsed = parsed._replace(netloc="raw.githubusercontent.com")
    split = list(filter(None, parsed.path.split("/")))
    new_path = "/".join(split[:2]) + f"/{branch}/" + "/".join(split[2:])
    parsed = parsed._replace(path=new_path)
    return parsed.geturl()


def _parse_config(path: os.PathLike, branch: str = "main") -> dict:
    """Parse the `scivision` config file."""

    # check that this is a path to a yaml file
    if not path.endswith((".yml", ".yaml",)):
        raise ValueError(f"Invalid configuration filename: {path}")

    if _is_url(path):
        path = _parse_url(path)

    file = fsspec.open(path)
    with file as config_file:
        stream = config_file.read()
        config = yaml.safe_load(stream)

    # make sure we at least have an input to the function
    assert "X" in config["prediction_fn"]["args"].keys()

    return config


def load_pretrained_model(
    path: os.PathLike,
    branch: str = "main",
    allow_install: bool = False,
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
    allow_install : bool
        Allow installation of remote package via pip.

    Returns
    -------
    pretrained_model : scivision.PretrainedModel
        The instantiated pre-trained model.
    """

    # parse the config file
    config = _parse_config(path, branch=branch)

    # try to install the package if necessary
    install_package(config, allow_install=allow_install)

    return PretrainedModel(config)
