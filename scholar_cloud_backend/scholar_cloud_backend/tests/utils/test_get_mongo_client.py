import pytest
from scholar_cloud_backend.utils.get_mongo_client import MongoDBConnection


class TestGetMongoClient:
    def test_two_objects_have_same_address(self):
        first_client = MongoDBConnection()
        second_client = MongoDBConnection()

        assert id(first_client.client) == id(second_client.client)