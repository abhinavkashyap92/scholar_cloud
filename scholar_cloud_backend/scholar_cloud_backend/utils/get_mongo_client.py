"""
A single MONGODB client should connect to the MONGODB server
This file provides a singleton class that establihses a single connection
This makes sure that you do not open too many connections to the server, forget to close it
and cause memory overload.
"""
import scholar_cloud_backend.constants as constants
import pymongo
import os
import json

FILEPATHS = constants.FILEPATHS
CONFIGS_DIR = FILEPATHS['CONFIG_DIR']


class MongoDBConnection:
    """
    A single MONGODB client should connect to the MONGODB server
    This class provides a singleton class that establihses a single connection
    This makes sure that you do not open too many connections to the server, forget to close it
    and cause memory overload.

    For a more detailed information visit http://python-3-patterns-idioms-test.readthedocs.io/en/latest/Singleton.html
    """
    __instance = None

    def __new__(cls):
        if cls.__instance is None:

            if not os.path.isfile(os.path.join(CONFIGS_DIR, 'db_config.json')):
                raise FileNotFoundError("The MONGODB config file is not found."
                                        "Please contact the developer for more information")

            with open(os.path.join(CONFIGS_DIR, 'db_config.json')) as fp:
                db_config = json.load(fp)

            cls.__instance = object.__new__(cls)
            cls.__instance.client = pymongo.MongoClient(db_config["url"], int(db_config["port"]))

        return cls.__instance


if __name__ == '__main__':
    connection = MongoDBConnection()

    second_connection = MongoDBConnection()

    print(connection)
    print(second_connection)

