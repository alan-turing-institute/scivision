# Scivision model repository template

In order for `scivision` to be able to load and run a computer vision (CV) model, a GitHub repository containing configuration for the model must first be created.

This guide explains how to set up a GitHub repository for your CV model(s) compatible with scivision.

To be included in the repository are the following:

-  `scivision-model.yml` configuration file
- `setup.py` to enable the model to be installed via pip
- the model code, or a script that imports the model from elsewhere

This is also a pre-requisite for adding the model to the scivision "catalog", enabling other users of scivision to use it. To learn how to do this, consult the [contributor page](../contributing.md#gift-extending-the-scivision-catalog) after setting up your model as per this guide.

## 📚 Contents

- Model repo structure
- Choosing a Licence for your model
- Model config file
- Model adapter code
     - TODO: make the like test  plugin first
- How to set up the model repo

## Model repo structure

```
exampleuser/comp_vis
│   README
│   LICENSE
│   scivision-model.yml
│   setup.py
│   requirements.txt
└───comp_vis
│   │   models.py
│   │   utils.py # e.g. class names
│   │   __init__.py
│
└───tests
│   │  test_modelA.py
│   │  test_modelB.py
│   │    ...
└───example_data
    │   test_modelA.py
    │   test_modelB.py
    │   ...
```

## Model config file

The content of `scivision-model.yml` should look something like this:

```yaml
name: test
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



