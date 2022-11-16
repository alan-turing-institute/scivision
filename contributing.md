# 🎉 Contributing

Thank you for taking the time to contribute to the Scivision project. 🎉

📚 **Contents:**

- :ref:`who-should-contribute`
- :ref:`what-to-contribute`
- :ref:`how-to-contribute`
- :ref:`extending-the-scivision-catalog`
- 🖊️ [License](https://github.com/alan-turing-institute/scivision/blob/main/LICENSE)

.. _who-should-contribute:

😎 Who should contribute
---

The scivision project is being developed openly and invites contributions from anyone interested in computer vision or scientific data, who agrees with the goal of making models and datasets more accessible and discoverable across disciplines!

The following contributions are particularly welcome:

* **Computer vision models** for the model catalog, whether new or existing
* **Data sources** for the data catalog, from the sciences or humanities
* New features or other code improvements to the scivision package itself
* Bug reports

.. _what-to-contribute:

🤔 What to contribute
---

#### Catalog contributions

Submit a model or dataset to the catalog so that they are discoverable by other scivision users when querying the catalog.

See :ref:`extending-the-scivision-catalog`.

#### Bug reports

First, please check the [open issues](https://github.com/alan-turing-institute/scivision/issues) in case the bug has already been reported.

If not, then [open a new issue here](https://github.com/alan-turing-institute/scivision/issues/new/choose).

#### Code and documentation contributions

Additional features, code quality improvements, issues, typos, documentation improvements are all welcome.

To get started:
 * Consider starting a [discussion](https://github.com/alan-turing-institute/scivision/discussions), to get feedback on your idea, or participating in an ongoing one
 * Look for any relevant [issues](https://github.com/alan-turing-institute/scivision/issues).

Pull requests are welcome: see :ref:`how-to-contribute` which describes our workflow.

For larger features, substantial changes, or anything where you would like early feedback from the community, consider starting a Scivision Improvement Proposal.  :ref:`about-scips`.  Feel free to ask for advice about this in an issue/discussion.

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

.. _extending-the-scivision-catalog:

🎁 Extending the scivision catalog
---

You can add models or datasets to the scivision catalog via the GitHub workflow described above.

#### Preparing a model for inclusion in the catalog

In order to submit a model to the scivision catalog, you must first set up the GitHub repository containing the model as per the :ref:`model-repo-template`.

This will enable you load your model via the scivision API and run it on matching datasets present in the catalog.

#### Submitting your model to the catalog

Once you have prepared a model for inclusion in the catalog, you can submit it via the following steps. Once your model submission is accepted, it will become available to other users of scivision.

Fork the [scivision repository](https://github.com/alan-turing-institute/scivision) and on your new branch, add metadata for your computer vision model to the end of `models.json` found in (`scivision/scivision/catalog/data/`), with the following format, under `"entries"`.

```
  {
    "name":"Short name for this model"
    "description":"Longer, optional, description of this model"
    "tasks":["segmentation"],
    "url":"https://github.com/alan-turing-institute/my-model",
    "pkg_url":"git+https://github.com/alan-turing-institute/my-model@master",
    "format":"image",
    "pretrained":true,
    "labels_required":true,
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
```

After you are done, create a pull request with the changes. A scivision maintainer will approve the addition, making it available to all scivision users.

#### Preparing a dataset for inclusion in the catalog

In order to submit a dataset to the scivision catalog, you must first set up a GitHub repository containing important metadata as per the :ref:`data-repo-template`.

This will enable you load your dataset via the scivision API and run matching models from catalog on it.

#### Adding a new dataset to the catalog

Once you have prepared a dataset for inclusion in the catalog, you can submit it via the following steps. Once your submission is accepted, the dataset will become available to other users of scivision.

On a new branch of the scivision repository, add your dataset to the end of `datasources.json`, with the following format, incrementing the data number by from the most recent entry. After you are done, create a pull request with the changes.

Fork the [scivision repository](https://github.com/alan-turing-institute/scivision) and on your new branch, add your dataset to the end of `datasources.json` (found in `scivision/scivision/catalog/data/`), with the following format, under `"entries"`.

```
  {
    "name":"Short name for this datasource"
    "description": "Longer, optional, description of this datasource"
    "tasks":["object-detection", "segmentation"],
    "domains":["optical-microscopy"],
    "url":"https://github.com/my_datasource/releases/download/0.3.0/demo.zip",
    "format":"image",
    "labels_provided":"yes",
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
 ```
 
 After you are done, create a pull request to the original repo with the changes. A scivision maintainer will approve the addition, making it available to all scivision users.
