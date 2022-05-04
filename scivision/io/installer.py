#!/usr/bin/env python
# -*- coding: UTF-8 -*-

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


def _install(package):
    """Install a package using pip."""
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


def _reinstall(package):
    """Reinstall a package using pip."""
    subprocess.check_call([sys.executable, "-m", "pip", "install",
                           "--force-reinstall", "--no-deps", package])


def install_package(config: dict, allow_install: bool = False, branch: str = "main"):
    """Install the python package if it doesn't exist."""
    package = package_from_config(config, branch)
    if _package_exists(config):  # only reinstall if allow_install is True
        if allow_install:
            _reinstall(package)
    else:
        if allow_install:
            _install(package)
        else:
            raise Exception(
                "Package does not exist. Try installing it with: \n"
                f"`!pip install -e {package}`"
            )
