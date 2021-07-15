import os
from urllib.parse import urljoin

import fsspec
import yaml

from .installer import install_package
from .wrapper import PretrainedModel

SCIVISION_YAML_CONFIG = ".scivision-config.yaml"


def _parse_config(path: os.PathLike) -> dict:
    """Parse the `scivision` config file."""
    file = fsspec.open(path)
    with file as config_file:
        stream = config_file.read()
        config = yaml.safe_load(stream)

    # make sure we at least have an input to the function
    assert "X" in config["prediction_fn"]["args"].keys()

    return config


def load_pretrained_model(
    path: os.PathLike, allow_install: bool = False, *args, **kwargs
) -> PretrainedModel:
    """Load a pre-trained model.

    Parameters
    ----------
    path : PathLike
        The filename, path or URL of a pretrained model description.
    allow_install : bool
        Allow installation of remote package via pip.

    Returns
    -------
    pretrained_model : scivision.PretrainedModel
        The instantiated pre-trained model.
    """

    # we first need to parse the yaml file if it exists
    # NOTE(arl): this assumes we're grabbing a model from github, but it should
    # also work with a local config file with a reference to a github repo
    config_url = urljoin(
        f"https://raw.githubusercontent.com/{path}/main/",
        SCIVISION_YAML_CONFIG,
    )

    config = _parse_config(config_url)

    # try to install the package if necessary
    install_package(config, allow_install=allow_install)

    return PretrainedModel(config)
