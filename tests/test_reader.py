from scivision.io import load_dataset, load_pretrained_model, wrapper
import intake

#TODO: make the tests rely on specific commits from the example urls
def test_load_dataset_remote():
    """Test that an intake catalog is generated from scivision.yml file in an example GitHub repo."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton')) == intake.catalog.local.YAMLFileCatalog


def test_load_dataset_branch_and_diff_file_name():
    """Test that an intake catalog is generated when specifying a branch AND that a custom file name."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton/thESciViSionYAMLfileee.yaml', branch='diff-name-yml')) == intake.catalog.local.YAMLFileCatalog


def test_load_dataset_local():
    """Test that an intake catalog is generated from a local yml works."""
    assert type(load_dataset('tests/test_scivision.yml')) == intake.catalog.local.YAMLFileCatalog


def test_load_pretrained_model():
    """Test that scivision can load a pretrained model from an example GitHub repo."""
    #TODO: add tests for the methods in wrapper.py and installer.py
    assert type(load_pretrained_model('https://github.com/quantumjot/scivision-test-plugin/.scivision-config_imagenet.yaml')) == wrapper.PretrainedModel