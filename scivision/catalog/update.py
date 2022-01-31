#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import json


def _update_catalog(entry: str, catalog: str) -> None:
    """Add a new entry to a catalog.

    Parameters
    ----------
    entry : str
        A path to the json file specifying the entry to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision catalog.
    """
    with open(entry) as file:
        entry_dict = json.load(file)
    with open(catalog) as file:
        catalog_dict = json.load(file)
    for key in entry_dict.keys():
        if key in catalog_dict:
            raise KeyError('Entry named: "' + key + '" already in catalog')
    catalog_dict = catalog_dict | entry_dict  # Note: Python 3.9+ only
    with open(catalog, 'w') as old_catalog:
        json.dump(catalog_dict, old_catalog, sort_keys=True, indent=4)


def add_dataset(dataset: str, catalog: str) -> None:
    """Add a new dataset entry to the dataset catalog.

    Parameters
    ----------
    dataset : str
        A path to the json file specifying the dataset to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision dataset catalog.
    """
    _update_catalog(dataset, catalog)


def add_model(model: str, catalog: str) -> None:
    """Add a new model entry to the model catalog.

    Parameters
    ----------
    model : str
        A path to the json file specifying the model to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision model catalog.
    """
    _update_catalog(model, catalog)