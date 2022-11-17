.. _user-guide:

👩‍💻 User guide
==========

📚 **Contents:**

- :ref:`install`
- :ref:`support`
- :ref:`getting_started`
- :ref:`catalog-section`

.. _install:

⬇️ Installation
--------------

1. Install scivision via [PyPi](https://pypi.org/project/scivision/): which tends to be the most user-friendly option:

    ```bash
    pip install scivision
    ```

2. Install scivision from the source code:

    * Clone scivision source code:

    ```bash
    git clone https://github.com/alan-turing-institute/scivision.git 
    ```

    * Install scivision and its dependencies:

    ```bash
    cd /path/to/my/scivision
    pip install -v -e .
    ```

.. _support:

📋 Support table
--------------

| Python version | Scivision version |
| ---  | ---    |
| <3.7 | no compatible version |
| ^3.7 | <0.4 |
| ^3.8 | * (any) |
| ^3.9 | * (any) |
| ^3.10 | >=0.3 |
| >=3.11 | >=0.3, untested, but intending to support (bug reports welcome) |

Scivision is currently working towards supporting Python >=3.11.

.. _getting_started:

🧪 Getting started
---------------

Scivision enables users to quickly find computer vision models that can be run on matching scientific image dataset(s), or find datasets that models can be run on. This can be achieved by running several lines of Python code.

The core functionality of the Python package API is documented in the :ref:`api-docs` documentation and a Jupyter notebook demonstrating it can be found [on GitHub](https://github.com/scivision-gallery/scivision-basic-usage-examples/blob/main/how-to-use-scivision.ipynb) or can be interactively run via clicking the following link to Binder:

[![badge](https://img.shields.io/badge/Example-notebook-579ACA.svg?logo=data:image/png;base64,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)](https://mybinder.org/v2/gh/scivision-gallery/scivision-basic-usage-examples/d208ac0d452e139a90e66e3c3e96dac4ad0e26ce?urlpath=lab%2Ftree%2Fhow-to-use-scivision.ipynb)
   
In brief, the notebook demonstrates the following:

1. Loading a pretrained (ImageNet) model, which was previously added to the scivision catalog with the name "scivision-test-plugin"
    `model = load_pretrained_model('/path/to/model/repo')`
2. Using the "default" scivision catalog to find a matching dataset, which the loaded model can be run on
    `default_catalog.compatible_datasources(<model name>)`
3. Loading the dataset in a format the model can recognise
    `load_dataset('/path/to/data/repo')`
4. Running the model on the data, performing simple model inference
    `model.predict(<loaded data>)`

.. _catalog-section:

📖 Catalog of models and datasets
------------------------------

The models and datasets you find when searching the "default" scivision catalog (that which comes with the package) are loaded from external sources via metadata included in the [GitHub repository](https://github.com/alan-turing-institute/scivision/tree/main/scivision/catalog/data).

To understand how these external sources are configured for compatibility with scivision, consult the following sections of this documentation:

- :ref:`model-repo-template`
- :ref:`data-repo-template`

To understand how to contribute new models and data sources to the scivision catalog, check out:

- :ref:`extending-the-scivision-catalog`

    
