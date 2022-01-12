from scivision.io.wrapper import PretrainedModel

import fsspec
import yaml
import pytest


# Set up some global vars for tests    
@pytest.fixture(scope='session', autouse=True)
def IMAGENET_MODEL(request):
    file = fsspec.open('tests/test_model_scivision.yml')
    with file as config_file:
        stream = config_file.read()
        imagenet_model_config = yaml.safe_load(stream)
    return PretrainedModel(imagenet_model_config)
    
@pytest.fixture(scope='session', autouse=True)
def KOALA(request):
    return 'tests/koala.jpeg'
    
# install_package(IMAGENET_MODEL_CONFIG, allow_install=True)