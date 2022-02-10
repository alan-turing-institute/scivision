# How to contribute?

Thank you for taking the time to contribute to this project. 🎉

This project is being developed openly and invites contributions from anyone with prior experience in computer vision or scientific disciplines represented in the project.
You can suggest features to include in scivision, report mistakes/bugs, create Pull Requests to fix an error, offer resources or help develop or review new pieces of code.

We have a [Code of Conduct](./CODE_OF_CONDUCT.md) that applies to all the activities related to this project.

Whatever is your availability, there is a way to contribute to this GitHub repository.

👋 I'm busy, I only have 5 minutes
---

Look through our currently open [issues](https://github.com/alan-turing-institute/scivision/issues) to troubleshoot an issue or participate in an ongoing discussion by commenting.
You can also share this repository with someone who might be interested to get involved.

⏳ I've got 15 minutes - tell me what I should do
---

You can read the [README](https://github.com/alan-turing-institute/scivision/blob/main/README.md) file to find details and next milestones in the project.
You can also read different [issues](https://github.com/alan-turing-institute/scivision/issues) in this repository and comment where you would like to be involved.

🎉 It's my life's mission to help scientists make the most of AI capabilities such as computer vision  
---

Please share your feedback on the scope of scivision, the proposed features, the datasets and the use cases. 
You are encouraged to review the code as we collaboratively develop it and get involved where you can.
Please open a GitHub issue to suggest a new feature, contribute code, or let us know about errors/bugs.

🛠 I am ready to contribute 
---

- For open tasks in this repository, please see the open [Issues](https://github.com/alan-turing-institute/scivision/issues).

- To contribute to this repository (including bugfixes and new code features, as well as documentation, fixes to typos, broken links), open a [Pull Request](https://github.com/alan-turing-institute/scivision/pulls).

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
  
:gift: Contributing to the scivision catalog
---

You can add models or datasets to the scivision catalog via the GitHub workflow discussed in this guide (see [I am ready to contribute](#i-am-ready-to-contribute)).

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
