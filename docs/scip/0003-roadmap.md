# A roadmap for Scivision

## Metadata

Editors:
  quantumjot, scotthosking, sebastianahnert (project PIs), ots22 (who
  created this draft), IFenton

Status (raw | draft | stable | deprecated | retired):
  draft

## Description

This document summarises the main priorities of the Scivision team
based at the Alan Turing Institute, for the current phase of the
project supporting Scivision development, that started in August 2024.

Scivision originated at the Alan Turing Institute, and development is
hosted there, but the project welcomes participation from
anyone in the wider community. Any contributions related to
Scivision's mission are gladly received, whether or not they relate to
the items noted below.

As of August 2024, Scivision is not currently being actively developed
by a team at the Turing. However, this roadmap is to be understood as 
listing areas that are would benefit from receiving attention, and 
is provided in order to help users and contributors understand the 
suggested direction of the project.


Importantly, the roadmap doesn't commit anyone to any particular
deliverables, there aren't specific dates associated with the items
listed here, and it may be modified (it is likely to remain a
perpetual 'draft').

## Priority areas

### Core features

  - Data loaders (potentially replacing or supplementing Intake)
  - Catalog schema improvements and model/datasource metadata; catalog
    versioning
  - Better specified requirements for models and datasources
  - More robust handling of model dependencies

### Community engagement

  - Making Scivision a hub for best practices in sharing reproducible
    CV models
  - Informational videos (overview, getting started, task-focussed
    tutorials)
  - Informal support to researchers wishing to share their models and
    datasets

### Web interface

  - Model/dataset matchmaking, graphical representation of models and
    dataset interoperability

### Automation

  - Template repositories for computer vision models or datasources
    that are ready for inclusion in the catalog ('cookie cutters').
  - Additional consistency and integrity checks, including
      - URLs in the catalogs
      - scivision gallery notebooks (from current scivision projects)
      - checked annotations (decorators)

### Supporting Scivision use-cases

  - Growing the catalog
      - Encouraging users to share their models and data through the catalog
      - Targetting models for the following tasks in particular (although
      not exclusively):
        - object tracking
        - super-resolution
        - shape analysis
