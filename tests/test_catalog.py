from scivision.catalog import add_dataset, add_model, _get_catalog
import json
from pytest import raises


def test_get_catalog_data():
    """Test that the scivision data catalog can be retirived from GitHub and that at least one entry has required fields"""
    catalog_dict = _get_catalog()
    first_key = list(catalog_dict.keys())[0]
    assert "task" in catalog_dict[first_key]
    assert "domain" in catalog_dict[first_key]
    assert "datasource" in catalog_dict[first_key]
    assert "format" in catalog_dict[first_key]
    assert "labels" in catalog_dict[first_key]
    assert "institution" in catalog_dict[first_key]
    assert "tags" in catalog_dict[first_key]
    
    
def test_get_catalog_model():
    """Test that the scivision model catalog can be retirived from GitHub and that at least one entry has required fields"""
    catalog_dict = _get_catalog(type='model')
    first_key = list(catalog_dict.keys())[0]
    assert "task" in catalog_dict[first_key]
    assert "model" in catalog_dict[first_key]
    assert "github_branch" in catalog_dict[first_key]
    assert "language" in catalog_dict[first_key]
    assert "data_format" in catalog_dict[first_key]
    assert "pretrained" in catalog_dict[first_key]
    assert "labels_required" in catalog_dict[first_key]
    assert "institution" in catalog_dict[first_key]
    assert "tags" in catalog_dict[first_key]


def test_add_dataset(DATA_CATALOG_PATH):
    """Test that a new dataset can be added to the scivision dataset catalog."""
    test_entry_path = 'tests/test_catalog/catalog_data_entry.json'
    add_dataset(test_entry_path, DATA_CATALOG_PATH, submit=False)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    with open(DATA_CATALOG_PATH) as file:
        updated_data_catalog = json.load(file)
    assert entry_name in updated_data_catalog
    assert "task" in updated_data_catalog[entry_name]
    assert "domain" in updated_data_catalog[entry_name]
    assert "datasource" in updated_data_catalog[entry_name]
    assert "format" in updated_data_catalog[entry_name]
    assert "labels" in updated_data_catalog[entry_name]
    assert "institution" in updated_data_catalog[entry_name]
    assert "tags" in updated_data_catalog[entry_name]


def test_add_dataset_multiple(DATA_CATALOG_PATH):
    """Test that multiple datasets can be added to the scivision dataset catalog when provided."""
    test_entry_path = 'tests/test_catalog/catalog_data_multiple_entries.json'
    add_dataset(test_entry_path, DATA_CATALOG_PATH, submit=False)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entries = list(entry.keys())
    with open(DATA_CATALOG_PATH) as file:
        updated_data_catalog = json.load(file)
    for entry_name in entries:
        assert entry_name in updated_data_catalog
        assert "task" in updated_data_catalog[entry_name]
        assert "domain" in updated_data_catalog[entry_name]
        assert "datasource" in updated_data_catalog[entry_name]
        assert "format" in updated_data_catalog[entry_name]
        assert "labels" in updated_data_catalog[entry_name]
        assert "institution" in updated_data_catalog[entry_name]
        assert "tags" in updated_data_catalog[entry_name]


def test_add_dataset_existing_key_entry_thows_error(DATA_CATALOG_PATH):
    """Test that a new dataset is not added to the scivision dataset catalog if an entry with the same name exists."""
    test_entry_path = 'tests/test_catalog/catalog_data_entry_exists.json'
    with raises(KeyError):
        add_dataset(test_entry_path, DATA_CATALOG_PATH, submit=False)
        
        
def test_add_dataset_no_catalog_thows_error():
    """Test that a new dataset is not added to the scivision dataset catalog if an entry with the same name exists."""
    test_entry_path = 'tests/test_catalog/catalog_data_entry.json'
    with raises(RuntimeError):
        add_dataset(test_entry_path, submit=False)


def test_add_model(MODEL_CATALOG_PATH):
    """Test that a new model can be added to the scivision model catalog."""
    test_entry_path = 'tests/test_catalog/catalog_model_entry.json'
    add_model(test_entry_path, MODEL_CATALOG_PATH, submit=False)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    with open(MODEL_CATALOG_PATH) as file:
        updated_model_catalog = json.load(file)
    assert entry_name in updated_model_catalog
    assert "task" in updated_model_catalog[entry_name]
    assert "model" in updated_model_catalog[entry_name]
    assert "github_branch" in updated_model_catalog[entry_name]
    assert "language" in updated_model_catalog[entry_name]
    assert "data_format" in updated_model_catalog[entry_name]
    assert "pretrained" in updated_model_catalog[entry_name]
    assert "labels_required" in updated_model_catalog[entry_name]
    assert "institution" in updated_model_catalog[entry_name]
    assert "tags" in updated_model_catalog[entry_name]
