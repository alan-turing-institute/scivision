from scivision.io.wrapper import PretrainedModel

import fsspec
import yaml
import pytest

# @pytest.fixture(scope='session', autouse=True)
# def GLOBALS(request):
def GLOBALS():
    globals = {}
    file = fsspec.open('tests/test_model_scivision.yml')
    with file as config_file:
        stream = config_file.read()
        globals['IMAGENET_MODEL_CONFIG'] = yaml.safe_load(stream)
    globals['IMAGENET_MODEL'] = PretrainedModel(globals['IMAGENET_MODEL_CONFIG'])
    # install_package(IMAGENET_MODEL_CONFIG, allow_install=True)
    globals['KOALA'] = 'tests/koala.jpeg'
    return globals