---
slug: 1
title: 1/Catalog
status: raw
editor: ots22
---

# Catalog

A _scivision catalog_ is a collection of metadata about (pre-trained) computer vision models and image datasests.  This document describes the JSON representation of the catalog. 

## Goals

The aim of the scivision catalog is to contain metadata about
 - _models_ (as described by `2/Models`)
 - _datasources_ (as described by `3/Datasource`)

so that:
 - models can be installed and loaded with the scivision io python library
 - datasources can be loaded similarly, in a convenient format (e.g. a numpy array, xarray Dataset or similar)
 - models and datasources are discoverable (for example, by the scientific domain from which they originated)
 - models compatible with a particular data set may be identified (not necessarily a _datasource_)
 - datasources compatible with a particular image-processing task may be identified (not necessarily a _model_)

## Format

A _scivision catalog_ consists of two JSON data objects, known as the _model catalog_ and the _datasources catalog_.

On disk, these MAY be represented by files `model.json` and `datasources.json`.

### Model catalog

#### Example

```
  {
    "name":"Short name for this model"
    "description":"Longer, optional, description of this model"
    "tasks":["segmentation"],
    "url":"https://github.com/alan-turing-institute/my-model",
    "pkg_url":"git+https://github.com/alan-turing-institute/my-model@master",
    "format":"image",
    "pretrained":true,
    "labels_required":true,
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
```

### Datasources catalog

#### Example

```
  {
    "name":"Short name for this datasource"
    "description": "Longer, optional, description of this datasource"
    "tasks":["object-detection", "segmentation"],
    "domains":["optical-microscopy"],
    "url":"https://github.com/my_datasource/releases/download/0.3.0/demo.zip",
    "format":"image",
    "labels_provided":"yes",
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
```
