#!/usr/bin/env python
from setuptools import find_packages, setup

# read the contents of your README file
from pathlib import Path
this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text(encoding="utf-8")

requirements = []
with open("requirements.txt", encoding="utf-8") as f:
    for line in f:
        stripped = line.split("#")[0].strip()
        if len(stripped) > 0:
            requirements.append(stripped)

entry_points = {
    "console_scripts" : [
        'scivision-catalog-json-schema = scivision.catalog.gen_json_schema:entry_point',
    ]
}

setup(
    name="scivision",
    version="0.6.1",
    description="scivision",
    author="The Alan Turing Institute",
    author_email="scivision@turing.ac.uk",
    url="https://github.com/alan-turing-institute/scivision",
    packages=find_packages(),
    install_requires=requirements,
    python_requires=">=3.7",
    include_package_data=True,
    long_description=long_description,
    entry_points=entry_points,
    long_description_content_type='text/markdown',
)
