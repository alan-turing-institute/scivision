from scivision.koala import get_koala_log, koala


@koala
def _dummy_fn(x, *, Y: str = "test"):
    """A dummy function."""
    return


def test_koala_logging():
    """Test that koala logging is functional by executing a dummy function
    decorated with the `@koala` logging decorator."""
    log_old = get_koala_log()
    _ = _dummy_fn(1, Y="test")
    log_new = get_koala_log()
    assert len(log_new) > len(log_old)
