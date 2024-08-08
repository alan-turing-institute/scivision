'''
Automated Checks

Iterate through data catalog via scivision.load_dataset function and log responses

'''

import logging
import json

from datetime import datetime

from scivision import default_catalog, load_dataset
from tqdm import tqdm

# Create Logger
logger = logging.getLogger(__name__)
# Set log level
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler('check_datasets.log')
formatter = logging.Formatter('%(asctime)s : %(levelname)s : %(name)s : %(message)s')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)


def check_datasets():
    """For each dataset in the catalog, check that the URL can be loaded
    with `load_dataset`.

    Returns a json report
    """
    # Load dataset catalog
    datasource_catalog = default_catalog.datasources.to_dataframe()
    # Load dataset using load_dataset and record response
    rows = {}
    for datasource in tqdm(datasource_catalog.itertuples()):
        name = datasource.name
        print(f'\nValidating: {name}')
        data_url = datasource.url[:]
        try:
            load_dataset(data_url)
            check_result = "Pass"
            response = None
        except Exception as e:
            print(e)
            logger.exception("Automated Dataset Check has failed!")
            check_result = "Fail"
            response = logger.error(e, exc_info=True)

        row_data = {
            'url': data_url,
            'check_result': check_result,
            'response': response,
        }

        rows.update({datasource.name: row_data})

    automated_checks_report = {
        "time": datetime.now().isoformat(),
        "report": rows
    }
    automated_checks_report_json = json.dumps(automated_checks_report)

    return automated_checks_report_json


def entry_point():
    """This is the entry point for the 'scivision-check-datasets'
    command.
    """
    automated_checks_report_json = check_datasets()

    with open('check_datasets.js', 'w') as f:
        print('// This file was generated automatically by check_datasets.py', file=f)
        print('// Last updated: ' + datetime.now().strftime("%H:%M, %d-%m-%Y") + '.', file=f)
        print(f'export const global_CheckDatasetReport = {automated_checks_report_json};', file=f)
