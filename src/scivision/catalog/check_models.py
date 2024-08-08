"""
Automated Models Checks

Iterate through model catalog via scivision.load_pretrained_model
to check if the model can be loaded and if the model scivision_usable = True.
If not scivision_usable, check if the model url is accessible, if return 200 reponse log as passed.
Otherwise, load the model using load_pretrained_model and log as passed if successful.
"""

import logging
import json
import requests
from datetime import datetime

from scivision import default_catalog, load_pretrained_model
from tqdm import tqdm

# Create Logger
logger = logging.getLogger(__name__)
# Set log level
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler('check_models.log')
formatter = logging.Formatter('%(asctime)s : %(levelname)s : %(name)s : %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


def check_models():
    """
    For each model in the catalog, check that the URL can be loaded
    with `load_pretrained_model`.

    Returns a json report

    Model information includes
    - name
    - tasks
    - pkg_url
    - url
    - scivision_usable
    """
    # Load model catalog
    model_catalog = default_catalog.models.to_dataframe()
    # Load model using model and record response
    rows = {}
    for model in tqdm(model_catalog.itertuples()):
        name = model.name
        yml_path = model.url
        print(f'\nValidating: {name}')
        if not model.scivision_usable:
            response = requests.get(model.url)
            row_data = {
                'url': model.url,
                'check_result': 'Pass' if response.status_code == 200 else 'Fail',
                'response': f'Scivision_usable = False but model url response: {response.status_code}',
            }
            print(f'Model is not Scivision usable but model url response: {response.status_code}')
        else:
            try:
                if not yml_path.endswith((".yml", ".yaml",)):
                    load_pretrained_model(yml_path, allow_install=True)
                    print('Model Loaded Successfully')
                    check_result = "Pass"
                    response = None
            except Exception as e:
                print(e)
                logger.exception("Automated Model Check has failed!")
                check_result = "Fail"
                response = logger.error(e, exc_info=True)
            # Convert response to JSON serializable format
            if response is not None:
                response = str(response)
            row_data = {
                'url': yml_path,
                'check_result': check_result,
                'response': response,
            }

        rows.update({model.name: row_data})

    automated_checks_report = {
        "time": datetime.now().isoformat(),
        "report": rows
    }
    automated_checks_report_json = json.dumps(automated_checks_report)

    return automated_checks_report_json


def entry_point():
    """This is the entry point for the 'scivision-check-models'
    command.
    """
    automated_checks_report_json = check_models()

    with open('check_models.js', 'w') as f:
        print('// This file was generated automatically by check_models.py', file=f)
        print('// Last updated: ' + datetime.now().strftime("%H:%M, %d-%m-%Y") + '.', file=f)
        print(f'export const global_CheckModelReport = {automated_checks_report_json};', file=f)
        # ^^^ requires changes to ModelTable.jsx similar to DataTable.jsx
