# Contributing to scivision

Thank you for taking the time to contribute to this project. 🎉

📙 Contents
---

- :ref:`who-should-contribute`
- :ref:`what-to-contribute`
- :ref:`how-to-contribute`
- :ref:`extending-the-scivision-catalog`
- :ref:`contact`
- :ref:`licence-header`

.. _who-should-contribute:

😎 Who should contribute
---

The scivision project is being developed openly and invites contributions from anyone with prior experience in computer vision or scientific disciplines represented in the project.

In particular we'd like to encourage contributions from the following people:

1. **Model developers** of computer vision models
2. **Data providers** from diverse scientific fields
3. **Programmers** interested in improving the scivision package

Members of the first two groups should pay particular attention to the [extending the scivision catalog](#gift-extending-the-scivision-catalog) section of this guide.

.. _what-to-contribute:

🤔 What to contribute
---

#### 1) Catalog contributions

We call upon the developers of computer vision **models** to make a submission to the scivision catalog. Submitting your model will allow scivision users to query the catalog for datasets on which your model can be run, or to find your model based on their own dataset submission.

Similarly, we call upon data providers from diverse scientific fields to consider submitting open **datasets** to the catalog.

Models and datasets from the catalog are matched based on the model task, data format and other labels.

To understand how to submit a catalog entry (model or dataset), see: [Extending the scivision catalog](#gift-extending-the-scivision-catalog).

#### 2) Code improvements

We encourage programmers interested in the scivision package to submit bug-fixes, new code features and documentation improvements (including fixing any typos and broken links).

To get started, please take a look at our currently open [issues](https://github.com/alan-turing-institute/scivision/issues) and participate in ongoing [discussions](https://github.com/alan-turing-institute/scivision/discussions) by commenting. Feel free to open a new issue to suggest a feature, or let us know about any bugs you encounter.

.. _how-to-contribute:

🛠 How to contribute
---

- To contribute to this repository, open a [Pull Request](https://github.com/alan-turing-institute/scivision/pulls).

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

You can add models or datasets to the scivision catalog via the GitHub workflow discussed in this guide (see [How to contribute](#-how-to-contribute)).

#### Preparing a model for inclusion in the catalog:

In order to submit a model to the scivision catalog, you must first set up the GitHub repository containing the model as per [this template](docs/model_repository_template.md).

This will enable you load your model via the scivision API and run it on matching datasets present in the catalog.

#### Submitting your model to the catalog:

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

#### Preparing a dataset for inclusion in the catalog:

In order to submit a dataset to the scivision catalog, you must first set up a GitHub repository containing important metadata as per [this template](docs/data_repository_template.md).

This will enable you load your dataset via the scivision API and run matching models from catalog on it.

#### Adding a new dataset to the catalog:

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

.. _contact:

📫 Contact
---

This project is maintained by a team of researchers at The Alan Turing Institute.
For any organisation related queries or concerns, you can directly reach out to the project team by emailing [the Scivison maintainers](mailto:scivision@turing.ac.uk).

.. _licence-header:

♻️ License
---

You can read about the license [here](https://github.com/alan-turing-institute/scivision/blob/main/LICENSE).
