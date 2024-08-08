<h1 align="center">
<img src="https://raw.githubusercontent.com/alan-turing-institute/scivision/main/imgs/logo_name.png" width="500"/>
</h1>

[![Continuous integration status badge](https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml/badge.svg)](https://github.com/alan-turing-institute/scivision/actions/workflows/scivision.yml)
[![Documentation status badge](https://readthedocs.org/projects/scivision/badge/?version=latest)](https://scivision.readthedocs.io/en/latest/?badge=latest)
[![PyPI badge](https://img.shields.io/pypi/v/scivision)](https://pypi.org/project/scivision/)
[![All Contributors](https://img.shields.io/github/all-contributors/alan-turing-institute/scivision?color=ee8449)](#contributors)
[![Licence badge (BSD 3 Clause)](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://github.com/alan-turing-institute/scivision/blob/main/LICENSE)
[![DOI](https://zenodo.org/badge/367023884.svg)](https://zenodo.org/doi/10.5281/zenodo.10792860)

If you are new to Scivision, start with the [website](https://sci.vision/).

The Scivision project is building:

- A **community** of computer vision practitioners in the sciences and humanities
   ([join the community on Slack](https://forms.office.com/e/cW28TK4aui))
- A **catalog** of community-curated computer vision [models](https://sci.vision/#/model-grid) and [datasets](https://sci.vision/#/datasource-grid) from the sciences and humanities
- A software **ecosystem of interoperable tools** and utilities for working with computer vision models and data, including:
  - **Scivision.Py**, a Python package for conveniently downloading and using the computer vision models and datasets from Python ([Scivision on PyPI](https://pypi.org/project/scivision/))
  - **[Pixelflow](https://github.com/alan-turing-institute/pixelflow)**, a tool for extracting information about the characteristics of objects in images

  Example use cases for these tools can be found in the [**gallery of notebooks**](https://github.com/scivision-gallery) using Scivision models and datasets 

The Scivision project was founded by [the Alan Turing Institute](https://www.turing.ac.uk/).

## Repository contents

This main [project repository on GitHub](https://github.com/alan-turing-institute/scivision) hosts
  - development of the Python package (in the root directory)
  - development of the website (in `frontend`)
  - the documentation sources (in `docs`)

## Get involved
Submit a bug or feature request [here](https://github.com/alan-turing-institute/scivision/issues).

If you would like a link to a model or datasource to be listed in the catalog, such a contribution would be gratefully received. These can be submitted through the [Scivision website](https://sci.vision/#/contribute). See the [Contributing Guide](https://scivision.readthedocs.io/en/latest/contributing.html) for more details on how to format your model / data.  

Pull requests for code changes are also welcome.


## Getting Started with Scivision.Py

A quick overview of using the Scivision.Py python package.

### Install Scivision.Py

```sh
$ pip install scivision
```

- [Full installation guide](https://scivision.readthedocs.io/en/latest/user_guide.html#installation)

### Load a Scivision model

```python
from scivision import load_pretrained_model

resnet18 = load_pretrained_model(
    # The model URL
    "https://github.com/alan-turing-institute/scivision_classifier",

    # A Scivision model can contain several variants -- below we select the one to use
    model_selection='resnet18',

    # Allow the model and its dependencies to be installed if they are not already
    # (including tensorflow in this example)
    allow_install=True
)
```

We can give an image as input to the model.  Any image data compatible with numpy (an 'Array_like') is accepted.
We can obtain some image data by loading a Scivision datasource.

- [More about Scivision models](https://scivision.readthedocs.io/en/latest/model_repository_template.html)

### Load a Scivision datasource

```python
from scivision import load_pretrained_model

dataset = load_dataset('https://github.com/alan-turing-institute/scivision-test-data')

# 'dataset' provides several named arrays.  This datasource provides one named 'test_image':
# the keys can be looked up with `list(dataset)` (or by consulting the datasource documentation)
#
test_image = dataset['test_image'].read()
```

Optionally, inspect the image (with matplotlib, for example):
```python
import matplotlib.pyplot as plt

plt.imshow(test_image)
```

![Image showing test_image (a picture of a Koala)](https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Cutest_Koala.jpg/262px-Cutest_Koala.jpg)

- [More about datasources](https://scivision.readthedocs.io/en/latest/data_repository_template.html)

### Run a Scivision model

```python
resnet18.predict(test_image)
```

Output: `koala : 99.78%`

### Query the model and datasource catalogs

```python
from scivision import default_catalog

# The datasource catalog as a Pandas dataframe
default_catalog.datasources.to_dataframe()

# Similarly for the model catalog
default_catalog.models.to_dataframe()
```

Output:

|    | name     | description                                                                | tasks                                                                                                                               | url                                       | pkg_url                                             | format   | scivision_usable   | pretrained   | labels_required   | institution         | tags                                                                                                                                  |
|---:|:---------|:---------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------|:----------------------------------------------------|:---------|:-------------------|:-------------|:------------------|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------------|
|  0 | stardist | Single class object detection and segementation of star-convex polygons    | (<TaskEnum.object_detection: 'object-detection'>, <TaskEnum.segmentation: 'segmentation'>)                                          | https://github.com/stardist/stardist      | git+https://github.com/stardist/stardist.git@master | image    | False              | True         | True              | ('epfl',)           | ('2D', '3D', 'optical-microscopy', 'xray', 'microtomography', 'cell-counting', 'plant-phenotyping', 'climate-change-and-agriculture') |
|  1 | PlantCV  | Open-source image analysis software package targeted for plant phenotyping | (<TaskEnum.segmentation: 'segmentation'>, <TaskEnum.thresholding: 'thresholding'>, <TaskEnum.object_detection: 'object-detection'>) | https://github.com/danforthcenter/plantcv | git+https://github.com/danforthcenter/plantcv@main  | image    | False              | True         | True              | ('danforthcenter',) | ('2D', 'hyperspectral', 'multispectral', 'near-infrared', 'infrared', 'plant-phenotyping', 'climate-change-and-agriculture')          |
|  ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ | ⋮ |


The catalogs are browsable online:
  - [model catalog](https://sci.vision/#/model-grid)
  - [datasource catalog](https://sci.vision/#/datasource-grid)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AidaMehonic"><img src="https://avatars.githubusercontent.com/u/45169136?v=4?s=100" width="100px;" alt="Aida Mehonic"/><br /><sub><b>Aida Mehonic</b></sub></a><br /><a href="#eventOrganizing-AidaMehonic" title="Event Organizing">📋</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=AidaMehonic" title="Documentation">📖</a> <a href="#ideas-AidaMehonic" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lowe.cs.ucl.ac.uk"><img src="https://avatars.githubusercontent.com/u/8217795?v=4?s=100" width="100px;" alt="Alan R Lowe"/><br /><sub><b>Alan R Lowe</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=quantumjot" title="Code">💻</a> <a href="#ideas-quantumjot" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=quantumjot" title="Documentation">📖</a> <a href="#infra-quantumjot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#fundingFinding-quantumjot" title="Funding Finding">🔍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aldenc"><img src="https://avatars.githubusercontent.com/u/20688591?v=4?s=100" width="100px;" alt="Alden Conner"/><br /><sub><b>Alden Conner</b></sub></a><br /><a href="#ideas-aldenc" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=aldenc" title="Documentation">📖</a> <a href="#design-aldenc" title="Design">🎨</a> <a href="#eventOrganizing-aldenc" title="Event Organizing">📋</a> <a href="#promotion-aldenc" title="Promotion">📣</a> <a href="#projectManagement-aldenc" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/acocac"><img src="https://avatars.githubusercontent.com/u/13321552?v=4?s=100" width="100px;" alt="Alejandro ©"/><br /><sub><b>Alejandro ©</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=acocac" title="Code">💻</a> <a href="#ideas-acocac" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-acocac" title="Design">🎨</a> <a href="#example-acocac" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mooniean"><img src="https://avatars.githubusercontent.com/u/6002774?v=4?s=100" width="100px;" alt="Beatriz Costa Gomes"/><br /><sub><b>Beatriz Costa Gomes</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=mooniean" title="Code">💻</a> <a href="#ideas-mooniean" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=mooniean" title="Documentation">📖</a> <a href="#design-mooniean" title="Design">🎨</a> <a href="#example-mooniean" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lupinthief"><img src="https://avatars.githubusercontent.com/u/3716248?v=4?s=100" width="100px;" alt="Ben Evans"/><br /><sub><b>Ben Evans</b></sub></a><br /><a href="#ideas-lupinthief" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://edchalstrey.com/"><img src="https://avatars.githubusercontent.com/u/5486164?v=4?s=100" width="100px;" alt="Ed Chalstrey"/><br /><sub><b>Ed Chalstrey</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=edwardchalstrey1" title="Code">💻</a> <a href="#ideas-edwardchalstrey1" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=edwardchalstrey1" title="Documentation">📖</a> <a href="#infra-edwardchalstrey1" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://erioldoesdesign.github.io/"><img src="https://avatars.githubusercontent.com/u/11681324?v=4?s=100" width="100px;" alt="Eriol Fox"/><br /><sub><b>Eriol Fox</b></sub></a><br /><a href="#ideas-Erioldoesdesign" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-Erioldoesdesign" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/evangeline-corcoran"><img src="https://avatars.githubusercontent.com/u/82043547?v=4?s=100" width="100px;" alt="Evangeline Corcoran"/><br /><sub><b>Evangeline Corcoran</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=evangeline-corcoran" title="Code">💻</a> <a href="#ideas-evangeline-corcoran" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=evangeline-corcoran" title="Documentation">📖</a> <a href="#infra-evangeline-corcoran" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/IFenton"><img src="https://avatars.githubusercontent.com/u/5773962?v=4?s=100" width="100px;" alt="Isabel Fenton"/><br /><sub><b>Isabel Fenton</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=IFenton" title="Code">💻</a> <a href="#ideas-IFenton" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=IFenton" title="Documentation">📖</a> <a href="#infra-IFenton" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jmp1985"><img src="https://avatars.githubusercontent.com/u/2241889?v=4?s=100" width="100px;" alt="James Parkhurst"/><br /><sub><b>James Parkhurst</b></sub></a><br /><a href="#ideas-jmp1985" title="Ideas, Planning, & Feedback">🤔</a> <a href="#data-jmp1985" title="Data">🔣</a> <a href="#plugin-jmp1985" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JamesAliScott"><img src="https://avatars.githubusercontent.com/u/49982034?v=4?s=100" width="100px;" alt="JamesAliScott"/><br /><sub><b>JamesAliScott</b></sub></a><br /><a href="#ideas-JamesAliScott" title="Ideas, Planning, & Feedback">🤔</a> <a href="#data-JamesAliScott" title="Data">🔣</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kasra-hosseini"><img src="https://avatars.githubusercontent.com/u/1899856?v=4?s=100" width="100px;" alt="Kasra Hosseini"/><br /><sub><b>Kasra Hosseini</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=kasra-hosseini" title="Code">💻</a> <a href="#ideas-kasra-hosseini" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=kasra-hosseini" title="Documentation">📖</a> <a href="#infra-kasra-hosseini" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MartinSJRogers"><img src="https://avatars.githubusercontent.com/u/43956226?v=4?s=100" width="100px;" alt="Martin Rogers"/><br /><sub><b>Martin Rogers</b></sub></a><br /><a href="#data-martinsjrogers" title="Data">🔣</a> <a href="#example-martinsjrogers" title="Examples">💡</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=martinsjrogers" title="Code">💻</a> <a href="#ideas-martinsjrogers" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://miquelmassot.github.io/"><img src="https://avatars.githubusercontent.com/u/1611148?v=4?s=100" width="100px;" alt="Miquel Massot"/><br /><sub><b>Miquel Massot</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=miquelmassot" title="Code">💻</a> <a href="#ideas-miquelmassot" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=miquelmassot" title="Documentation">📖</a> <a href="#plugin-miquelmassot" title="Plugin/utility libraries">🔌</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.robblackwell.com"><img src="https://avatars.githubusercontent.com/u/41913?v=4?s=100" width="100px;" alt="Robert Blackwell"/><br /><sub><b>Robert Blackwell</b></sub></a><br /><a href="#ideas-RobBlackwell" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Tonks684"><img src="https://avatars.githubusercontent.com/u/60216815?v=4?s=100" width="100px;" alt="Samuel Tonks"/><br /><sub><b>Samuel Tonks</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=Tonks684" title="Code">💻</a> <a href="#ideas-Tonks684" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=Tonks684" title="Documentation">📖</a> <a href="#infra-Tonks684" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://scotthosking.com"><img src="https://avatars.githubusercontent.com/u/10783052?v=4?s=100" width="100px;" alt="Scott Hosking"/><br /><sub><b>Scott Hosking</b></sub></a><br /><a href="#fundingFinding-scotthosking" title="Funding Finding">🔍</a> <a href="#ideas-scotthosking" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://shmh40.github.io"><img src="https://avatars.githubusercontent.com/u/56727418?v=4?s=100" width="100px;" alt="Seb Hickman"/><br /><sub><b>Seb Hickman</b></sub></a><br /><a href="#example-shmh40" title="Examples">💡</a> <a href="#talk-shmh40" title="Talks">📢</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/louisavz"><img src="https://avatars.githubusercontent.com/u/63079440?v=4?s=100" width="100px;" alt="louisavz"/><br /><sub><b>louisavz</b></sub></a><br /><a href="#ideas-louisavz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#promotion-louisavz" title="Promotion">📣</a> <a href="#blog-louisavz" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nbarlowATI"><img src="https://avatars.githubusercontent.com/u/33832774?v=4?s=100" width="100px;" alt="nbarlowATI"/><br /><sub><b>nbarlowATI</b></sub></a><br /><a href="#ideas-nbarlowATI" title="Ideas, Planning, & Feedback">🤔</a> <a href="#eventOrganizing-nbarlowATI" title="Event Organizing">📋</a> <a href="#example-nbarlowATI" title="Examples">💡</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ots22"><img src="https://avatars.githubusercontent.com/u/5434836?v=4?s=100" width="100px;" alt="ots22"/><br /><sub><b>ots22</b></sub></a><br /><a href="https://github.com/alan-turing-institute/scivision/commits?author=ots22" title="Code">💻</a> <a href="#ideas-ots22" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=ots22" title="Documentation">📖</a> <a href="#infra-ots22" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pwochner"><img src="https://avatars.githubusercontent.com/u/78024695?v=4?s=100" width="100px;" alt="pwochner"/><br /><sub><b>pwochner</b></sub></a><br /><a href="#ideas-pwochner" title="Ideas, Planning, & Feedback">🤔</a> <a href="#eventOrganizing-pwochner" title="Event Organizing">📋</a> <a href="#example-pwochner" title="Examples">💡</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vimode"><img src="https://avatars.githubusercontent.com/u/39148877?v=4?s=100" width="100px;" alt="vimode"/><br /><sub><b>vimode</b></sub></a><br /><a href="#ideas-vimode" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-vimode" title="Design">🎨</a> <a href="https://github.com/alan-turing-institute/scivision/commits?author=vimode" title="Code">💻</a> <a href="#a11y-vimode" title="Accessibility">️️️️♿️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

