from scivision.catalog import add_dataset, add_model
import json


def test_add_dataset(DATA_CATALOG):
    """Test that a new dataset can be added to the scivision dataset catalog."""
    test_entry = 'tests/catalog_data_entry.json'
    add_dataset(test_entry, DATA_CATALOG)
    with open(test_entry) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    with open(DATA_CATALOG) as file:
        datasources = json.load(file)
    assert entry_name in datasources
    assert "task" in datasources[entry_name]
    assert "domain" in datasources[entry_name]
    assert "datasource" in datasources[entry_name]
    assert "format" in datasources[entry_name]
    assert "labels" in datasources[entry_name]
    assert "institution" in datasources[entry_name]
    assert "tags" in datasources[entry_name]
    
    
def test_add_dataset_multiple(DATA_CATALOG):
    """Test that multiple datasets can be added to the scivision dataset catalog when provided."""
    test_entry = 'tests/catalog_data_multiple_entries.json'
    add_dataset(test_entry, DATA_CATALOG)
    with open(test_entry) as file:
        entry = json.load(file)
    entries = list(entry.keys())
    with open(DATA_CATALOG) as file:
        datasources = json.load(file)
    for entry_name in entries:
        assert entry_name in datasources
        assert "task" in datasources[entry_name]
        assert "domain" in datasources[entry_name]
        assert "datasource" in datasources[entry_name]
        assert "format" in datasources[entry_name]
        assert "labels" in datasources[entry_name]
        assert "institution" in datasources[entry_name]
        assert "tags" in datasources[entry_name]
        
        
# def test_add_dataset_entry_exists():
#     """Test that a new dataset is not added to the scivision dataset catalog if an entry with the same name exists."""
    # TODO: instead, have it so that the datasets are named however people like for now
    
def test_add_model(MODEL_CATALOG):
    """Test that a new model can be added to the scivision model catalog."""
    test_entry = 'tests/catalog_model_entry.json'
    add_model(test_entry, MODEL_CATALOG)
    with open(test_entry) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    with open(MODEL_CATALOG) as file:
        models = json.load(file)
    assert entry_name in models
    assert "task" in models[entry_name]
    assert "model" in models[entry_name]
    assert "github_branch" in models[entry_name]
    assert "language" in models[entry_name]
    assert "data_format" in models[entry_name]
    assert "pretrained" in models[entry_name]
    assert "labels_required" in models[entry_name]
    assert "institution" in models[entry_name]
    assert "tags" in models[entry_name]