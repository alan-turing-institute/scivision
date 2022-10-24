About Scivision Improvement Proposals (SCIPs)
=============================================

What is a SCIP?
---------------

SCIPs, or *Scivision Improvement Proposals*, are design documents for Scivision. The ones contained here include those that have been accepted, adopted and perhaps implemented, as well as drafts or suggestions.  A SCIP is similar to an RFC (Request for Comments) used in other projects, or a PEP (Python Enhancement Proposal) in the Python ecosystem.  It could describe:

    * software architecture
    * an interface or API that the software exposes
    * a file format
    * a process or way of working together.

SCIPs that have been adopted (whose *status* is 'stable') complement the project documentation, where relevant SCIPs can be linked and referenced.  Unlike the documentation, they are intended as specifications, and can be used by implementors to understand the intended behaviour of the system.

When should a SCIP be used?
---------------------------

Consider making a SCIP if: you would like to propose changes that affect the overall design of the library, introduce or change an interface, and in any situation where **early feedback from the community** on an idea would be helpful.

They are not necessary for every change: For smaller, or self-contained contributions, simply open a pull request to the relevant repository (e.g. `scivision <https://github.com/alan-turing-institute/scivision>`_. This type of change can be made and discussed on the pull request directly.

Who can make a SCIP?
--------------------

**Any scivision contributor** can propose a SCIP by making a pull request to this repository that adds to the ``docs/scip`` directory, following the steps below. See also the `contributing guide <https://github.com/alan-turing-institute/scivision/blob/main/contributing.md>`_ for advice about contributing to the project generally.

An SCIP has one or more *editors*, normally the proposor, and who is responsible for gathering feedback and revising the text before it is adopted (gathering comments on the pull request or any relevant issues and discussion, for example).

The SCIP process
----------------

A variation of the `Consensus Oriented Specification System <https://rfc.unprotocols.org/2/>`_ is used to manage the lifecycle of a SCIP.

In summary, the steps to follow, from proposal to adoption, are listed below. Feel free to ask on the `discussions board <https://github.com/alan-turing-institute/scivision/discussions>`_ if you need any help with any part of this process.

 #. Fork/clone this repository
 #. Copy the template from ``docs/scip/0000-template.md`` to a new file in ``docs/scip``.  Use the next available number for the filename, for example ``0123-short-name.md``
 #. Add your GitHub username to the ``editor`` field
 #. Give it a short, descriptive title, and optionally add any draft text to the relevant sections of the document
 #. Add it to the list in ``docs/scip/scip_index.rst``
 #. Include the text of your proposal in the file you just created. Apart from the metadata, the structure of the document is completely free form -- the template or other SCIPs can act as a guide.
 #. Open a pull request into the main scivision repository
 #. While the status of the SCIP is ``raw`` or ``draft``, the text can be modified in any way -- at this stage, it is up to the 'editor' (usually the original author) to seek feedback and accept (or reject) any changes on their proposal, but please feel free to ask a maintainer for help with this
 #. Consider `discussing <https://github.com/alan-turing-institute/scivision/discussions>`_ the proposal with the community, and requesting feedback or edits from others
 #. When it is ready for work to begin on an implementation, change (via pull request) the status to ``draft``
 #. Once there is broad agreement that it should be adopted (and, where code changes are necessary, that there is a working implementation), change the status to ``stable``.
     * Substantial edits should not be made to SCIPs whose status is ``stable``.  Instead, create a new one as a replacement (using this process), perhaps copying and modifying any relevant text, and eventually deprecating/retiring the original.
