# Scivision data repository template



## Data repository structure

You can also store this file in a repo, by default at .scivision/data.yml, which load_dataset will recognnise.

## Data config file

The `scivision` python API relies upon another open source python tool called `intake` for loading datasets. As a result, we recommend to create a YAML format "intake catalog" (config file) to enable scivision users who discover your dataset to easily load it via the API.

You can provide an intake catalog to the load_dataset function. Here is an example.