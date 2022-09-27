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
    <a href="https://github.com/scivision-gallery">
        <img alt="Scivision Gallery" src="https://img.shields.io/badge/Scivision-Gallery-pink">
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


<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-14-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->


The `scivision` project aims to connect **computer vision model developers** to **image data providers** from diverse scientific fields.

It's core features are:

1. The scivision **catalog**, containing pretrained computer vision models and datasets from science and the humanities
2. The scivision **model and datasource API**, a simple, standard interface to models and data that works with the entries in the catalog

The Scivision documentation is hosted on [Read the Docs](https://scivision.readthedocs.io/en/latest/) (including maintainer documentation). Start with the User Guide for an introduction to using Scivision.

You can also see an interactive demonstration of Scivision right now in your browser, no installation required: [![badge](https://img.shields.io/badge/Image-Classification-579ACA.svg?logo=data:image/png;base64,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)](https://mybinder.org/v2/gh/scivision-gallery/scivision_examples/HEAD?labpath=how-to-use-scivision.ipynb)

Browse through a gallery of notebooks (runnable interactively with Binder) from research projects using Scivision at the [Scivision Gallery](https://github.com/scivision-gallery).

Scivision development happens in the [Scivision GitHub repo](https://github.com/alan-turing-institute/scivision).

## 🐨 Installation

1. **Install scivision via [PyPi](https://pypi.org/project/scivision/)**: which tends to be the most user-friendly option:

    ```bash
    pip install scivision
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

## 🤔 Contributing

See the [Contributing Guide on readthedocs](https://scivision.readthedocs.io/en/latest/contributing.html), which contains information on how to set up and contribute computer vision models and scientific image datasets to the scivision catalog, and make them available via the scivision python API, as well as modify the source code.

You may consider starting or joining in with a [discussion](https://github.com/alan-turing-institute/scivision/discussions), or opening an [issue](https://github.com/alan-turing-institute/scivision/issues) in this GitHub repo.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/AidaMehonic"><img src="https://avatars.githubusercontent.com/u/45169136?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Aida Mehonic</b></sub></a><br /><a href="#eventOrganizing-AidaMehonic" title="Event Organizing">📋</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=AidaMehonic" title="Documentation">📖</a> <a href="#ideas-AidaMehonic" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://lowe.cs.ucl.ac.uk"><img src="https://avatars.githubusercontent.com/u/8217795?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alan R Lowe</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=quantumjot" title="Code">💻</a> <a href="#ideas-quantumjot" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=quantumjot" title="Documentation">📖</a> <a href="#infra-quantumjot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#fundingFinding-quantumjot" title="Funding Finding">🔍</a></td>
    <td align="center"><a href="https://github.com/acocac"><img src="https://avatars.githubusercontent.com/u/13321552?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alejandro ©</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=acocac" title="Code">💻</a> <a href="#ideas-acocac" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-acocac" title="Design">🎨</a> <a href="#example-acocac" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/mooniean"><img src="https://avatars.githubusercontent.com/u/6002774?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Beatriz Costa Gomes</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=mooniean" title="Code">💻</a> <a href="#ideas-mooniean" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=mooniean" title="Documentation">📖</a> <a href="#design-mooniean" title="Design">🎨</a> <a href="#example-mooniean" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/lupinthief"><img src="https://avatars.githubusercontent.com/u/3716248?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ben Evans</b></sub></a><br /><a href="#ideas-lupinthief" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://edchalstrey.com/"><img src="https://avatars.githubusercontent.com/u/5486164?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ed Chalstrey</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=edwardchalstrey1" title="Code">💻</a> <a href="#ideas-edwardchalstrey1" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=edwardchalstrey1" title="Documentation">📖</a> <a href="#infra-edwardchalstrey1" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/evangeline-corcoran"><img src="https://avatars.githubusercontent.com/u/82043547?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Evangeline Corcoran</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=evangeline-corcoran" title="Code">💻</a> <a href="#ideas-evangeline-corcoran" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=evangeline-corcoran" title="Documentation">📖</a> <a href="#infra-evangeline-corcoran" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/JamesAliScott"><img src="https://avatars.githubusercontent.com/u/49982034?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JamesAliScott</b></sub></a><br /><a href="#ideas-JamesAliScott" title="Ideas, Planning, & Feedback">🤔</a> <a href="#data-JamesAliScott" title="Data">🔣</a></td>
    <td align="center"><a href="https://github.com/kasra-hosseini"><img src="https://avatars.githubusercontent.com/u/1899856?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kasra Hosseini</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=kasra-hosseini" title="Code">💻</a> <a href="#ideas-kasra-hosseini" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=kasra-hosseini" title="Documentation">📖</a> <a href="#infra-kasra-hosseini" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/MartinSJRogers"><img src="https://avatars.githubusercontent.com/u/43956226?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Martin Rogers</b></sub></a><br /><a href="#data-martinsjrogers" title="Data">🔣</a> <a href="#example-martinsjrogers" title="Examples">💡</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=martinsjrogers" title="Code">💻</a> <a href="#ideas-martinsjrogers" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://miquelmassot.github.io/"><img src="https://avatars.githubusercontent.com/u/1611148?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Miquel Massot</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=miquelmassot" title="Code">💻</a> <a href="#ideas-miquelmassot" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=miquelmassot" title="Documentation">📖</a> <a href="#plugin-miquelmassot" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="http://www.robblackwell.com"><img src="https://avatars.githubusercontent.com/u/41913?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Robert Blackwell</b></sub></a><br /><a href="#ideas-RobBlackwell" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://scotthosking.com"><img src="https://avatars.githubusercontent.com/u/10783052?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Scott Hosking</b></sub></a><br /><a href="#fundingFinding-scotthosking" title="Funding Finding">🔍</a> <a href="#ideas-scotthosking" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/ots22"><img src="https://avatars.githubusercontent.com/u/5434836?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ots22</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=ots22" title="Code">💻</a> <a href="#ideas-ots22" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=ots22" title="Documentation">📖</a> <a href="#infra-ots22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
