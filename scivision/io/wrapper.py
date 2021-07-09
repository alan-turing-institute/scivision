import importlib

import numpy as np


class PretrainedModel:
    """A pretrained model, built using scivision configuration file."""

    def __init__(self, config: dict):
        self._config = config

        # import the module and get the model object
        self._module = importlib.import_module(config["import"])
        model = getattr(self._module, config["model"])

        # we could instantiate the model using the args here
        # args = config["args"]
        self._model = model()
        self._prediction_fn = getattr(
            self._model, config["prediction_fn"]["call"]
        )

    def predict(self, X: np.ndarray, **kwargs):
        """Run the prediction."""
        # note, we may need to pass other kwargs to the prediction here
        return self._prediction_fn(X)

    def __repr__(self):
        """Return a nice representation of the model."""
        return (
            f"scivision.PretrainedModel( \n"
            f"  module='{self._module.__name__}', \n"
            f"  model='{self._model.__class__.__name__}', \n"
            f"  source='{self._config['url']}' \n)"
        )
