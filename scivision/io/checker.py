#!/usr/bin/env python
# -*- coding: utf-8 -*-

import importlib


def _package_exists(config: dict) -> bool:
    """Check to see whether a package exists."""
    try:
        importlib.import_module(config["import"])
    except ModuleNotFoundError:
        return False

    return True


def package_from_config(config: dict, branch: str = "main") -> str:
    """Given a config return the pip install string."""
    install_str = config["url"]
    if install_str.endswith(".git"):
        install_str = install_str[:-4]
    install_branch = config.get("github_branch", branch)
    return f"git+{install_str}@{install_branch}#egg={config['import']}"


def check_package(
    config: dict,
    branch: str = "main",
):
    """Check if the python package exists."""
    package = package_from_config(config, branch)
    exists = _package_exists(config)

    if not exists:
        raise Exception(
            "Package does not exist. Try installing it with: \n"
            f"`!pip install -e {package}`"
        )
