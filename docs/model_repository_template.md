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
- Model config file
- How to set up the model repo

## Model repo structure

```
exampleuser/comp_vis
│   README
│   LICENSE
│   scivision-model.yml
|   setup.py
|   requirements.txt
└───comp_vis
│   │   models.py
│   │   __init__.py
│
└───tests
    │   test_modelA.py
    │   test_modelB.py
    |   ...
```





