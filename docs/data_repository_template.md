.. _data-repo-template:

# 🐙 Data template

In order to include a dataset in the Scivision catalog, it must be hosted in a publicly accessible location.

This guide explains how to ensure your datasets are compatible with Scivision. The basic requirements for addition to the Scivision catalog are described first. There are then details on the additional requirements to enable the dataset to be loaded / run through the scivision API.

These instructions will enable you to get your dataset into the correct format for adding to the Scivision "catalog". Once you have set up your dataset as per this guide, consult the [contributor page](https://scivision.readthedocs.io/en/latest/contributing.html#contributing-a-datasource) for details of how to submit it.  


📚 **Contents:**

- :ref:`data-catalog`
  - :ref:`documentation`
  - :ref:`data-license`
  - :ref:`data-thumbnail`
- :ref:`data-api`
  - :ref:`data-repo-structure`
  - :ref:`data-config-file`

<!-- - :ref:`example-data-repos` -->

.. _data-catalog:

## 📁 Requirements for the Scivision catalog

.. _documentation:

#### 📄 Documentation

Helpful information on the dataset and its origin should be included with the dataset, for example a `README` file. Without this, your dataset may not be accepted for inclusion in the Scivision catalog.

.. _data-license:

#### 📜 Data license

You should include a `LICENSE` file, so that Scivision users who come across it can understand the conditions of the data's usage. For help deciding which license to include, check out the section on [data licenses](https://the-turing-way.netlify.app/reproducible-research/licensing/licensing-data.html) in The Turing Way online handbook.

.. _data-thumbnail:

#### 🎆 Data Thumbnail

When viewing the dataset in [sci.vision](https://sci.vision/#/datasource-grid) a dataset thumbnail is required. The thumbnail can be an interesting image or slice of the dataset that catches the attention of the Scivision user (creativity encouraged!). 

- It must be a 256x256 JPEG file
- The file name should be the name of the dataset as in the catalog

.. _data-api:

## ✨ Requirements for the Scivision API

For your data(s) to be loadable by the Scivision API, it is necessary to create a GitHub repo structure in a particular structure, and include a data config file. 

.. _data-repo-structure:

#### 🧱 Data repo structure

We recommend to set up a data repo for Scivision with the following structure, with the default name for the config file that the Scivision API will recognise being `.scivision/data.yml`:

```
exampleuser/data_repo
│   README           
│   LICENSE          
│   
└───.scivision
│   │   data.yml     
```

.. _data-config-file:

#### 🖋️ Data config file

The `scivision` python API relies upon another open source python tool called `intake` for loading datasets. We recommend creating a YAML format "intake catalog" (config file), to enable Scivision users who discover your dataset to easily load it via the API.

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


The Scivision API can accept a path to a locally stored data config file, or the GitHub repository containing it as specified in this guide. See the `load_dataset` function in the :ref:`api-docs` docs.


<!-- .. _example-data-repos:

## 🗃️ Example data repos -->
