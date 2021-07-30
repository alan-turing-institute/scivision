import inspect
import io
import logging
from functools import wraps

# get the logger instance
logger = logging.getLogger(__name__)
stream = io.StringIO()


# if we don't have any handlers, set one up
if not logger.handlers:
    # configure stream handler
    log_fmt = logging.Formatter(
        "KOALA [%(levelname)s][%(asctime)s] %(message)s",
        datefmt="%Y/%m/%d %I:%M:%S %p",
    )
    console_handler = logging.StreamHandler(stream)
    console_handler.setFormatter(log_fmt)

    logger.addHandler(console_handler)
    logger.setLevel(logging.DEBUG)


def koala(fn):
    """Log calls to core `scivision` functions"""

    @wraps(koala)
    def wrapped_fn(*args, **kwargs):
        output = fn(*args, **kwargs)
        # TODO(arl): store the arguments and output of the function
        logger.info(
            f"Call='{fn.__name__}', module='{inspect.getmodule(fn).__name__}'"
        )
        return output

    return wrapped_fn


def get_koala_log():
    """Get the koala log."""
    return stream.getvalue()
