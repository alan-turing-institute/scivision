.. _data-repo-template:

# 🐙 Data repo template

In order for `scivision` to be able to load a dataset and run a computer vision (CV) model on it, a GitHub repository containing configuration for one or more datasets must first be created.

This guide explains how to set up a GitHub repository for your datasets compatible with scivision.

This is also a pre-requisite for adding the dataset to the scivision "catalog", enabling other users of scivision to use it. To learn how to do this, consult the [contributor page](./contributing.html#gift-extending-the-scivision-catalog) after setting up your data repo as per this guide.

📚 **Contents:**

- :ref:`data-repo-structure`
- :ref:`data-config-file`
- :ref:`documentation`
- :ref:`data-license`
<!-- - :ref:`example-data-repos` -->

.. _data-repo-structure:

## 🧱 Data repo structure

We recommend to set up a data repo for scivision with the following structure, with the default name for the config file that the scivision API will recognise being `.scivision/data.yml`:

```
exampleuser/data_repo
│   README           
│   LICENSE          
│   
└───.scivision
│   │   data.yml     
```

.. _data-config-file:

## 🖋️ Data config file

The `scivision` python API relies upon another open source python tool called `intake` for loading datasets. We recommend creating a YAML format "intake catalog" (config file), to enable scivision users who discover your dataset to easily load it via the API.

For a comprehensive guide to setting up this data config file (intake catalog), consult the [intake documentation](https://intake.readthedocs.io/en/latest/catalog.html#yaml-format).

Here is an example of a `.scivision/data.yml` config (intake catalog) taken from the GitHub repo [alan-turing-institute/plankton-cefas-scivision](https://github.com/alan-turing-institute/plankton-cefas-scivision):

```yaml
sources:
  plankton:
      description: Sample images required to demonstrate the ResNet50 model trained in the Rapid Identification of Plankton using Machine Learning DSG undertaken by Cefas, The Alan Turing Institute and Plankton Analytics Ltd. 
      origin: 
      driver: intake_xarray.image.ImageSource
      args:
        urlpath: ["zip://*.tif::https://zenodo.org/record/6143685/files/images.zip"]
        chunks: {}
        storage_options: {'anon': True}
        coerce_shape: [1000, 1000]
        exif_tags: True
```

In order to fully understand how this `data.yml` has been configured, you should consult the [intake documentation](https://intake.readthedocs.io/en/latest/catalog.html#yaml-format). Here we describe just the key fields:

- `sources`: gives the option to include multiple datasets in a single config, in this case there is just one called "plankton"
- `driver`: the intake "driver" plugin, which specifies the format that the data is loaded to, in this case [xarray](https://github.com/intake/intake-xarray)
- `urlpath`: a path to the data itself; in this example, we point to a Zenodo repository and load all the `.tif` files from the compressed zip file stored there


The scivision API can accept a path to a locally stored data config file, or the GitHub repository containing it as specified in this guide. See the `load_dataset` function in the :ref:`api-docs` docs.

.. _documentation:

## 📄 Documentation

A `README`, which includes helpful information on the dataset and its origin should be included. Without this, your dataset may not be accepted for inclusion in the scivision catalog.

.. _data-license:

## 📜 Data license

You should include a `LICENSE` file in the repository, so that scivision users who come across it can understand the conditions of the data's usage. For help deciding which license to include, check out the section on [data licenses](https://the-turing-way.netlify.app/reproducible-research/licensing/licensing-data.html) in The Turing Way online handbook.

<!-- .. _example-data-repos:

## 🗃️ Example data repos -->
