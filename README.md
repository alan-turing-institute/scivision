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
    <a href="https://mybinder.org/v2/gh/alan-turing-institute/scivision/HEAD">
        <img alt="Binder" src="https://mybinder.org/badge_logo.svg">
    </a>
    <a href="https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml">
        <img alt="Continuous integration badge" src="https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml/badge.svg">
    </a>
    <a href="https://scivision.readthedocs.io/en/latest/?badge=latest">
        <img alt="Documentation Status" src="https://readthedocs.org/projects/scivision/badge/?version=latest">
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
- [How to contribute?](./contributing.md)
- [Documentation](#documentation)

## Installation

1. **Install scivision via [PyPi](https://pypi.org/project/scivision/)**: which tends to be the most user-friendly option:

    ```bash
    pip install scivision
    ```

    * Explore the [examples folder]((./examples)) which contains Jupyter Notebooks showing how different components in scivision can be run. 

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

## Documentation

Documentation is available at https://scivision.readthedocs.io/en/latest/

Developers can build and view the docs locally by doing the following:

#### Install requirements:
1. `pip install sphinx`
2. `pip install sphinx_rtd_theme`
3. `pip install recommonmark`

#### Then with scivision repo cloned
1. In the top dir: `sphinx-build -b html docs/ build/`
2. Open `build/index.html` in a browser

#### Update the API documentation
1. Edit (or add) to the docstring of the function in question
2. Ensure that the module containing that function has been added to `docs/api.rst`

### 
