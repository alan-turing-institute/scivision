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
    

def _update_catalog(entry: str, catalog_dict: dict) -> dict:
    """Add a new entry to a catalog.

    Parameters
    ----------
    entry : str
        A path to the json file specifying the entry to be added to the catalog.
    catalog_dict : dict
        A dict containing the scivision catalog.
    
    Returns
    -------
    catalog_dict : dict
        The scivision catalog  as a dictionary, updated with the new entry.
    """
    
    # Get a dict for the new catalog entry
    with open(entry) as file:
        entry_dict = json.load(file)
    
    # Check that an entry of this name doesn't already exist in the catalog
    for key in entry_dict.keys():
        if key in catalog_dict:
            raise KeyError('Entry named: "' + key + '" already in catalog')
            
    # Add the new entry to the catalog dict
    catalog_dict = catalog_dict | entry_dict  # Note: Python 3.9+ only
    
    return catalog_dict


def _launch_pull_request(catalog_dict: dict, type: str = 'data') -> None:
    """Sends a pull request to the scivision-catalog repo, adding to the scivision catalog.
    Parameters
    ----------
    catalog_dict : dict
        A dict containing the scivision catalog.
    type : str
        A string that instructs which catalog to load, 'dataset' by default, can be changed to 'model'
    """
    if type == 'data':
        catalog_name = 'datasources'
    elif type == 'model':
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


def add_dataset(dataset: str, catalog: str = 'github') -> None:
    """Add a new dataset entry to the dataset catalog.

    Parameters
    ----------
    dataset : str
        A path to the json file specifying the dataset to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision dataset catalog.
        When 'github', updates the scivision catalog on GitHub.
    """
        
    # Get a dict of the full catalog
    if catalog == 'github':
        catalog_dict = _get_catalog()
    else:
        with open(catalog) as file:
            catalog_dict = json.load(file)
    
    # Update catalog in memory
    updated_catalog_dict = _update_catalog(dataset, catalog_dict)
    
    # Save the modified catalog
    if catalog == 'github':
        _launch_pull_request(updated_catalog_dict)
    else:
        with open(catalog, 'w') as old_catalog:
            json.dump(updated_catalog_dict, old_catalog, sort_keys=True, indent=4)


def add_model(model: str, catalog: str = 'github') -> None:
    """Add a new model entry to the model catalog.

    Parameters
    ----------
    model : str
        A path to the json file specifying the model to be added to the catalog.
    catalog : str
        A path to the json file containing the scivision model catalog.
        When 'github', updates the scivision catalog on GitHub.
    """
        
    # Get a dict of the full catalog
    if catalog == 'github':
        catalog_dict = _get_catalog()
    else:
        with open(catalog) as file:
            catalog_dict = json.load(file)

    # Update catalog in memory
    updated_catalog_dict = _update_catalog(model, catalog_dict)
    
    # Save the modified catalog
    if catalog == 'github':
        _launch_pull_request(updated_catalog_dict)
    else:
        with open(catalog, 'w') as old_catalog:
            json.dump(updated_catalog_dict, old_catalog, sort_keys=True, indent=4)
