from scivision.catalog import add_dataset, add_model
import json


def test_add_dataset(DATA_CATALOG_PATH, DATA_CATALOG):
    """Test that a new dataset can be added to the scivision dataset catalog."""
    test_entry_path = 'tests/catalog_data_entry.json'
    add_dataset(test_entry_path, DATA_CATALOG_PATH)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    assert entry_name in DATA_CATALOG
    assert "task" in DATA_CATALOG[entry_name]
    assert "domain" in DATA_CATALOG[entry_name]
    assert "datasource" in DATA_CATALOG[entry_name]
    assert "format" in DATA_CATALOG[entry_name]
    assert "labels" in DATA_CATALOG[entry_name]
    assert "institution" in DATA_CATALOG[entry_name]
    assert "tags" in DATA_CATALOG[entry_name]
    
    
def test_add_dataset_multiple(DATA_CATALOG_PATH, DATA_CATALOG):
    """Test that multiple datasets can be added to the scivision dataset catalog when provided."""
    test_entry_path = 'tests/catalog_data_multiple_entries.json'
    add_dataset(test_entry_path, DATA_CATALOG_PATH)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entries = list(entry.keys())
    for entry_name in entries:
        assert entry_name in DATA_CATALOG
        assert "task" in DATA_CATALOG[entry_name]
        assert "domain" in DATA_CATALOG[entry_name]
        assert "datasource" in DATA_CATALOG[entry_name]
        assert "format" in DATA_CATALOG[entry_name]
        assert "labels" in DATA_CATALOG[entry_name]
        assert "institution" in DATA_CATALOG[entry_name]
        assert "tags" in DATA_CATALOG[entry_name]
        
        
# def test_add_dataset_entry_exists():
#     """Test that a new dataset is not added to the scivision dataset catalog if an entry with the same name exists."""
    # TODO: instead, have it so that the datasets are named however people like for now
    
def test_add_model(MODEL_CATALOG_PATH, MODEL_CATALOG):
    """Test that a new model can be added to the scivision model catalog."""
    test_entry_path = 'tests/catalog_model_entry.json'
    add_model(test_entry_path, MODEL_CATALOG_PATH)
    with open(test_entry_path) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    assert entry_name in MODEL_CATALOG
    assert "task" in MODEL_CATALOG[entry_name]
    assert "model" in MODEL_CATALOG[entry_name]
    assert "github_branch" in MODEL_CATALOG[entry_name]
    assert "language" in MODEL_CATALOG[entry_name]
    assert "data_format" in MODEL_CATALOG[entry_name]
    assert "pretrained" in MODEL_CATALOG[entry_name]
    assert "labels_required" in MODEL_CATALOG[entry_name]
    assert "institution" in MODEL_CATALOG[entry_name]
    assert "tags" in MODEL_CATALOG[entry_name]