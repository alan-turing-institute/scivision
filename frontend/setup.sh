#!/bin/sh

SRCDIR="src/catalog"
PUBDIR="public/catalog"

if [ -d $SRCDIR ] && [ -d $PUBDIR ]; then
    echo "Found catalog folders, skipping setup..."
else
    echo "No catalog folders found, running setup..."
    mkdir -p src/catalog && \
    mkdir -p public/catalog && \
    cp -r ../src/scivision/catalog/data src/catalog && \
    cp -r ../src/scivision/catalog/data public/catalog && \
    cd src/catalog && scivision-catalog-json-schema && cd ../..
fi