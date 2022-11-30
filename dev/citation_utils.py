import json
import yaml

from pathlib import Path


def update_citation_file() -> None:
    """Update the citation file using the contents of the all-contributors config."""

    root_path = Path(__file__).parent.parent
    contributors_file = root_path / ".all-contributorsrc"

    pass
