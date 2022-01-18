# Release Process

This section is for maintainers making a release: Most contributors will not need to do this.

If you wish to become a maintainer (see the list of current maintainers [on pypi](https://pypi.org/project/scivision/)) send an email to [scivision@turing.ac.uk](mailto:scivision@turing.ac.uk).

We periodically make releases of the software on [PyPI](https://pypi.org/project/scivision/).

To make a new release:

1. Make a new branch for the release (e.g. named `release/1.1.0`). Usually this will be branch off the current `main`.

1. Add a commit to this branch that increments the `version` in `setup.py` and any other metadata that differs for the new release.

1. Open a PR and request a review to start the discussion of the proposed release.
  - It could be that the only change from `main` is the one incrementing the version number.

1. Merge to `main` when ready.

1. Make a GitHub [release](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases) (which will also make a tag)

1. Add the release to PyPI:

  1. Make sure you have a working python 3 installation.
      - Check you version with:
      ```
      python --version
      ```
  1. Install these packages if you don't have them:
     ```
     pip install build twine
     ```
  1. Build the release:
     ```
     python -m build
     ```
  1. Upload the release:
     ```
     python -m twine upload dist/*
     ```
      - Provide your pypi username and password

