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
    return 'tests/img/koala.jpeg'


# Install the model package so it can be used in tests
install_package(imagenet_model_config, allow_install=True)
