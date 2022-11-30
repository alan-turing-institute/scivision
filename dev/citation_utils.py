from __future__ import annotations
import dataclasses
import json
import yaml

from pathlib import Path


_CITATION_HEADER = {
    "cff-version": "1.2.0",
    "title": "scivision",
    "message": "If you use this software, please cite it using the metadata from this file.",
    "type": "software",
    "authors": [],
}
_DEFAULT_ORCID = "https://orcid.org/0000-0000-0000-0000"
_MATCH_KEYS = (
    "given_names",
    "family_names",
)


@dataclasses.dataclass
class Author:
    """Author

    Performs some operations that allow interoperability between citation
    file format (CFF) and the ``allcontributorsrc`` file.

    Equivalence is tested by names only.
    """

    given_names: str = ""
    family_names: str = ""
    orcid: str = _DEFAULT_ORCID

    @staticmethod
    def from_contributor(contributor: dict[str, str]) -> Author:
        names = contributor["name"].split(" ")
        initials = [name for name in names if len(name) == 1 or name.endswith(".")]
        given_names = names[0:1]
        family_names = [name for name in names[1:] if name not in initials]

        author = Author(
            given_names=" ".join(given_names + initials),
            family_names=" ".join(family_names),
        )
        return author

    @staticmethod
    def from_yaml(author: dict[str, str]) -> Author:
        author_dict = {key.replace("-", "_"): value for key, value in author.items()}
        return Author(**author_dict)

    def as_yaml(self) -> dict[str, str]:
        fields = [f.name for f in dataclasses.fields(self)]
        yaml_dict = {field.replace("_", "-"): getattr(self, field) for field in fields}
        return yaml_dict

    def __eq__(self, cmp: Author) -> bool:
        return all([getattr(self, key) == getattr(cmp, key) for key in _MATCH_KEYS])


def update_citation_file(filepath: Path) -> None:
    """Update the citation file using the contents of the all-contributors
    config."""

    filepath = Path(filepath)
    root_path = Path(__file__).parent.parent
    contributors_filepath = root_path / ".all-contributorsrc"

    # open the contributors file and parse out the details
    with open(contributors_filepath, "r") as contributors_file:
        data = json.load(contributors_file)
        contributors = data.get("contributors", [])

    cff_data = _CITATION_HEADER
    authors = []

    for contributor in contributors:
        author = Author.from_contributor(contributor)
        authors.append(author)

    if not filepath.exists():
        cff_data["authors"] = [author.as_yaml() for author in authors]
        with open(filepath, "w") as cff_file:
            dump = yaml.safe_dump(cff_data, default_flow_style=False)
            cff_file.write(dump)
        return

    # however, if it does exist, read the contents and append any new entries
    with open(filepath, "r") as cff_file:
        existing_data = yaml.safe_load(cff_file)
        existing_authors = [
            Author.from_yaml(author) for author in existing_data["authors"]
        ]

    authors_to_add = [
        author.as_yaml() for author in authors if author not in existing_authors
    ]

    if authors_to_add:
        existing_data["authors"] += authors_to_add
        with open(filepath, "w") as cff_file:
            dump = yaml.safe_dump(existing_data, default_flow_style=False)
            cff_file.write(dump)


if __name__ == "__main__":
    root_path = Path(__file__).parent.parent
    update_citation_file(root_path / "CITATION.cff")
