import abc

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

    def query(self, query: dict) -> list:
        query = _validate_query(query)
        return self._query(query)

    @abc.abstractmethod
    def _query(self, query: dict) -> list:
        raise NotImplementedError


class PandasCatalog(BaseCatalog):
    def __init__(self):
        super().__init__()
        self._database = pd.read_json(self.URI, orient="index", dtype="str")

    def _query(self, query: dict) -> list:
        """Query the Pandas dataframe."""
        queries = [f"{k} == '{v}'" for k, v in query.items()]
        query_str = " & ".join(queries)
        result = self._database.query(query_str)
        return result.to_dict("records")


_catalog = PandasCatalog()


def query(query: dict) -> list:
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
