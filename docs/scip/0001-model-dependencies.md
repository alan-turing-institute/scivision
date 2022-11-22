# Scivision models: notes on installation and dependency management

## Metadata

Editor:
  ots22

Status (raw | draft | stable | deprecated | retired):
  raw

## Description

This document is an attempt at describing one major challenge in the design of Scivision, namely dependeny management of Scivision models, and a few trade-offs that we might make when attempting to address it.  There is likely no one ideal solution, and the best choice is likely to depend on who actually ends up using Scivision and how they use it. Having a few concrete design choices described here may help with selecting one along with feedback from users.

This document is intended to be updated with the final choice following community discussion, but is initially just a list of possible options.

## The problem

Scivision is a catalog and framework for computer vision models and datasets/sources.  Models in its growing catalog are **python packages** with a prescribed interface.  An ambition of the project is that models are easy to install and run with a small number of lines of python code.

One difficulty in achieveing this is that, particularly in the Python ecosystem, packages may have non-Python-package dependencies that cannot be installed with pip ('system' or 'environmental' dependencies).  This is particularly the case with many ML packages that depend on external libraries.

In addition, some of these libraries have configurations depending on the hardware available on the host system (such as GPUs).  Ensuring the correct set-up of this hardware, including having the correct version of any drivers is a related challenge, but probably beyond what Scivision can reasonably do.

Possible failure modes experienced by the user when a dependency problem arises:

1. An error when installing the package
2. An error on `import`
3. An error at runtime (when running a model's `predict` method, say)

A runtime error caused by an installation problem can be particularly confusing.

An additional challenge comes if scivision users wish to load scivision catalog models that have conflicting package (or Python version) dependencies in the same Python environment or notebook.

## Evaluation

When evaluating proposed architectures, here are some questions to consider.

1. How much effort for configuration or package management is required by the user?

2. How much effort is required by the (data or model) package maintainer for preparing a Scivision package?

3. What guarantees does Scivision give to model plugin authors about the systems on which they will be run?  In particular, are there precise system requirements that Scivision can check and enforce on a host system (including python version, operating system)?  For example, for numpy: https://numpy.org/neps/nep-0029-deprecation_policy.html

4. What guarantees does Scivision give to users about the models in the catalogue, and whether a given model will run correctly on a given host system?

5. How are errors handled and reported, particularly those caused by dependency problems?

6. If there are certain *optional* Scivision features, or the desire to support more than one approach, how is the burden of supporting these shared between the package maintainer and the user? For example, if Scivision intends to support *both* package manager A and B, is this for the convenience of model developers (adding an extra dependency to Scivision for user installations) or for the convenience of users (meaning model developers must support both A and B, and can't rely on either one being present on all systems)?

7. How can multiple models with different, conflicting requirements or dependencies be run?

8. How is deprecation of old models handled (see numpy note)?

9. How is versioning of models handled? What happens if dependencies change between versions of a model? (It may not be possible for the *catalog* to indicate whether system dependencies are required)

10. How to handle dependencies on code needed to load data? This is similar to 7 and 8, but while deprecating models might be an expected part of their lifecycle, this is less true of data, especially if it is in a common format.

11. Is it possible to work offline? (after installing some packages)

## Options to consider

### 1. pip only

This is how Scivision works currently.

Issues:
- Any dependency that cannot be installed with pip is not installed - the failure may be apparanent at installation or at runtime
- The user is largely on their own in this situation (which might be quite common)
- Conflicts with package versions are handled by the underlying python installation.  Multiple model packages may not work together
- Dependency on python version, as with system dependencies, are not handled

#### Variation

- A python command that affects the installation is somewhat surprising.  An alternative could be to make this a command-line interface (`$ scivision install model-name` from a terminal, rather than from within Python). 

### 2. pip with a 'model card'

Like '1. pip only', except dependencies that aren't pip installable are described in a standard place (perhaps installation instructions in the python package contents, INSTALL.md, and extra dependencies according to relevant PEP).

- If there are no extra dependencies, behaves like 1.
- Otherwise, the installation 'fails', but with instructions presented to the user
- The web frontend is a convenient place to link to the model card (or to load its contents directly and show it inline)
- Could be extended into a SaaS model, where the 'model card' is loaded into the first few cells of a notebook, with the installation/setup of the model ready to go
- Consider how this should work with the command-line interface

### 3. SaaS-first

Scivision would work largely as it does at the moment, but the primary way of interacting with it is via a web interface (e.g. like Binder).

This doesn't solve all our problems, but does change their relative priority.  We could live with some installation difficulties (of core Scivision) for example, since installing it locally would be for 'advanced' users only. 

More of the environmental set-up could be borne by the scivision developers (e.g. ensuring GPUs/drivers are working correctly, common system dependencies installed), but only a partial solution to this.

Would still need to handle version conflicts, python version and environment set-up. 

### 4. Conda

This would make conda a requirement for an end-user to use Scivision (or at least, if not required, make certain things more convenient).

- Either a CL interface or an "allow_install"-like interface are possible variations, as with '1. pip only'
  - Could make use of [conda python api](https://docs.conda.io/projects/conda/en/stable/api/index.html)
- As with conda generally, pip dependencies might still be required
- Scivision as a conda package channel?
- Would let us use some helpful features of intake (automatic loading of correct drivers?)

Still wouldn't completely solve system package problem (Tensorflow and GPU setup).  Tensorflow recommends pip installation anyway (the hard bit is the libraries most probably)

### 5. Package-specific model representation (similar to Huggingface)

Advantage: Fixed set of dependencies (e.g. decide on particular versions of torch, tf, jax) and install these when setting up Scivision.  More likely that models then 'just work'.  Removes the problem of version conflicts between model dependencies and challenges of model versioning.

Disadvantage: Much more work for a model developer - no longer possible to write simple wrappers.  I expect this is a deal-breaker for us.

### 6. Container-based models

A model is a container (Docker or singularity).  Data sent to and returned from `predict` is communicated over a socket, rather than called directly.  The container image is built from the model repo with repo2docker or similar. 

Advantages:
- Independent of system and python version
- Could extend this to models in other languages
- Some degree of platform independence

Challenges
- Other arch challenges?
- Generally harder to make completely seamless for the user
- Singularity/GPU support?

### Other ideas
- [Briefcase](https://pypi.org/project/briefcase/)?

