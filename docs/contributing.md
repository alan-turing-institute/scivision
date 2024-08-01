# 🎉 Contributing

Thank you for taking the time to contribute to the Scivision project. 🎉

📚 **Contents:**

- :ref:`who-should-contribute`
- :ref:`what-to-contribute`
- :ref:`how-to-contribute`
- :ref:`contributing-to-the-scivision-catalog`
  - :ref:`contributing-a-model`
  - :ref:`contributing-a-datasource`
  - :ref:`contributing-a-project`
- 🖊️ [License](https://github.com/alan-turing-institute/scivision/blob/main/LICENSE)

.. _who-should-contribute:

😎 Who should contribute
---

The Scivision project is fully open-source and invites contributions from anyone interested in computer vision or scientific data, with the goal of making models and datasets more accessible and discoverable across disciplines!

.. _what-to-contribute:

🤔 What to contribute
---

* **Computer vision models** for the model catalog, whether new or existing
* **Data sources** for the data catalog, from the sciences or humanities
* A **project page** describing how your model / data in the catalog are used
* New features or other code improvements to the Scivision package itself
* Bug reports

#### Models and datasets

Adding a model or dataset to the catalog makes it discoverable by other Scivision users.

See :ref:`contributing-to-the-scivision-catalog`.

#### Project pages

Adding a project page allows you to describe in more detail how your models / data in the Scivision catalog have been used. This can contain details of the project and links to example notebooks or papers that use them. 

See :ref:`contributing-to-the-scivision-catalog`.

#### Bug reports

First, please check the [open issues](https://github.com/alan-turing-institute/scivision/issues) in case the bug has already been reported.

If not, then [open a new issue here](https://github.com/alan-turing-institute/scivision/issues/new/choose).

#### Code and documentation contributions

Additional features, code quality improvements, issues, typos, documentation improvements are all welcome.

To get started:
 * Consider starting a [discussion](https://github.com/alan-turing-institute/scivision/discussions), to get feedback on your idea, or participating in an ongoing one
 * Look for any relevant [issues](https://github.com/alan-turing-institute/scivision/issues).

Pull requests are welcome: see :ref:`how-to-contribute` which describes our workflow.

For larger features, substantial changes, or anything where you would like early feedback from the community, consider starting a Scivision Improvement Proposal :ref:`what-is-a-scip` .  Feel free to ask for advice about this in an issue/discussion.

.. _how-to-contribute:

🛠 How to contribute changes to this repository
---

- Open a [Pull Request](https://github.com/alan-turing-institute/scivision/pulls).

- Our basic workflow is [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow).  In particular:
  - The branch `main` always contain the latest working version of the package.
  - Pull Requests should normally have `main` as their base branch (this is the default).
  - A Pull Request doesn't have to represent finished work. Pull Requests are welcome at an early stage of work on a contribution, so others can watch or give feedback, or as a place to discuss the work in progress---you can always add more commits to the same branch later, and they will be included too. If it is not ready to merge, include "WIP" (Work in Progress) in the subject line, or select "Create Draft Pull Request" when opening it.
  - For a Pull Request to be ready to merge:
    - All of the automated tests should pass
    - It should add tests of any new functionality
  - A code review can be requested at any time
  - Pull requests are [squash merged](https://github.blog/2016-04-01-squash-your-commits/) to `main`

- More information:
  - Read details on [how to open a Pull Request](https://opensource.guide/how-to-contribute/#opening-a-pull-request)

.. _contributing-to-the-scivision-catalog:

🎁 Contributing to the Scivision catalog
---

There are three ways in which you can contribute to the Scivision catalog: models, data, projects. 

.. _contributing-a-model:

## Contributing a model

#### Preparing a model for inclusion in the catalog

In order to submit a model to the Scivision catalog, it must be publically available from a source repository or on a package server, so that it can installed using pip. The model must include everything needed to run it, including any weights and parameters.

Additionally, if you would like to be able to load your model using the Scivision API and run it on matching datasets present in the catalog, you must first set up the GitHub repository containing the model as per the :ref:`model-repo-template`.

#### Submitting your model to the catalog

Once you are ready to submit your model for inclusion in the catalog, fill in [this form](https://sci.vision/new-model) on the Scivision website. This will create a .json file in the correct format. Open a [new issue on GitHub](https://github.com/alan-turing-institute/scivision/issues/new?assignees=&labels=catalog%2Cmodel&projects=&template=new-model.md&title=%5BMODEL%5D), attaching the .json file and an appropriate thumbnail. You will need a GitHub account. 

Once your model submission is accepted, it will become available to other users of Scivision. It will appear on the [website](https://sci.vision/model-grid), and it will be installable through the GitHub repository. However, it won't be available through PyPI until after the next release.

##### Manual steps for adding the model 

This section describes how to add a catalog entry by hand, once you have prepared your model. These steps are an alternative to just opening an issue, as described above. 

Fork the [Scivision repository](https://github.com/alan-turing-institute/scivision). Fill in [the form](https://sci.vision/new-model) on the scivision website to get the metadata for your computer vision model in to the correct format.  On your new branch, add this information to the end of `models.json` found in (`scivision/src/scivision/catalog/data/`), under `"entries"`.

Additionally, upload a suitable thumbnail to the [thumbnail models folder](https://github.com/alan-turing-institute/scivision/tree/main/src/scivision/catalog/data/thumbnails/models) (details can be found [here](https://scivision.readthedocs.io/en/latest/model_repository_template.html#model-thumbnail)).

After you are done, create a pull request with the changes. A Scivision maintainer will approve the addition, making it available to all Scivision users. It will appear on the [website](https://sci.vision/model-grid), and it will be installable through the GitHub repository. However, it won't be available through PyPI until after the next release.

.. _contributing-a-datasource:

## Contributing a datasource

#### Preparing a dataset for inclusion in the catalog

In order to submit a dataset to the Scivision catalog, your data must be in a publicly accessible location (for example, on [Zenodo](https://zenodo.org/)).

Additionally if you would like to be able to load your dataset via the Scivision API and run matching models from catalog on it, you must first set up a GitHub repository containing important metadata as per the :ref:`data-repo-template`.


#### Adding a new dataset to the catalog

Once you have prepared a datasource for inclusion in the catalog, submit some details about it [here](https://sci.vision/new-datasource). This will create a .json file in the correct format. Open a [new issue on GitHub](https://github.com/alan-turing-institute/scivision/issues/new?assignees=&labels=catalog%2Cdata&projects=&template=new-datasource.md&title=%5BDATA%5D), attaching the .json file and an appropriate thumbnail. You will need a GitHub account. 

Once your submission is accepted, the dataset will become available to other users of Scivision. It will appear on the [website](https://sci.vision/datasource-grid), and it will be installable through the GitHub repository. However, it won't be available through PyPI until after the next release.


##### Manual steps for adding the dataset 

This section describes how to add a catalog entry by hand, once you have prepared your dataset.  These steps are an alternative to just opening an issue, as described above. 

Fork the [Scivision repository](https://github.com/alan-turing-institute/scivision). Fill in [the form](https://sci.vision/new-datasource) on the scivision website to get the metadata for your computer vision dataset in to the correct format.  On your new branch, add this information to the end of `datasources.json` (found in `scivision/src/scivision/catalog/data/`), under `"entries"`.
 
Additionally, upload a suitable thumbnail to the [thumbnail datasources folder](https://github.com/alan-turing-institute/scivision/tree/main/src/scivision/catalog/data/thumbnails/datasources) (details can be found [here](https://scivision.readthedocs.io/en/latest/data_repository_template.html#data-thumbnail)).

After you are done, create a pull request to the original repo with the changes. A Scivision maintainer will approve the addition, making it available to all Scivision users. It will appear on the [website](https://sci.vision/datasource-grid), and it will be installable through the GitHub repository. However, it won't be available through PyPI until after the next release.

.. _contributing-a-project:

## Contributing a project

Once you have submitted your model / datasource for inclusion in the catalog, you might want to also consider submitting a project to provide some more details about how they have been used in your research. 

#### Adding a new project to the catalog
To submit a project, enter the relevant details about it [here](https://sci.vision/new-project). This will create a .json file in the correct format. Open a [new issue on GitHub](https://github.com/alan-turing-institute/scivision/issues/new?assignees=&labels=catalog%2Cdata&projects=&template=new-datasource.md&title=%5BPROJECT%5D), attaching the .json file and an appropriate thumbnail (a 256x256 .png or .jpg file with the same name as the datasource). You will need a GitHub account. 

Once your submission is accepted, the project will become visible to other users of Scivision, and it will appear on the [website](https://sci.vision/project-grid).


##### Manual steps for adding the project 

This section describes how to add a catalog entry by hand.  These steps are an alternative to just opening an issue, as described above. 

Fork the [Scivision repository](https://github.com/alan-turing-institute/scivision). Fill in [the form](https://sci.vision/new-project) on the scivision website to get the details for your project in to the correct format.  On your new branch, add this information to the end of `projects.json` (found in `scivision/src/scivision/catalog/projects/`), under `"entries"`.

Additionally, upload a suitable thumbnail to the [thumbnail datasources folder](https://github.com/alan-turing-institute/scivision/tree/main/src/scivision/catalog/data/thumbnails/datasources). This must be a 256x256 .png or .jpg file with the same name as the datasource.

After you are done, create a pull request to the original repo with the changes. A Scivision maintainer will approve the addition, and it will appear on the [website](https://sci.vision/project-grid).
