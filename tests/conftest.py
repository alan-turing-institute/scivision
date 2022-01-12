from scivision.io.wrapper import PretrainedModel

import fsspec
import yaml
import pytest


file = fsspec.open('tests/test_model_scivision.yml')
with file as config_file:
    stream = config_file.read()
    imagenet_model_config = yaml.safe_load(stream)
imagenet_model = PretrainedModel(imagenet_model_config)
# install_package(IMAGENET_MODEL_CONFIG, allow_install=True)
koala = 'tests/koala.jpeg'

@pytest.fixture(scope='session', autouse=True)
def IMAGENET_MODEL_CONFIG(request):
    return imagenet_model_config
    
@pytest.fixture(scope='session', autouse=True)
def IMAGENET_MODEL(request):
    return imagenet_model
    
@pytest.fixture(scope='session', autouse=True)
def KOALA(request):
    return koala