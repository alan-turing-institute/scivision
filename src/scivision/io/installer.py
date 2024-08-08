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
    try:
        subprocess.check_call(
            [sys.executable, "-m", "pip", "install", *pip_install_args, package],
        )
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f'command {e.cmd} return with error code {e.returncode}: {e.output}')


def install_package(
    config: dict,
    allow_install=False,  # allowed values: True, False, or the string "force"
    branch: str = "main",
):
    """Install the python package if it doesn't exist.

    Parameters
    ----------
    config: dict
      Dictionary of installation parameters for the package

    allow_install: one of True, False, or the string "force"
      - `True` means the package is allowed to call out to the system
        pip to install the package.
      - `False` means the package is still required, but rather than
        installing it, performs a check that it *already* exists
      - `"force"` installs the package, even if it exists already.
        This option is provided in case something gets stuck in an
        interactive session, but should otherwise be avoided if a
        reproducible environment is desired, since it will override
        any versions specified in an environment elsewhere, *including*
        any dependencies.

    branch: str
      If installing from a git repository, or a GitHub URL, use
      this branch
    """
    package = package_from_config(config, branch)
    exists = _package_exists(config)

    if allow_install == "force":
        # Install the package, whether it exists or not.

        # Note that the "--force-reinstall" argument to pip seems to
        # be inherited when installing dependencies, meaning that
        # these are force-upgraded even if a version satisfying the
        # requirements is present.

        # (--no-deps doesn't solve this, since the dependencies may
        # have changed between a version present and the force-updated
        # version)
        _install(package, pip_install_args=["--force-reinstall", "--no-cache-dir"])
    elif (allow_install and not exists):
        # The package is requested but isn't already installed: this
        # is the common case. The package and its dependencies will
        # be installed
        _install(package)
    elif not exists:
        # The package was requested, but allow install was false and
        # it isn't already installed: raise a runtime error
        raise Exception(
            "Package does not exist. Try installing it with: \n"
            f"`!pip install -e {package}`"
        )
