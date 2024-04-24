---
title: The Scivision.Py Python Library
---

Scivision.Py is a Python library for exploring and accessing the Scivision catalog programmatically, and for loading Scivision-compatible models and datasources.

The full documentation is [here](https://scivision.readthedocs.io/en/latest/), and the github repo can be found [here](https://github.com/alan-turing-institute/scivision).

## Quick Start

### Installation

From a terminal, run

```bash
$ pip install scivision
```

### Load a model

```python
from scivision import load_pretrained_model

resnet18 = load_pretrained_model(
    # The model URL
    "https://github.com/alan-turing-institute/scivision_classifier",

    # A Scivision model can contain several variants --
    # below we select the one to use
    model_selection='resnet18',

    # Allow the model and its dependencies to be installed
    # if they are not already (including tensorflow in this
    # example)
    allow_install=True
)
```

### Load a datasource

```python

from scivision import load_dataset

dataset = load_dataset(
    "https://github.com/alan-turing-institute/scivision-test-data"
)

# 'dataset' provides several named arrays.  This datasource
# provides one named 'test_image': The keys can be looked
# up with # \`list(dataset)\` (or by consulting the datasource
# documentation)
#
test_image = dataset['test_image'].read()

```

Optionally, inspect the image (with matplotlib, for example):

```python
import matplotlib.pyplot as plt

plt.imshow(test_image)
```

![result of matplotlib imview: a koala](/koala-imview.webp)

### Run the model

```python
resnet18.predict(test_image)
```

Output:

```python
koala : 99.80%
```

### Query the catalogs

The model and datasource catalogs are available as pandas data frames.

```python
from scivision import default_catalog

# The datasource catalog as a Pandas dataframe
default_catalog.datasources.to_dataframe()

# Similarly for the model catalog
default_catalog.models.to_dataframe()
```
