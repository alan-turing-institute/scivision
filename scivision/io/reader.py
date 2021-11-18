import os
from urllib.parse import urlparse

import fsspec
import yaml

import intake
import intake_xarray
# import xarray as xr
import tempfile
import requests
import yaml
from intake.catalog.local import YAMLFileCatalog

from ..koala import koala
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


@koala
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
    allow_install : bool, default = False
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


def load_dataset(
    #TODO allow to load a local yaml OR GitHub yaml
    path: os.PathLike,
    branch: str = "main"
) -> intake.catalog.local.YAMLFileCatalog:
    """Load a dataset from the path specified in scivision.yml."""
    # parse the config file
    # path = path + 'scivision.yml' #TODO: change _parse_config
    # check whether scivision.yml or scivision.yaml exists and throw an error if not
    config = _parse_url(path, branch=branch)
    r = requests.get(config)
    yaml_config = yaml.load(r.content, Loader=yaml.Loader)
    tempdir = tempfile.mkdtemp()
    with open(tempdir + '/scivision.yml', 'w') as file:
        yaml.dump(yaml_config, file)
    return intake.open_catalog(tempdir + '/scivision.yml')
