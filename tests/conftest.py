from scivision.io import install_package
from scivision.io import PretrainedModel

import fsspec
import yaml
import pytest

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
@pytest.fixture(scope='session', autouse=True)
def DATA_CATALOG(request):
    return 'tests/test_catalog/datasources.json'


# Path to model catalog
@pytest.fixture(scope='session', autouse=True)
def MODEL_CATALOG(request):
    return 'tests/test_catalog/models.json'


# def pytest_sessionstart(session):
#     """
#     Called after the Session object has been created and
#     before performing collection and entering the run test loop.
#     """
#     # Load the unmodified data catalog
#     with open(DATA_CATALOG) as file:
#         datasources = json.load(file)
# 
# 
# def pytest_sessionfinish(session, exitstatus):
#     """
#     Called after whole test run finished, right before
#     returning the exit status to the system.
#     """