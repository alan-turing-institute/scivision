from scivision.io.installer import install_package
from scivision.io.wrapper import PretrainedModel

import fsspec
import yaml
import pytest

# Set up some global vars for tests that require an example model
file = fsspec.open('tests/test_model_scivision.yml')
with file as config_file:
    stream = config_file.read()
    imagenet_model_config = yaml.safe_load(stream)


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
