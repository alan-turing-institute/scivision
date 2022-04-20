# Scivision phase 2 workshop

Here I summarise the outcome of a full day workshop that took place at The Alan Turing institute on 19th April 2022 - the goal of the day was to plan development goals and direction for the scivision project for the period to the end of August 2022.

- [Miro Board/Digital Whiteboard](https://miro.com/welcomeonboard/UDBQRXlmTnFMZWZpNjZaczhCTG5JWU1yRlBMMGRsUHdvVmp6YnpjQVNtbVhnaUVLY3p0bmVkbEI3ZEZpTW5HanwzNDU4NzY0NTIzNTA5NDI3MDA3?share_link_id=934751878977)
- [Hackmd](https://hackmd.io/4LMa96ZlQAKJ7g_RuAT52w?both)

## Core phase 2 goals

1. Clearly state the scivision USP on readthedocs & GitHub
1. Create a website that enables scivision users to search the catalog based on flowchart selections
    - Flowchart selection constructs a new JSON entry to the catalog and uses the scivision package to find compatible datasources/models
2. Get 10+ new scivision users
    - Turing Project adjacent collaborators
    - Interest groups
    - AIUK workshop participants
3. Get 1+ new dataset contributor to scivision and 1+ new model contributor to scivision
4. Organise focus groups to achieve the above (new users and contributor(s))
5. Maximise the number of "easy win" scivision catalog entries for both datasets and models
    - Make various model packages/frameworks easily loadable via scivision
    - Make various online data sources easily loadable via scivision
6. Update scivision docs to include a visual gallery page for existing project examples
7. Gather 3+ user testimonials for scivision e.g. 
    - CEFAS
    - USotom
    - NOC
8. ASG (AI for Science & Government) stories to be written (internal Turing institute goal)

## Discussed

- What is scivision?
     - Scope [#168](https://github.com/alan-turing-institute/scivision/discussions/168) & [#131](https://github.com/alan-turing-institute/scivision/issues/131)
         -  Could include curated datasets for benchmarking of new algorithms
     - USP [#196](https://github.com/alan-turing-institute/scivision/discussions/196)
         - a community-driven platform for connecting and accelerating the discovery and reusability of scientific image datasets and CV models.
         - Easy way for scientists with image data to find CV algorithms based on what other scientists have done in the same field OR with matching metadata from other fields
         - "By scientists for scientists"
         - Inspiration from https://huggingface.co/ but research focussed
         - Usable as a **demo tool**: easy integration with notebooks and few lines of code; simplicity
         - Search engine for datasets and models
         - Stop "reinventing the wheel" in image data science
         
- How should the scivision python package (API interface) look?
     - Model dependencies [#159](https://github.com/alan-turing-institute/scivision/discussions/159)
     - 3rd party models [#121](https://github.com/alan-turing-institute/scivision/discussions/121)
     - Languages [#90](https://github.com/alan-turing-institute/scivision/issues/90)
     - Adapter code/plugins [#168](https://github.com/alan-turing-institute/scivision/discussions/168)
- How should the scivision catalog work?
     - Permanent IDs [#181](https://github.com/alan-turing-institute/scivision/discussions/181)
     - Model licenses [#169](https://github.com/alan-turing-institute/scivision/discussions/169)
         - if we target the scientific community, which licenses will scivision include/avoid in the public catalog?
             - See for instance the choose of an appropiate license in [the awesome manifesto](https://github.com/Open-Environmental-Science/awesome-open-hydrology/blob/master/awesome.md#choose-an-appropriate-license)
             - Note the proposed license screening only seems valid for the public catalog.
     - Measuring model quality [#162](https://github.com/alan-turing-institute/scivision/discussions/162)
     - Load-ability via API [#149](https://github.com/alan-turing-institute/scivision/discussions/149)
     - Dataset hosting [#146](https://github.com/alan-turing-institute/scivision/discussions/146)
     - Supported data types, intake exclusivity?
     - How should the schema look? [#110](https://github.com/alan-turing-institute/scivision/issues/110) 
     - Should we replace the catalog with a SQL db and where/how is it stored?
     - Expand upon the scivision catalog submission guidance
     - Testing/metrics for models being submitted (or at least a check that they run)
- Scaling up scivision uses
     - Discussions around using scivision with HPC
     - Containers [#125](https://github.com/alan-turing-institute/scivision/discussions/125) (relevant to the API and catalog too)
     - Large dataset handling [#91](https://github.com/alan-turing-institute/scivision/issues/91)
     - Using Turing's hub23 platform Jupyterhub, with scivision as a major project justification for this: can we have high resource notebook environments where users can "try out" models and datasets from the catalog
- UI
     - scivision as a web tool, similar to [huggingface.co](https://huggingface.co/) ?
- Attracting a user/contributor base
     - Talks at conferences e.g. RSECon22
         - 
             - [PyData London](https://london.pydata.org/), DL 25 April 2022, 30 min conference talk or a 90min tutorial
     - Other Turing projects? e.g. MapReader
     - Turing Interest Groups, e.g. Living Systems (applications to Phenotyping)
     - Run a catalog contributions workshop, with Turing community or at a conference, or as a DSG?
     - Code of Conduct - especially enforcement if anything goes wrong
     - Project governance and decision-making
     - Improvements of the Scivision Gallery
         - Can we display scivision notebooks within a jupyter book (scivision-book)?
             - Why?
                 - Not all visitors will spend time to navigate each repository and inspect which is the notebook file. In addition, some outputs cells will look better in a rendered version e.g. xarray.dataset info or interactive plots e.g. hvplot
             - How?
                 - Feasible according to a WIP feature of the Environmental Data Science book which uses GitHub actions to automatically render notebooks and update them within a jupyter book. See an example [here](https://environmental-ds-book.github.io/EnvDSBookv2/welcome.html)
                 - Notebooks are hosted in separate repositories in the [EnvDS organisation](https://github.com/Environmental-DS-Book/EnvDSBookv2) similar to the scivision gallery.
             - Next steps
                 - The GitHub action for rendering only works with conda environments. We need a more generalisable solution e.g. [repo2docker action](https://github.com/jupyterhub/repo2docker-action) to render other settings e.g. poetry, requirements.txt.
                 
## Not discussed