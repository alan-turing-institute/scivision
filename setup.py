#!/usr/bin/env python
from setuptools import find_packages, setup

requirements = []
with open("requirements.txt") as f:
    for line in f:
        stripped = line.split("#")[0].strip()
        if len(stripped) > 0:
            requirements.append(stripped)

setup(
    name="scivision",
    version="0.0.1",
    description="scivision",
    author="Scivision Community",
    author_email="scivision@unknown.invalid",
    url="https://github.com/alan-turing-institute/scivision",
    packages=find_packages(),
    install_requires=requirements,
    python_requires=">=3.7",
)
