from scivision.catalog import add_dataset, add_model
import json


def test_add_dataset():
    """Test that a new dataset can be added to the locally stored scivision dataset catalog."""
    test_entry = 'tests/catalog_data_entry.json'
    add_dataset(test_entry)
    with open(test_entry) as file:
        entry = json.load(file)
    entry_name = list(entry.keys())[0]
    with open('scivision/catalog/data/datasources.json') as file:
        datasources = json.load(file)
    assert entry_name in datasources
    assert "task" in datasources[entry_name]
    assert "domain" in datasources[entry_name]
    assert "datasource" in datasources[entry_name]
    assert "format" in datasources[entry_name]
    assert "labels" in datasources[entry_name]
    assert "institution" in datasources[entry_name]
    assert "tags" in datasources[entry_name]