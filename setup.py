#!/usr/bin/env python
from setuptools import find_packages, setup

# read the contents of your README file
from pathlib import Path
this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

requirements = []
with open("requirements.txt") as f:
    for line in f:
        stripped = line.split("#")[0].strip()
        if len(stripped) > 0:
            requirements.append(stripped)

setup(
    name="scivision",
    version="0.2.5",
    description="scivision",
    author="The Alan Turing Institute",
    author_email="scivision@turing.ac.uk",
    url="https://github.com/alan-turing-institute/scivision",
    packages=find_packages(),
    install_requires=requirements,
    python_requires=">=3.7",
    include_package_data=True,
    long_description=long_description,
    long_description_content_type='text/markdown',
)
