# Scivision phase 2 workshop

Here I summarise the outcome of a full day workshop that took place at The Alan Turing institute on 19th April 2022 - the goal of the day was to plan development goals and direction for the scivision project for the period to the end of August 2022.

- [Miro Board/Digital Whiteboard](https://miro.com/welcomeonboard/UDBQRXlmTnFMZWZpNjZaczhCTG5JWU1yRlBMMGRsUHdvVmp6YnpjQVNtbVhnaUVLY3p0bmVkbEI3ZEZpTW5HanwzNDU4NzY0NTIzNTA5NDI3MDA3?share_link_id=934751878977)
- [Hackmd](https://hackmd.io/4LMa96ZlQAKJ7g_RuAT52w?both)

# Core phase 2 goals

1. Clearly state the scivision USP on readthedocs & GitHub
1. Create a website that enables scivision users to search the catalog based on flowchart selections
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

# Discussions:

### What is scivision's "USP"?

 - "By scientists for scientists"
 - For scientists **starting off** their journey using algorithms on imagery
     - Scivision can be used at different levels of complexity, without throwing low/no exp programming scientists in at the deep end, but helping them make the transition to an informed user of CV tools
     - For the casual user, a lot of detail is hidden, by design
 - Inspiration from https://huggingface.co/ but research focussed
 - Usable as a **demo tool**: easy integration with notebooks and few lines of code; simplicity
 - A **sharing tool** for models or datasets that come from scientific research projects
 - Search engine/indexing for datasets and models
 - Stop "reinventing the wheel" in image data science
 - Easy way for scientists with image data to find CV algorithms based on what other scientists have done in the same field OR with matching metadata from other fields
 - a community-driven platform for connecting and accelerating the discovery and reusability of scientific image datasets and CV models.
 - Could include curated datasets for benchmarking of new CV algorithms
 - Older discussions of scope: [#168](https://github.com/alan-turing-institute/scivision/discussions/168) & [#196](https://github.com/alan-turing-institute/scivision/discussions/196)

### Scivision python package and catalog features

- Model dependencies [#159](https://github.com/alan-turing-institute/scivision/discussions/159) & [#131](https://github.com/alan-turing-institute/scivision/issues/131)
    - Could we use [wrattler](https://www.turing.ac.uk/research/publications/wrattler-reproducible-live-and-polyglot-notebooks) to have different model environments in same notebook?
- Ability to train and fine tune models
    - a `.fit()` function like in `sklrearn`?
- 3rd party models [#121](https://github.com/alan-turing-institute/scivision/discussions/121)
- Languages [#90](https://github.com/alan-turing-institute/scivision/issues/90)
- Adapter code/plugins [#168](https://github.com/alan-turing-institute/scivision/discussions/168)
- Algorithm adaptation/ development (e.g. SOAP /ACE) 
- Shape features plugin
- Permanent IDs [#181](https://github.com/alan-turing-institute/scivision/discussions/181)
- Model licenses [#169](https://github.com/alan-turing-institute/scivision/discussions/169)
   - If we target the scientific community, which licenses will scivision include/avoid in the public catalog? See for instance the choose of an appropiate license in [the awesome manifesto](https://github.com/Open-Environmental-Science/awesome-open-hydrology/blob/master/awesome.md#choose-an-appropriate-license). Note the proposed license screening only seems valid for the public catalog.
- Measuring model quality [#162](https://github.com/alan-turing-institute/scivision/discussions/162)
    - Testing/metrics for models being submitted (or at least a check that they run)
- Load-ability via API [#149](https://github.com/alan-turing-institute/scivision/discussions/149)
- Dataset hosting [#146](https://github.com/alan-turing-institute/scivision/discussions/146)
- Supported data types, intake exclusivity?
- How should the schema look? [#110](https://github.com/alan-turing-institute/scivision/issues/110) 
- Should we replace the catalog with a SQL db and where/how is it stored?
- Expand upon the scivision catalog submission guidance
- Retain the catalog entries all being runnable with `load_pretrained_model()` function since non-programmer scientists value everything easily runnable
- Continue to evolve the catalog schema over time

### Scaling up scivision uses

- Discussions around using scivision with HPC
- Containers [#125](https://github.com/alan-turing-institute/scivision/discussions/125) (relevant to the API and catalog too)
- Large dataset handling [#91](https://github.com/alan-turing-institute/scivision/issues/91)
- Hosting scivision workflows that involve lots of data or require more **compute power** (e.g. gallery examples):
    - Using Turing's hub23 platform Jupyterhub, with scivision as a major project justification for this: can we have high resource notebook environments where users can "try out" models and datasets from the catalog
    - Alternatively, use Ray : 
    https://docs.ray.io/en/latest/index.html
- Multiprocessing for model inference (CPU)
- Think about considerations around GPU vs CPU models

### UI

- Scivision as a web tool, similar to [huggingface.co](https://huggingface.co/) ?
- System to enable manual annotation?
    - Fork [mapreader](https://www.researchgate.net/publication/356663348_MapReader_A_Computer_Vision_Pipeline_for_the_Semantic_Exploration_of_Maps_at_Scale) to get annotation tool as part of scivision?
- Create a website that enables scivision users to search the catalog based on flowchart selections
    - Flowchart selection constructs a new JSON entry to the catalog and uses the scivision package to find compatible datasources/models
    - Advanced version of this flowchart tool to involve getting users to select the "binary mask" that most closely represents their data (or this could perhaps be automated)
    - ^ use a distance metric or similarity shape descriptors
    - Via the flowchart tool/website, the catalog can be searched with just metadata, in advance of there being an actual new model or dataset to submit to the catalog. Perhaps it should be possible to upload a test image?
- Use [napari](https://napari.org/) for browsing, annotating, and analyzing large multi-dimensional images

### Attracting a user/contributor base

- Talks at conferences
   - RSECon22
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
- Turing Easter egg - scivision task used for coffee machine!
- Reach out to people doing PhD projects on computer vision (e.g. Turing enrichment students)

### Administrative

- Organise community calls when community is larger
- Design SCIPI - Scivision Improvement Proposal Index - how to design system as a community
- Recruit code of conduct chair for scivision