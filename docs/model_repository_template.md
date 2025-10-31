.. _model-repo-template:

# 🐨 Model repo template

In order to include a computer vision (CV) model in the Scivision catalog, a GitHub repository containing configuration for one or more models must first be created.

This guide explains how to set up a GitHub repository for your CV model(s) compatible with Scivision. The basic requirements for addition to the Scivision catalog are described first. There are then details on the additional requirements to enable a model to be loaded / run through the scivision API. Followed by some features that are optional, but good to have. 

These instructions will enable you to get your model into the correct format for adding to the Scivision "catalog". Once you have set up your model as per this guide, consult the [contributor page](https://scivision.readthedocs.io/en/latest/contributing.html#contributing-a-model) for details of how to submit it. 

📚 **Contents:**

- :ref:`model-repo-structure`
- :ref:`catalog`
  - :ref:`installations`
  - :ref:`software-licence`
  - :ref:`model-thumbnail`
- :ref:`api`
  - :ref:`model-code`
  - :ref:`config`
  - :ref:`pip`
  <!-- - Model adapter code (TODO: for a later version of scivision)-->
- :ref:`additional`
  - :ref:`tests`
  - :ref:`example-data`
- :ref:`example-repos`

.. _model-repo-structure:

## 🧱 Model repo structure

The model repo should be roughly structured as in the diagram below, where `exampleuser` is the GitHub user and `comp_vis` is the name of the repo that user has created, containing the model(s).

The essential components required for the model repo to be added to the Scivision catalog are marked by an asterisk (`*`) and the requirements for the model(s) to be load-able via the Scivision API are marked with two asterisks (`**`):

```
exampleuser/comp_vis
│   README           *
│   LICENSE          *
│   setup.py         **
│   requirements.txt
│   
└───.scivision
│   │   model.yml    **
│   
└───comp_vis
│   │   model.py     **
│   │   __init__.py
│   
└───tests
│   │  test_modelA.py
│   │  test_modelB.py
│   │    ...
│   
└───example_data
    │   data_1.csv
    │   data_2.csv
    │   ...
```

.. _catalog:

## 📁 Requirements for the Scivision catalog

The essential components of a Scivision model repo include everything required for it to be added to the Scivision catalog.

.. _installations:

#### 📄 Installation documentation

A `README`, which includes detailed instructions on how the model can be installed. Without this, your model(s) will not be accepted for inclusion in the Scivision catalog.

.. _software-licence:

#### 📜 Software license

You should include a `LICENSE` file in the repository, so that Scivision users who come across it can understand the conditions of its usage. For help deciding which license to include, see www.choosealicense.com or check out the section on [software licenses](https://book.the-turing-way.org/reproducible-research/licensing.html?highlight=license) in The Turing Way online handbook.

.. _model-thumbnail:

#### 🎆 Model Thumbnail

When viewing the model in [alan-turing-institute.github.io/scivision](https://alan-turing-institute.github.io/scivision/#/model-grid) a model thumbnail is required. The thumbnail can be an interesting image explaining the model and that catches the attention of the Scivision user (creativity encouraged!).

- It must be a 256x256 JPEG file
- The file name should be the name of the model as in the catalog

.. _api:

## ✨ Requirements for the Scivision API

It's common in Python packages to house the core package code within a child directory of the same name as the repo parent directory, as in the [model repo structure](#model-repo-structure) diagram above (i.e. `comp_vis/comp_vis`).

For your model(s) to be loadable by the Scivision API, we additionally insist that you include a `model.py` in this child directory and set up a `model.yml` config file in a directory called `.scivision`.

.. _model-code:

#### 🏗️ Model code

The script called `model.py` must either contain the model itself (i.e. code that both trains and runs the model), or import a pre-trained model from elsewhere.

If you wish the model to be compatible with the Scivision API, include a class within this script, which contains a prediction function that can be used to run the model on data. You can include multiple classes for different models.

For examples, check out the [example model repos](#example-repos) section.

.. _config:

#### 🖋️ Model config file

The default name for the config file included in your repo should be `model.yml`, and should be kept in the `.scivision` directory. Take a look at this config from one of our example model repositories: [alan-turing-institute/plankton-cefas-scivision](https://github.com/alan-turing-institute/plankton-cefas-scivision):

```yaml
name: resnet50_cefas_model
url: https://github.com/alan-turing-institute/plankton-cefas-scivision
import: resnet50_cefas
model: resnet50
args:
    label_level: label3_detritus
prediction_fn:
    call: predict_batch
    args:
        X: image
    kwargs:
        batch_size: 3
```

What do the fields of this `model.yml` config refer to?

- `name`: arbitrary name for the specified model(s)
- `url`: points to the repo url
- `import`: the folder containing the model code
- `model`: the name of the model class specified in "model.py" (within the "import" folder)
- `args`: key/value pairs for any arguments of the model class
- `prediction_fn`:
  - `call`: the name of the model class' prediction function
  - `args`: key/value pairs for any arguments of the prediction function
  - `kwargs`: key/value pairs for any key word arguments of the prediction function

It's also possible to specify multiple models from the same model repository. For an example config that demonstrates this, see [scivision-test-plugin/.scivision/model.yml](https://github.com/alan-turing-institute/scivision-test-plugin/blob/main/.scivision/model.yml).

.. _pip:

#### 🐍 Installability with pip

You can include a `setup.py` to enable the model(s) to be installed via pip, which is necessary for the Scivision API to be able to load the model(s). For an explanation of how this works, see this [packaging guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/#configuring-metadata) for Python. By additionally including a `requirements.txt` with the required packages for your model, you can make it so these are installed along with the model code.

This example `setup.py` is taken from [alan-turing-institute/plankton-cefas-scivision](https://github.com/alan-turing-institute/plankton-cefas-scivision):

```python
from setuptools import find_packages, setup

requirements = []
with open("requirements.txt") as f:
    for line in f:
        stripped = line.split("#")[0].strip()
        if len(stripped) > 0:
            requirements.append(stripped)

setup(
    name="resnet50_cefas",
    version="0.0.1",
    description="scivision plugin, using CEFAS DSG Plankton ResNet50 model",
    url="https://github.com/alan-turing-institute/plankton-cefas-scivision",
    packages=find_packages(),
    install_requires=requirements,
    python_requires=">=3.7",
)
```

In Scivision, once your model(s) have been included in the Scivision catalog, pip installability gives users the option to use the `load_pretrained_model` function for easy use of your model code. See the :ref:`api-docs` docs for details.


.. _additional:

## 🗂️ Additional recommended components

Some other components of a Scivision model repository that we recommend, but which are not essential requirements for either the Scivision catalog or API, include **tests** for your model code and **example data** for it to run on.

.. _tests:

#### 🧪 Tests

Effective testing of code is vitally important to ensure the reliability of software, and in the context of scientific research code, the reproducibility of analyses and results.

We recommend that models repos submitted to the Scivision catalog are thoroughly tested. For more information of testing for research code, check out [The Turing Way](https://the-turing-way.netlify.app/reproducible-research/testing.html) online handbook.

.. _example-data:

#### 📊 Example data

We recommend including a directory with a small amount of test image data, in a format that can be used by the model(s) in the repo. This will be useful for Scivision users who wish to try running your model(s).

You could for example, include in the repo `README` some example code showing how to run your model(s) on the test data, or indeed a Jupyter notebook that does this, which can be easily run by anyone who comes across the repo.

.. _example-repos:

## 🗃️ Example model repos

Here are some example repositories that are set up to work with Scivision as per this guide.

### [Scivision test plugin](https://github.com/alan-turing-institute/scivision-test-plugin)

A simple test repository that demonstrates how to set up two models for use with Scivision.

### [CEFAS Plankton resnet50 model](https://github.com/alan-turing-institute/plankton-cefas-scivision)

A repository containing a pretrained ResNet-50 model for classification of plankton and example data.

Note: the example data is included as an intake catalog; see the [Scivision data repo template](data_repository_template.md) for more information.

### [Classification of plant patches/images using MapReader](https://github.com/alan-turing-institute/mapreader-plant-scivision)

A repository that adapts the MapReader model to classification of plant patches. Example data included.

### [ODIN](https://github.com/alan-turing-institute/odin)

Object Detection in Images with Noise (ODIN).

