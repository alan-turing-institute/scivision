#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import abc
from typing import Dict, List


def _validate_query(query: dict) -> dict:
    """Validate a query dictionary."""
    if not isinstance(query, dict):
        raise TypeError("Query must be a dictionary.")
    return query


class BaseCatalog(abc.ABC):

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

    @abc.abstractmethod
    def values(self, key: str) -> List[str]:
        raise NotImplementedError
