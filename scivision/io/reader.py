import os
from urllib.parse import urlparse

import fsspec
import yaml

import intake
import intake_xarray
# import xarray as xr
import tempfile
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


def _parse_config(path: os.PathLike, branch: str = "main", model_config=True) -> dict:
    """Parse the scivision.yml file from a GitHub repository.
    Will also accept differently named yaml if a full path provided or a local file.
    """

    if _is_url(path):
        path = _parse_url(path, branch)

    # check that this is a path to a yaml file
    # if not, assume it is a repo containing "scivision.yml"
    if not path.endswith((".yml", ".yaml",)):
        path = path + "scivision.yml"

    # This will throw an error if the path does not exist
    file = fsspec.open(path)
    with file as config_file:
        stream = config_file.read()
        config = yaml.safe_load(stream)

    # make sure a model at least has an input to the function
    if model_config:
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
    path: os.PathLike,
    branch: str = "main"
) -> intake.catalog.local.YAMLFileCatalog:
    """Load a pre-trained model.

    Parameters
    ----------
    path : PathLike
        The filename, path or URL of an intake catalog, which links to a dataset.
    branch : str, default = main
        Specify the name of a github branch if loading from github.

    Returns
    -------
    intake.catalog.local.YAMLFileCatalog
        The intake catalog object from which an xarray dataset can be created.
    """
    config = _parse_config(path, branch=branch, model_config=False)
    tempdir = tempfile.mkdtemp()
    with open(tempdir + '/scivision.yml', 'w') as file:
        yaml.dump(config, file)
    return intake.open_catalog(tempdir + '/scivision.yml')
