# Contributing to scivision

Thank you for taking the time to contribute to this project. 🎉

:book: Contents
---

- :sunglasses: [Who should contribute](#sunglasses-who-should-contribute)
- 🤔 [What to contribute](#-what-to-contribute)
- 🛠 [How to contribute](#-how-to-contribute)
- :gift: [Extending the scivision catalog](#gift-extending-the-scivision-catalog)
- 📫 [Contact](#-contact)
- ♻️ [License](#%EF%B8%8F-license)

:sunglasses: Who should contribute
---

The scivision project is being developed openly and invites contributions from anyone with prior experience in computer vision or scientific disciplines represented in the project.

In particular we'd like to encourage contributions from the following people:

1. **Model developers** of computer vision models
2. **Data providers** from diverse scientific fields
3. **Programmers** interested in improving the scivision package

Members of the first two groups should pay particular attention to the [extending the scivision catalog](#gift-extending-the-scivision-catalog) section of this guide.

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
  
:gift: Extending the scivision catalog
---

You can add models or datasets to the scivision catalog via the GitHub workflow discussed in this guide (see [How to contribute](#-how-to-contribute)).

#### TODO: Preparing a scivision model repository:
For a guide on how the model GitHub repository linked to by the `"model"` key of your catalog entry should look, see [this guide]...

#### Adding a new model to the catalog:

On a new branch of the scivision repository, add metadata for your computer vision model to the end of `models.json`, with the following format, incrementing the model number by one from the most recent entry. After you are done, create a pull request with the changes.

```
  "model-XXX":{
    "task":"segmentation",
    "model":"https://github.com/alan-turing-institute/my-model",
    "github_branch":"master",
    "language":"Python3",
    "data_format":"tif",
    "pretrained":"yes",
    "labels_required":"yes",
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
```

#### TODO: Preparing a scivision data repository:
For a guide on how the data repository linked to by the `"datasource"` key of your catalog entry should look, see [this guide]...

#### Adding a new dataset to the catalog:

On a new branch of the scivision repository, add your dataset to the end of `datasources.json`, with the following format, incrementing the data number by from the most recent entry. After you are done, create a pull request with the changes.

```
  "data-XXX":{
    "task":["object-detection", "segmentation"],
    "domain":["optical-microscopy"],
    "datasource":"https://github.com/my_datasource/releases/download/0.3.0/demo.zip",
    "format":"tif",
    "labels":"yes",
    "institution":"alan-turing-institute",
    "tags":[
      "help-needed", "3D", "cell", "cell-counting", "biology", "biomedical-science" 
    ]
  }
 ```

📫 Contact
---

This project is maintained by a team of researchers at The Alan Turing Institute.
For any organisation related queries or concerns, you can directly reach out to the project team by emailing [the Scivison maintainers](mailto:scivision@turing.ac.uk).

♻️ License
---

You can read about the license [here](https://github.com/alan-turing-institute/scivision/blob/main/LICENSE).
