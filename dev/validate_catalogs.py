import json
import os

# find catalogs in the dev folder
PATH = "./dev"
JSON_FILES = [
    os.path.join(PATH, f) for f in os.listdir(PATH) if f.endswith(".json")
]

# validate any JSON catalogs by trying to decode them
for filename in JSON_FILES:
    with open(filename, "r") as file:
        print(f"Validating JSON file: {filename}")
        try:
            data = json.load(file)
        except Exception as e:
            raise e
