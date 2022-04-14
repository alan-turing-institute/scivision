About Scivision Improvement Proposals (SCIPs)
=============================================

What is a SCIP?
---------------

A SCIP, or *Scivision Improvement Proposal*, is a document describing a *standard* for the project: either one that has been accepted and adopted, or that has been suggested.  It is similar to an RFC (Request for Comments) used in other projects, or a PEP (Python Enhancement Proposal) in the Python ecosystem.  A SCIP could describe:

    * software architecture
    * an interface or API that the software exposes
    * a file format
    * a process or way of working together.

SCIPs that have been adopted (whose *status* is 'stable') complement the project documentation, where relevant SCIPs can be linked and referenced.  Unlike the documentation, they are intended as *normative specifications*, and can be used by implementors to understand the intended behaviour of the system.

When should a SCIP be used?
---------------------------

Consider making a SCIP if: you would like to propose changes that affect the overall design of the library, introduce or change an interface, and in any situation where **early feedback from the community** on an idea would be helpful.

They are not necessary for every change: For smaller, or self-contained contributions, simply open a pull request to the relevant repository (e.g. `scivision <https://github.com/alan-turing-institute/scivision>`_. This type of change can be made and discussed on the pull request directly.

Who can make a SCIP?
--------------------

**Any scivision contributor** can propose a SCIP by making a pull request to this repository that adds to the ``docs/scip`` directory, following the steps below. See also the `contributing guide <https://github.com/alan-turing-institute/scivision/blob/main/contributing.md>`_ for advice about contributing to the project generally.

An SCIP has an *editor*, who is normally the proposor, and is responsible for gathering feedback and revising the text before it is adopted, based on feedback in the pull request or any relevant issues and discussions.

The SCIP process
----------------

We use the `Consensus Oriented Specification System <https://rfc.unprotocols.org/2/>`_ to manage the lifecycle of a SCIP.

In summary, the steps to follow, from proposal to adoption, are listed below. Feel free to ask on the `discussions board <https://github.com/alan-turing-institute/scivision/discussions>`_ if you need any help with any part of this process.

 #. Fork/clone this repository
 #. Copy the template from ``docs/scip/0000-template.md`` to a new file in ``docs/scip`` (relative to the project root).  Use the next available number for the filename, for example ``0123-short-name.md``
 #. Add your GitHub username to the ``editor`` field (or the username of whoever has agreed to be the editor)
 #. Give it a short, descriptive title, and optionally add any draft text to the relevant sections of the document
 #. Open a pull request into this repository
    - Normally this can be merged immediately, even if the text is incomplete or an early draft - ask a maintainer if you do not have sufficient access rights to merge it yourself
 #. While the status of the SCIP is ``raw`` or ``draft``, the text can be modified in any way, with the process managed by the editor (normally the proposor)
 #. Consider `discussing <https://github.com/alan-turing-institute/scivision/discussions>`_ the proposal with the community, and requesting feedback or edits from  others as pull requests into this repository
 #. When it is ready for work to begin on an implementation, change (via pull request) the status to ``draft``
 #. Once there is broad agreement that it should be adopted (and a working implementation, for code changes), change the status to ``stable``.

     * Substantial edits should not be made to SCIPs whose status is ``stable``.  Instead, create a new one as a replacement (using this process), perhaps copying and modifying any relevant text, and eventually deprecating/retiring the original.
