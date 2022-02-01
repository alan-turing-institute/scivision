#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from github import Github
import json
import requests


def _get_catalog(type: str = 'data'):
    """Load the Scivision catalog from GitHub.
    
    Parameters
    ----------
    type : str
        A string that instructs which catalog to load, 'dataset' by default, can be changed to 'model'

    Returns
    -------
    catalog_dict : dict
        Dictionary version of scivision catalog.
    """
    url = 'https://raw.githubusercontent.com/alan-turing-institute/scivision-catalog/main/datasources.json'
    if type == 'model':
        url = 'https://raw.githubusercontent.com/alan-turing-institute/scivision-catalog/main/models.json'
    resp = requests.get(url)
    catalog_dict = json.loads(resp.text)
    return catalog_dict
    

def _update_catalog(entry: str, catalog: str = 'default', submit: bool = True) -> None:
    """Add a new entry to a catalog.

    Parameters
    ----------
    entry : str
        A path to the json file specifying the entry to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision catalog.
    submit : bool
        When True, updates the scivision catalog on GitHub. When False, expects a path to a catalog file.
    """
    # Throw an error if the user doesn't submit to the online catalog but also doesn't provide a path to a loal file
    if not submit and catalog == 'default':
        raise RuntimeError('Scivision catalog to modify not provided')
    
    # Get a dict for the new catalog entry
    with open(entry) as file:
        entry_dict = json.load(file)
        
    # Get a dict of the full catalog
    if submit:
        catalog_dict = _get_catalog()
    else:
        with open(catalog) as file:
            catalog_dict = json.load(file)
    
    # Check that an entry of this name doesn't already exist in the catalog
    for key in entry_dict.keys():
        if key in catalog_dict:
            raise KeyError('Entry named: "' + key + '" already in catalog')
            
    # Add the new entry to the catalog dict
    catalog_dict = catalog_dict | entry_dict  # Note: Python 3.9+ only
    
    # Save the modified catalog
    if submit:
        _launch_pull_request(catalog)
    else:
        with open(catalog, 'w') as old_catalog:
            json.dump(catalog_dict, old_catalog, sort_keys=True, indent=4)


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


def add_dataset(dataset: str, catalog: str = 'default', submit: bool = True) -> None:
    """Add a new dataset entry to the dataset catalog.

    Parameters
    ----------
    dataset : str
        A path to the json file specifying the dataset to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision dataset catalog.
    """
    _update_catalog(dataset, catalog=catalog, submit=submit)


def add_model(model: str, catalog: str = 'default', submit: bool = True) -> None:
    """Add a new model entry to the model catalog.

    Parameters
    ----------
    model : str
        A path to the json file specifying the model to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision model catalog.
    """
    _update_catalog(model, catalog=catalog, submit=submit)
