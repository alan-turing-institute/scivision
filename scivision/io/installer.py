#!/usr/bin/env python
# -*- coding: utf-8 -*-

import importlib
import subprocess
import sys


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


def _install(package, pip_install_args=None):
    """Install a package using pip."""

    if pip_install_args is None:
        pip_install_args = []

    subprocess.check_call(
        [sys.executable, "-m", "pip", "install", *pip_install_args, package]
    )


def install_package(
    config: dict,
    allow_install=False,  # allowed values: True, False, or the string "force"
    branch: str = "main",
):
    """Install the python package if it doesn't exist."""
    package = package_from_config(config, branch)
    exists = _package_exists(config)

    if allow_install == "force":
        # if a package wants to be reinstalled completely, including dependencies
        _install(package, pip_install_args=["--force-reinstall", "--no-cache-dir"])
    elif (allow_install and not exists):
        # if only the package and not the dependencies are to be installed
        _install(package)
    elif not exists:
        raise Exception(
            "Package does not exist. Try installing it with: \n"
            f"`!pip install -e {package}`"
        )
