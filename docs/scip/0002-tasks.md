# Supported machine vision tasks

## Metadata

Editor:
  ots22

Status (raw | draft | stable | deprecated | retired):
  raw

## Description

This is a proposal for a list of particular 'tasks' for Scivision to support through a standard interface.

## Rationale

In a statically-typed language, this proposal could be checked in part using type information, although of course an interface with the correct type may still be incorrect.

- how we might use type hints

- helper classes for returning output

- parse resulting dict from data class

- Handling models which are not captured in the list of tasks can be handled by:
  - Extentions to existing tasks (one example could be returning an object with the properties required by the denoted task, but with additional properties representing additional data)
  - A catch-all 'other' task


## The tasks

### The input image

Below, `image` is always the name given to the input image:

```
image: numerical array of shape (Ny, Nx, Nc)
    The input image data, where
     - Ny is the image height
     - Nx is the image width
     - Nc is the number of channels (Nc = 1 for greyscale, Nc=3 for colour images, but other values possible for multi-channel data)

```

In addition, some tasks take a 'mask', always `mask` below:
```
mask: bool array of shape (Ny, Nx)
    A bitmask, intended to indicate a particular region of the image on which to operate (False or 0 should indicate that the particular pixel is unavailable, deselected, or similar - if such a distinction between masked and unmasked pixels can be made).
```

Additional dimensions may be supported by particular tasks (for 3-d tomographic data, for example).

It is assumed that the model is capable of handling image data as an
array, but auxillary data (such as pixel pitch, colour space
information) may be passed to predict, although it would seem reasonable to anticipate that most models will consume data as a plain array.

`predict` should not perform a strict check for a numpy array, but should rely on duck-typing and treat its input as array-like, since other compatible input types are possible (such as `xarray.DataArray`).


### Image transformation

```
predict(image) -> result
predict(image, mask) -> result

result: any 
    The result (typically expected to be an array whose dimensions relate predictably to the dimensions of 'image')
```

Examples: denoising, reconstruction, repainting, depth estimation, colourization, **super-resolution**


### Classification


### Object detection


### Object tracking

### Shape analysis



## References
