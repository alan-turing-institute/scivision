.. _maintainers:

# 🤓 Maintainers

This document is intended for maintainers of the scivision project and includes the following how-tos:

1. :ref:`releasing`
2. :ref:`building`

If you are new to the `scivision` project and wish to become a maintainer for either the `PyPI` release or the  `readthedocs` documentation, send an email to scivision@turing.ac.uk

.. _releasing:

## 🐍 Python package releases

A new release of the scivision package will be uploaded to PyPI each time a tagged commit is pushed to the main branch of the [scivision GitHub repo](https://github.com/alan-turing-institute/scivision). In order to trigger this automated process, do the following:

1. On a new branch of the `scivision` repo, containing your changes to be included in the release, increment the `version` in `setup.py` and any other metadata that differs for the new release.

2. Create a pull request. After merge to the `main` branch, make a note of the most recent commit hash on `main` (this will be the squash commit from your PR).

3. Tag the commit like so, where `<tag_name>` is the new version number you added to `setup.py` and `<commit_sha>` is the latest commit on the main branch:
    
    ```bash
    git checkout main
    git pull
    git tag <tag_name> <commit_sha>
    ```

4. Push the new tag to GitHub, triggering the package to build and push to PyPI:
    
    ```bash
    git push --tags
    ```

Alternatively, developers of `scivision` with maintainer access to https://github.com/alan-turing-institute/scivision & https://pypi.org/project/scivision can manually release a new version of the package with the following steps:

1. On a new branch of the `scivision` repo, containing your changes to be included in the release, increment the `version` in `setup.py` and any other metadata that differs for the new release.

2. Make sure you have a working python 3 installation. Check your version with:
    
    ```bash
    python --version
    ```
3. Install these packages if you don't have them:

   ```bash
   pip install build twine
   ```
4. Build the release:

   ```bash
   python -m build
   ```
5. Upload the release, substituting `<version>` with the new version number:

   ```bash
   python -m twine upload dist/<version>*
   ```
    * Note: You'll need to provide your PyPI username and password
6. Commit changes to `setup.py` and pull request to the `main` branch of https://github.com/alan-turing-institute/scivision

.. _building:

## 📓 Build scivision documentation

Maintainers of this `readthedocs` site can build and view the docs by doing the following:

1. Make sure you have a working python 3 installation. Check your version with:
    
    ```bash
    python --version
    ```

2. Clone https://github.com/alan-turing-institute/scivision and install requirements:
  
  ```bash
  pip install -r docs/requirements.txt
  ```

3. Build the docs:
  * In the top dir of the repo:
  
  ```bash
  sphinx-build -b html docs/ build/
  ```
  * The HTML will  be created in `build/`

4. Update the API documentation:
  * Edit (or add) to the docstring of the function in question
  * Ensure that the module containing that function has been added to `docs/api.rst`
  * Open `build/index.html` in a browser to view edits
5. Push the updates to the readthedocs site:
  * Create a pull request with your changes
  * A build of the docs should be triggered
  * You can also log into the https://readthedocs.org/projects/scivision/ dashboard as a maintainer and click `Builds->Build Version`