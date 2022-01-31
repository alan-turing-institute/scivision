#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from github import Github
import json


def _update_catalog(entry: str, catalog: str, submit: bool = True) -> None:
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
    if submit:
        _launch_pull_request(catalog)
        
        
def _launch_pull_request(catalog: str) -> None:
    """Sends a pull request to the scivision-catalog repo, adding to the scivision catalog.
    Parameters
    ----------
    catalog : str
        A path to the json file containing the updated catalog.
    """
    if 'datasources.json' in catalog:
        catalog_name = 'datasources'
    elif 'models.json' in catalog:
        catalog_name = 'models'
    catalog_file = catalog_name + ".json"
    
    # Configure PyGitHub
    print('Paste your GitHub access token:')
    token = input()
    g = Github(token)
    repo = g.get_repo("alan-turing-institute/scivision-catalog")
    
    # Create new branch in the scivision-catalog repo
    print('In four words or fewer, describe your addition to the scivision catalog:')
    desc = input()
    target_branch = desc.replace(' ', '-')
    main_branch = repo.get_branch('main')
    repo.create_git_ref(ref='refs/heads/' + target_branch, sha=main_branch.commit.sha)
    
    # Create a commit
    contents = repo.get_contents(catalog_file, ref=target_branch)
    with open(catalog, 'r') as file:
        catalog_string = file.read()
    repo.update_file(contents.path, desc, catalog_string, contents.sha, branch=target_branch)

    # Create a PR
    body = '# Add an entry to the scivision ' + catalog_name + ' catalog'
    body += '\n'
    body += desc
    repo.create_pull(title=desc, body=body, head=target_branch, base="main")


def add_dataset(dataset: str, catalog: str, submit: bool = True) -> None:
    """Add a new dataset entry to the dataset catalog.

    Parameters
    ----------
    dataset : str
        A path to the json file specifying the dataset to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision dataset catalog.
    """
    _update_catalog(dataset, catalog, submit=submit)


def add_model(model: str, catalog: str, submit: bool = True) -> None:
    """Add a new model entry to the model catalog.

    Parameters
    ----------
    model : str
        A path to the json file specifying the model to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision model catalog.
    """
    _update_catalog(model, catalog, submit=submit)
