# Scivision model repository template

In order for `scivision` to be able to load and run a computer vision (CV) model, a GitHub repository containing configuration for one or more models must first be created.

This guide explains how to set up a GitHub repository for your CV model(s) compatible with scivision.

This is also a pre-requisite for adding the model to the scivision "catalog", enabling other users of scivision to use it. To learn how to do this, consult the [contributor page](../contributing.md#gift-extending-the-scivision-catalog) after setting up your model as per this guide.

## 📚 Contents

- Model repo structure
- Essential repo components
  - Model code
  - Model config
  <!-- - Model adapter code (TODO: for a later version of scivision)-->
  - Installation documentation
  - Software licence
- Non-essential repo components
  - Installability with pip
  - Tests
  - Data

## Model repo structure

The model repo should be roughly structured like so, with essential components marked by an asterisk (*):

```
exampleuser/comp_vis
│   README           *
│   LICENSE          *
│   setup.py
│   requirements.txt
│   
└───.scivision
│   │   model.yml    *
│   
└───comp_vis
│   │   model.py     *
│   │   utils.py
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

## Essential repo components

The essential components of a scivision model repository include everything that is required to set up your model repository so it is suitable for inclusion in the scivision catalog.

### Model code

- the model code, or a script that imports the model from elsewhere

### Model config file

The default name for the config file included in your repo should be `model.yml`, and should be kept in the `.scivision` directory. It should look something like this:

```yaml
name: comp_vis_models
url: https://github.com/exampleuser/comp_vis.git
import: comp_vis
models:
  - model: ImageNetModel
    args:
        model_name: resnet18
    prediction_fn:
        call: predict
        args:
            X: image
        kwargs: None
  - model: DummyModel
    args: None
    prediction_fn:
        call: predict
        args:
            X: image
        kwargs:
            - sigma
```

### Installation documentation

A `README`, which includes detailed instructions on how the model can be installed. Without this, your model(s) will not be accepted for inclusion in the scivision catalog.

### Software licence

You should include a `LICENSE` file in the repository, so that scivision users who come across it can understand the conditions of its usage. For help deciding which license to include, see www.choosealicense.com

## Non-essential repo components

Non-essential components of the scivision model repository include:

### Installability with pip

You can include a `setup.py` to enable the model to be installed via pip. For an explanation of how this works,  see this [packaging guide](https://packaging.python.org/en/latest/tutorials/packaging-projects/#configuring-metadata) for Python. By additionally including a `requirements.txt` with the required packages for your model, you can make it so these are installed along with the model code. Here is an example `setup.py` taken from [alan-turing-institute/plankton-cefas-scivision](https://github.com/alan-turing-institute/plankton-cefas-scivision):

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

In scivision, once your model(s) have been included in the scivision catalog, pip installability gives users the option to use the `load_pretrained_model` function for easy use of your model code. See the [API docs](https://scivision.readthedocs.io/en/latest/api.html) for details.

### Tests

Effective testing of code is vitally important to ensure the reliability of software, and in the context of scientific research code, the reproducibility analyses and results.

We recommend that models repos submitted to the scivision catalog are thoroughly tested. For more information of testing for research code, check out [The Turing Way](https://the-turing-way.netlify.app/reproducible-research/testing.html) online handbook.

### Data





