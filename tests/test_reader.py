from scivision.io import load_dataset, load_pretrained_model, wrapper
import intake
import pytest

# TODO: make the tests rely on specific commits from the example urls


def test_load_dataset_remote():
    """Test that an intake catalog is generated from scivision.yml file in an example GitHub repo."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton')) == intake.catalog.local.YAMLFileCatalog


def test_load_dataset_branch_and_diff_file_name():
    """Test that an intake catalog is generated when specifying a branch AND that a custom file name."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton/thESciViSionYAMLfileee.yaml', branch='diff-name-yml')) == intake.catalog.local.YAMLFileCatalog


def test_load_dataset_local():
    """Test that an intake catalog is generated from a local yml works."""
    assert type(load_dataset('tests/test_dataset_scivision.yml')) == intake.catalog.local.YAMLFileCatalog


def test_load_pretrained_model_remote():
    """Test that scivision can load a pretrained model from an example GitHub repo."""
    # TODO: add tests for the methods in wrapper.py and installer.py
    assert type(load_pretrained_model('https://github.com/quantumjot/scivision-test-plugin/.scivision-config_imagenet.yaml', allow_install=True)) == wrapper.PretrainedModel


def test_load_pretrained_model_local():
    """Test that scivision can load a pretrained model from a local yaml that points to a GitHub repo."""
    assert type(load_pretrained_model('tests/test_model_scivision.yml', allow_install=True)) == wrapper.PretrainedModel
    

def test_load_named_pretrained_model_local():
    """Test that scivision can load a specific model from the given scivision.yml."""
    assert type(load_pretrained_model('tests/test_model_scivision.yml', allow_install=True, model='ImageNetModel')) == wrapper.PretrainedModel
    assert type(load_pretrained_model('tests/test_multiple_models_scivision.yml', allow_install=True, model='ImageNetModel')) == wrapper.PretrainedModel


def test_load_wrong_model_name_raises_value_error():
    """Test that a value error is raised when a model name is specified that doesn't match the model in the config."""
    with pytest.raises(ValueError):
        load_pretrained_model('tests/test_model_scivision.yml', allow_install=True, model='FakeModel')

        
def test_load_wrong_model_name_raises_value_error_config_has_multiple_models():
    """Test that a value error is raised when a model name is specified that doesn't match one of the models in the config."""
    with pytest.raises(ValueError):
        load_pretrained_model('tests/test_multiple_models_scivision.yml', allow_install=True, model='FakeModel')


def test_load_multiple_models():
    """Test that scivision can load multiple pretrained models from the same GitHub repo."""
    model1, model2 = load_pretrained_model('tests/test_multiple_models_scivision.yml', allow_install=True, load_multiple=True)
    assert type(model1) == wrapper.PretrainedModel
    assert type(model2) == wrapper.PretrainedModel
    
    
def test_load_first_model_from_config_with_multiple():
    """Test that scivision loads a single a model from a config with multiple models when not told to load multiple."""
    assert type(load_pretrained_model('tests/test_multiple_models_scivision.yml', allow_install=True, load_multiple=False)) == wrapper.PretrainedModel