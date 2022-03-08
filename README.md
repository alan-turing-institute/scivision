<div align="center">
    <br>
    <p align="center">
    <img src="https://i.imgur.com/kc7aE7z.png" 
         alt="scivision logo" width="60%" align="center">
    </p>
    <h2>A Toolkit for Scientific Image Analysis</h2>
</div>
 
<p align="center">
    <a href="https://pypi.org/project/scivision/">
        <img alt="PyPI" src="https://img.shields.io/pypi/v/scivision">
    </a>
    <a href="https://mybinder.org/v2/gh/alan-turing-institute/scivision/0.1.2?labpath=pretrained_imagenet_scivision_example.ipynb">
        <img alt="Binder" src="https://mybinder.org/badge_logo.svg">
    </a>
    <a href="https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml">
        <img alt="Continuous integration badge" src="https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml/badge.svg">
    </a>
    <a href="https://scivision.readthedocs.io/en/latest/?badge=latest">
        <img alt="Documentation Status" src="https://readthedocs.org/projects/scivision/badge/?version=latest">
    </a>
    <a href="https://github.com/alan-turing-institute/scivision/discussions">
       <img alt="Discuss on GitHub Discussions" src="https://img.shields.io/badge/GitHub-Discussions-yellow?logo=GitHub">
    </a>
    <a href="https://github.com/alan-turing-institute/scivision/blob/main/LICENSE">
        <img alt="License" src="https://img.shields.io/badge/License-BSD_3--Clause-blue.svg">
    </a>
    <br/>
</p>

`scivision` aims to be a well-documented and generalisable Python framework for applying computer vision methods to a wide range of scientific imagery.

This tool aims to foster collaboration between **data owners** and **developers** by:
* Empowering scientific domain experts to easily access and integrate the latest CV tools
* Enabling algorithm developers to distribute their tools to users across scientific fields
* Evolving with a focus on the needs and priorities of both developers and users
* Creating and maintaining a community of interdisciplinary contributors
* Providing a bridge between different data scales and formats

Table of contents
-----------------

- [Installation and setup](#installation)
- [How to contribute?](#contributing)
- [Documentation](#documentation)
- [Releases](#releases)
- [Maintainers](#maintainers)

## Installation

1. **Install scivision via [PyPi](https://pypi.org/project/scivision/)**: which tends to be the most user-friendly option:

    ```bash
    pip install scivision
    ```

    * Explore the [examples folder](./examples) which contains Jupyter Notebooks showing how different components in scivision can be run. 

    You can install `Jupyter` by:

    ```bash
    pip install jupyter
    ```

2. **Install scivision from the source code**:

    * Clone scivision source code:

    ```bash
    git clone https://github.com/alan-turing-institute/scivision.git 
    ```

    * Install scivision and its dependencies:

    ```bash
    cd /path/to/my/scivision
    pip install -v -e .
    ```

## Contributing

See the [Contributing Guide](./contributing.md), which contains information on how to set up and contribute computer vision models and scientific image datasets to the scivision catalog, and make them available via the scivision python API, as well as modify the source code.

You may also consider starting or joining in with a [discussion](https://github.com/alan-turing-institute/scivision/discussions), or opening an [issue](https://github.com/alan-turing-institute/scivision/issues).

## Documentation

Documentation is available at https://scivision.readthedocs.io/en/latest/

Developers can build and view the docs by doing the following:

1. **Install requirements**:
  
  ```bash
  pip install -r docs/requirements.txt
  ```

2. **Build the docs**:
  * In the top dir:
  ```bash
  sphinx-build -b html docs/ build/
  ```
  * The HTML will  be created in `build/`

3. **Update the API documentation**:
  * Edit (or add) to the docstring of the function in question
  * Ensure that the module containing that function has been added to `docs/api.rst`
  * Open `build/index.html` in a browser to view edits
4. **Push the updates to the readthedocs site**:
  * Create a pull request with your changes
  * Upon merge to `main`, log into the https://readthedocs.org/projects/scivision/ dashboard as a maintainer and click `Builds->Build Version`

## Releases

Developers can release a new version of `scivision` with the following steps:

1. **Increment the `version` in `setup.py` and any other metadata that differs for the new release**:
2. **Make sure you have a working python 3 installation**
    * Check your version with:
    ```bash
    python --version
    ```
3. **Install these packages if you don't have them**:
   ```bash
   pip install build twine
   ```
4. **Build the release**:
   ```bash
   python -m build
   ```
5. **Upload the release**:
   ```bash
   python -m twine upload dist/*
   ```
    * Provide your pypi username and password
6. **Commit changes to `setup.py` pull request to `main` branch**

## Maintainers

If you are new to the `scivision` project and wish to become a maintainer for either the PyPi release or the  readthedocs documentation, send an email to scivision@turing.ac.uk
