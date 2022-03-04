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
  - Licence
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

### License

A `LICENSE` for the model code stored in the repository.

## Non-essential repo components

Non-essential components of the scivision model repository include:

### Installability with pip

- `setup.py` to enable the model to be installed via pip. In scivision, once your model(s) have been included in the scivision catalog, pip installability gives users the option to use the `load_pretrained_model` function for easy use of your model code. See the [API docs](https://scivision.readthedocs.io/en/latest/api.html) for details.
- `utils.py` # e.g. class names

### Tests

### Data





