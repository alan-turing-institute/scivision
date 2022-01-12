from scivision.io.wrapper import PretrainedModel

import fsspec
import yaml
import pytest


file = fsspec.open('tests/test_model_scivision.yml')
with file as config_file:
    stream = config_file.read()
    IMAGENET_MODEL_CONFIG = yaml.safe_load(stream)
IMAGENET_MODEL = PretrainedModel(IMAGENET_MODEL_CONFIG)
# install_package(IMAGENET_MODEL_CONFIG, allow_install=True)
KOALA = 'tests/koala.jpeg'

@pytest.fixture(scope='session', autouse=True)
def imagenet_model_config(request):
    return IMAGENET_MODEL_CONFIG
    
@pytest.fixture(scope='session', autouse=True)
def imagenet_model(request):
    return IMAGENET_MODEL
    
@pytest.fixture(scope='session', autouse=True)
def koala(request):
    return KOALA