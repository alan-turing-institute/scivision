from scivision.io import load_dataset
import intake
import tempfile


def test_load_dataset_remote():
    """Test that an intake catalog is generated from scivision.yml file in an example GitHub repo."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton')) == intake.catalog.local.YAMLFileCatalog

def test_load_dataset_branch_and_diff_file_name():
    """Test that an intake catalog is generated when specifying a branch AND that a custom file name."""
    assert type(load_dataset('https://github.com/alan-turing-institute/intake-plankton/thESciViSionYAMLfileee.yaml', branch='diff-name-yml')) == intake.catalog.local.YAMLFileCatalog

def test_load_dataset_local():
    """Test that an intake catalog is generated from a local yml works."""
    assert type(load_dataset('tests/test_scivision.yml')) == intake.catalog.local.YAMLFileCatalog
