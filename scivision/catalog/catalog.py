import abc
from typing import Dict, List

import pandas as pd

# catalog URI, this is just a local file at the moment
CATALOG_URI = "./dev/catalog.json"


def _validate_query(query: dict) -> dict:
    """Validate a query dictionary."""
    if not isinstance(query, dict):
        raise TypeError("Query must me a dictionary.")
    return query


class BaseCatalog(abc.ABC):
    def __init__(self):
        self._uri = CATALOG_URI
        self._database = None

    @property
    def URI(self):
        return self._uri

    def query(self, query: Dict[str, str]) -> list:
        query = _validate_query(query)
        return self._query(query) if query else []

    @abc.abstractmethod
    def _query(self, query: Dict[str, str]) -> list:
        raise NotImplementedError

    @property
    @abc.abstractmethod
    def keys(self) -> List[str]:
        raise NotImplementedError

    @property
    @abc.abstractmethod
    def values(self, key: str) -> List[str]:
        raise NotImplementedError


class PandasCatalog(BaseCatalog):
    def __init__(self):
        super().__init__()
        self._database = pd.read_json(self.URI, orient="index", dtype="str")

    def _query(self, query: Dict[str, str]) -> list:
        """Query the Pandas dataframe."""
        queries = [f"{k} == '{v}'" for k, v in query.items()]
        query_str = " & ".join(queries)
        result = self._database.query(query_str)
        return result.to_dict("records")

    @property
    def keys(self) -> List[str]:
        """Return the query keys."""
        return self._database.columns.tolist()

    def values(self, key: str) -> List[str]:
        """Return the unique values for a query key."""
        if key not in self.keys:
            raise ValueError(f"Key {key} not found.")
        values = self._database[key].tolist()
        return list(set(values))


_catalog = PandasCatalog()


def query(query: Dict[str, str]) -> list:
    """Search the catalog using the query.

    Parameters
    ----------
    query : dict
        A dictionary describing the search query as key value pairs.

    Returns
    -------
    result : list
        A list of catalog entries matching the search requirements.
    """

    result = _catalog.query(query)
    return result


def keys() -> List[str]:
    return _catalog.keys


def values(key: str) -> List[str]:
    return _catalog.values(key)
