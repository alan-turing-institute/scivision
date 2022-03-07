# Scivision data repository template



## Data repository structure

You can also store this file in a repo, by default at .scivision/data.yml, which load_dataset will recognnise.

```
exampleuser/data_repo
│   README           
│   LICENSE          
│   
└───.scivision
│   │   data.yml     
```

## Data config file

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


The scivision API can accept a path to a locally stored data config file or a the GitHub repository containing it as specified in this guide. See the [load_dataset](https://scivision.readthedocs.io/en/latest/api.html#scivision.io.reader.load_dataset) function in the API docs.