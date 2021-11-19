import os
from urllib.parse import urlparse

import fsspec
import intake
import yaml

from ..koala import koala
from .installer import install_package
from .wrapper import PretrainedModel


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


def _parse_config(path: os.PathLike, branch: str = "main") -> str:
    """Parse the scivision.yml file from a GitHub repository.
    Will also accept differently named yaml if a full path provided or a local file.
    """

    if _is_url(path):
        path = _parse_url(path, branch)

    # check that this is a path to a yaml file
    # if not, assume it is a repo containing "scivision.yml"
    if not path.endswith((".yml", ".yaml",)):
        path = path + "scivision.yml"
    return path


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

    path = _parse_config(path, branch)
    # fsspec will throw an error if the path does not exist
    file = fsspec.open(path)
    # parse the config file:
    with file as config_file:
        stream = config_file.read()
        config = yaml.safe_load(stream)

    # make sure a model at least has an input to the function
    assert "X" in config["prediction_fn"]["args"].keys()

    # try to install the package if necessary
    install_package(config, allow_install=allow_install)

    return PretrainedModel(config)


def load_dataset(
    path: os.PathLike,
    branch: str = "main"
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
        The intake catalog object from which an xarray dataset can be created.
    """

    path = _parse_config(path, branch)
    # fsspec will throw an error if the path does not exist
    fsspec.open(path)
    return intake.open_catalog(path)
