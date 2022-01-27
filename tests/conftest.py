from scivision.io import install_package
from scivision.io import PretrainedModel

import fsspec
import yaml
import pytest
import json

# Set up some global vars for tests that require an example model
file = fsspec.open('tests/test_model_scivision.yml')
with file as config_file:
    stream = config_file.read()
    imagenet_model_config = yaml.safe_load(stream)


# Assign the model config to global var
@pytest.fixture(scope='session', autouse=True)
def IMAGENET_MODEL_CONFIG(request):
    return imagenet_model_config


# Create the model
@pytest.fixture(scope='session', autouse=True)
def IMAGENET_MODEL(request):
    return PretrainedModel(imagenet_model_config)


# The dataset to run model on
@pytest.fixture(scope='session', autouse=True)
def KOALA(request):
    return 'tests/koala.jpeg'


# Install the model package so it can be used in tests
install_package(imagenet_model_config, allow_install=True)


# Path to data catalog
data_catalog_path = 'tests/test_catalog/datasources.json'


@pytest.fixture(scope='session', autouse=True)
def DATA_CATALOG_PATH(request):
    return data_catalog_path


# Path to model catalog
model_catalog_path = 'tests/test_catalog/models.json'


@pytest.fixture(scope='session', autouse=True)
def MODEL_CATALOG_PATH(request):
    return model_catalog_path


# Loaded data catalog
with open(data_catalog_path) as file:
    data_catalog = json.load(file)


@pytest.fixture(scope='session', autouse=True)
def DATA_CATALOG(request):
    return data_catalog


# Loaded model catalog
with open(model_catalog_path) as file:
    model_catalog = json.load(file)


@pytest.fixture(scope='session', autouse=True)
def MODEL_CATALOG(request):
    return model_catalog


def pytest_sessionfinish(session, exitstatus):
    """
    Called after whole test run finished, right before
    returning the exit status to the system.
    Restores catalog test files overwritten by add_dataset and add_model.
    """
    with open(data_catalog_path, 'w') as catalog:
        json.dump(data_catalog, catalog, sort_keys=True, indent=4)
    with open(model_catalog_path, 'w') as catalog:
        json.dump(model_catalog, catalog, sort_keys=True, indent=4)
