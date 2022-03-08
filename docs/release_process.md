Developers can build and view the docs by doing the following:

1. **Install requirements**:
  
  ```bash
  pip install -r docs/requirements.txt
  ```

2. **Build the docs**:
  * In the top dir:
  ```bash
  sphinx-build -b html docs/ build/
  ```
  * The HTML will  be created in `build/`

3. **Update the API documentation**:
  * Edit (or add) to the docstring of the function in question
  * Ensure that the module containing that function has been added to `docs/api.rst`
  * Open `build/index.html` in a browser to view edits
4. **Push the updates to the readthedocs site**:
  * Create a pull request with your changes
  * Upon merge to `main`, log into the https://readthedocs.org/projects/scivision/ dashboard as a maintainer and click `Builds->Build Version`

## Releases

Developers can release a new version of `scivision` with the following steps:

1. **Increment the `version` in `setup.py` and any other metadata that differs for the new release**:
2. **Make sure you have a working python 3 installation**
    * Check your version with:
    ```bash
    python --version
    ```
3. **Install these packages if you don't have them**:
   ```bash
   pip install build twine
   ```
4. **Build the release**:
   ```bash
   python -m build
   ```
5. **Upload the release**:
   ```bash
   python -m twine upload dist/*
   ```
    * Provide your pypi username and password
6. **Commit changes to `setup.py` pull request to `main` branch**

## Maintainers

If you are new to the `scivision` project and wish to become a maintainer for either the PyPi release or the  readthedocs documentation, send an email to scivision@turing.ac.uk