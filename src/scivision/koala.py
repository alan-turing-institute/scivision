#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import inspect
import io
import logging
from functools import wraps
from typing import Callable


KOALA_LOGGING_LEVEL = logging.DEBUG

# get the logger instance
logger = logging.getLogger(__name__)
stream = io.StringIO()


# if we don't have any handlers, set one up
if not logger.handlers:
    format = logging.Formatter(
        "\U0001f428 [%(levelname)s][%(asctime)s] %(message)s",
        datefmt="%Y/%m/%d %H:%M:%S",
    )
    handler = logging.StreamHandler(stream)
    handler.setFormatter(format)
    logger.addHandler(handler)
    logger.setLevel(KOALA_LOGGING_LEVEL)


def koala(fn: Callable) -> Callable:
    """Decorator to enable logging of calls to core `scivision` functions.

    Parameters
    ----------
    fn : Callable
        The function to be wrapped with the `koala` logger.

    Returns
    -------
    wrapped_fn : Callable
        The `koala` wrapped function.
    """

    @wraps(fn)
    def wrapped_fn(*args, **kwargs):

        # we can also log the signature and kwargs provided
        signature = inspect.signature(fn)
        logger.info(
            f"Call='{fn.__name__}', module='{inspect.getmodule(fn).__name__}'"
            f", signature={signature}"
            f", kwargs_given='{', '.join(kwargs.keys())}'"
        )

        # now call the function, but log any exceptions
        try:
            output = fn(*args, **kwargs)
        except Exception as e:
            logger.error(e)
            raise
        return output

    return wrapped_fn


def get_koala_log() -> str:
    """Get the koala log.

    Returns
    -------
    stream : str
        The koala log stream as a string.
    """
    return stream.getvalue()
