# Contributing to scivision

Thank you for taking the time to contribute to this project. 🎉

Before making a contribution, please take a look at our [Code of Conduct](./CODE_OF_CONDUCT.md).

:book: Contents
---

- :sunglasses: [Who should contribute](#who-should-contribute)
- 🤔 [What to contribute](#what-to-contibute)
- 🛠 [How to contribute](#how-to-contribute)
- :gift: [Extending the scivision catalog](#extending-the-scivision-catalog)
- 📫 [Contact](#contact)
- ♻️ [License](#license)

:sunglasses: Who should contribute
---

The scivision project is being developed openly and invites contributions from anyone with prior experience in computer vision or scientific disciplines represented in the project.

In particular we'd like to encourage contributions from the following people:

1. **Model developers** of computer vision models
2. **Data providers** from diverse scientific fields
3. **Programmers** interested in improving the scivision package

Members of the first two groups should pay particular attention to the [extending the scivision catalog](#extending-the-scivision-catalog) section of this guide.

🤔 What to contribute
---

We encourage people to submit bug-fixes, new code features and documentation improvements (including fixing any typos and broken links).

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
  
:gift: Adding to the scivision catalog
---

You can add models or datasets to the scivision catalog via the GitHub workflow discussed in this guide (see [How to contribute](#how-to-contribute)).

Create a new branch and make one or both of the following changes, then launch a pull request for your additions to be reviewed:

#### Add a new model

Add metadata for your computer vision model to the end of `models.json`, with the following format, incrementing the model number by one from the most recent entry:

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

#### Add a new dataset

Add your dataset to the end of `datasources.json`, with the following format, incrementing the data number by from the most recent entry:

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
