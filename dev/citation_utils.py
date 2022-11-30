# import dataclasses
import json
import yaml

# from dataclasses import dataclass
from pathlib import Path


_CITATION_HEADER = {
    "cff-version": "1.2.0",
    "title": "scivision",
    "message": "If you use this software, please cite it using the metadata from this file.",
    "type": "software",
    "authors": [],
}
_DEFAULT_ORCID = "https://orcid.org/0000-0000-0000-0000"


# @dataclasses.dataclass
# class Author:
#     given_names: str
#     family_names: str = ""
#     orcid_id: str = "https://orcid.org/0000-0000-0000-0000"
#
#     def as_yaml(self) -> dict[str, str]:
#         fields = [f.name for f in dataclasses.fields(self)]
#         yaml_dict = {
#             field.replace("_", "-"): getattr(self, field)
#             for field in fields
#         }
#         return yaml_dict


def update_citation_file(filepath: Path) -> None:
    """Update the citation file using the contents of the all-contributors
    config."""

    root_path = Path(__file__).parent.parent
    contributors_filepath = root_path / ".all-contributorsrc"

    # open the contributors file and parse out the details
    with open(contributors_filepath, "r") as contributors_file:
        data = json.load(contributors_file)
        contributors = data.get("contributors", [])

    cff_data = _CITATION_HEADER

    for contributor in contributors:
        names = contributor["name"].split(" ")
        initials = [name for name in names if len(name) == 1 or name.endswith(".")]
        given_names = names[0:1]
        family_names = [name for name in names[1:] if name not in initials]
        author = {
            "given-names": " ".join(given_names + initials),
            "family-names": " ".join(family_names),
            "orcid": _DEFAULT_ORCID,
        }
        cff_data["authors"].append(author)

    # currently this writes over the file, fix this to append
    with open(filepath, "w") as cff_file:
        dump = yaml.safe_dump(cff_data, default_flow_style=False)
        cff_file.write(dump)


if __name__ == "__main__":
    update_citation_file("test.cff")
