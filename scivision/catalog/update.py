#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from github import Github
import json
import requests
import base64


def _get_catalog(url: str):
    """Load the Scivision catalog from GitHub.

    Parameters
    ----------
    url : str
        A github raw url pointing to the scivision catalog file.

    Returns
    -------
    catalog_dict : dict
        Dictionary version of scivision catalog.
    """
    resp = requests.get(url)
    catalog_dict = json.loads(resp.text)
    return catalog_dict


def _update_catalog(entry: str, catalog_dict: dict, catalog: str = 'github', type: str = 'data') -> dict:
    """Add a new entry to a catalog.

    Parameters
    ----------
    entry : str
        A path to the json file specifying the entry to be added to the catalog.
    catalog_dict : dict
        A dict containing the scivision catalog.
    catalog : str
        A path to the json file containing the scivision model catalog.
        When 'github', updates the scivision catalog on GitHub.
    type : str
        A string that instructs which catalog to update, 'dataset' by default, can be changed to 'model'
    """

    # Get a dict for the new catalog entry
    with open(entry) as file:
        entry_dict = json.load(file)

    # Check that an entry of this name doesn't already exist in the catalog
    for key in entry_dict.keys():
        if key in catalog_dict:
            raise KeyError('Entry named: "' + key + '" already in catalog')

    # Add the new entry to the catalog dict
    updated_catalog_dict = catalog_dict | entry_dict  # Note: Python 3.9+ only

    # Save the modified catalog to github or to file
    if catalog == 'github':
        catalog_json_string = json.dumps(updated_catalog_dict, sort_keys=True, indent=4)
        _launch_pull_request(catalog_json_string, type=type)
    else:
        with open(catalog, 'w') as old_catalog:
            json.dump(updated_catalog_dict, old_catalog, sort_keys=True, indent=4)


def _launch_pull_request(catalog_json: str, type: str = 'data') -> None:
    """Sends a pull request to the scivision-catalog repo, adding to the scivision catalog.
    Parameters
    ----------
    catalog_json : str
        A string containing an updated scivision catalog in json format.
    type : str
        A string that instructs which catalog to update, 'dataset' by default, can be changed to 'model'
    """
    catalog_repo = 'alan-turing-institute/scivision-catalog'
    if type == 'data':
        catalog_name = 'datasources'
    elif type == 'model':
        catalog_name = 'models'
    catalog_file = catalog_name + ".json"

    # Configure PyGitHub
    print('Paste your GitHub access token:')
    token = input()
    g = Github(token)
    repo = g.get_repo(catalog_repo)
    
    # Create a fork of the scivision-catalog repo
    github_user = g.get_user()
    myfork = github_user.create_fork(repo)

    # Create new branch in your fork
    print('In four words or fewer, describe your addition to the scivision catalog:')
    desc = input()
    target_branch = desc.replace(' ', '-')
    main_branch = myfork.get_branch('main')
    myfork.create_git_ref(ref='refs/heads/' + target_branch, sha=main_branch.commit.sha)

    # Create a commit which adds the new version of the updated catalog
    contents = myfork.get_contents(catalog_file, ref=target_branch)
    myfork.update_file(contents.path, desc, catalog_json, contents.sha, branch=target_branch)
    
    # Get base64 message based on GitHub token needed for PR
    message = g.get_user().login + ':' + token
    message_bytes = message.encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    base64_message = base64_bytes.decode('ascii')

    # Create a PR
    body = 'Add an entry to the scivision ' + type + ' catalog: '
    body += desc
    headers = {'Authorization': 'Basic ' + base64_message}
    data = '{"head":"' + g.get_user().login + ':' + target_branch + '","base":"main", "title":"' + desc + '", "body":"' + body + '"}'
    requests.post('https://api.github.com/repos/' + catalog_repo + '/pulls', data=data, headers=headers)


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
        url = 'https://raw.githubusercontent.com/alan-turing-institute/scivision-catalog/main/datasources.json'
        catalog_dict = _get_catalog(url)
    else:
        with open(catalog) as file:
            catalog_dict = json.load(file)

    # Add the new dataset entry to the catalog
    _update_catalog(dataset, catalog_dict, catalog=catalog, type='data')


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
        url = 'https://raw.githubusercontent.com/alan-turing-institute/scivision-catalog/main/models.json'
        catalog_dict = _get_catalog(url)
    else:
        with open(catalog) as file:
            catalog_dict = json.load(file)

    # Add the new model entry to the catalog
    _update_catalog(model, catalog_dict, catalog=catalog, type='model')
