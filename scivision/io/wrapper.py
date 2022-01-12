#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import numpy as np

from .autoplumber import AutoPlumber


class PretrainedModel:
    """A pretrained model, built using scivision configuration file."""

    def __init__(self, config: dict):
        self._config = config
        self._plumbing = AutoPlumber(config)

    def predict(self, X: np.ndarray, *args, **kwargs):
        """Run the prediction."""
        # note, we may need to pass other kwargs to the prediction here
        return self._plumbing(X, **kwargs)

    def __repr__(self):
        """Return a nice representation of the model."""
        return (
            f"scivision.PretrainedModel( \n"
            f"  module='{self._plumbing.module.__name__}', \n"
            f"  model='{self._plumbing.model.__class__.__name__}', \n"
            f"  source='{self._config['url']}' \n"
            f"  pipe='{self._plumbing.pipe}' \n)"
        )
