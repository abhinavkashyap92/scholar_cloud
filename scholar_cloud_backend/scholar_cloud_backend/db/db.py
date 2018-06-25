from scholar_cloud_backend.utils.get_mongo_client import MongoDBConnection
import scholar_cloud_backend.constants as constants
import os
import json

FILEPATHS = constants.FILEPATHS
CONFIGS_DIR = FILEPATHS["CONFIG_DIR"]


class DB:
    """
    This manages all the common operations related to the DB
    """

    def __init__(self, config_filename="db_config.json"):
        """

        :param config_filename: str config filename where all the db related config is stores
        """
        self.client = MongoDBConnection().client
        self.config_filename = config_filename

        if not os.path.isfile(os.path.join(CONFIGS_DIR, config_filename)):
            raise FileNotFoundError("The DB configuration file is not found."
                                    "Please contact the developers for more information")

        self.config = self.read_db_config()
        self.db_name = self.config.get('db', None)
        self.port_number = self.config.get('port', None)

        if self.db_name is None or self.port_number is None:
            raise ValueError("Your DB configuration file is malformed."
                             "Please contact the developers for more information")

        self.db = self.client[self.db_name]

    def read_db_config(self):
        """
        Read the db config gile
        :return: config: Dictionary containing the config
        """
        with open(os.path.join(CONFIGS_DIR, self.config_filename)) as fp:
            config = json.load(fp)
        return config

    def get_papers_collection(self):
        papers_collection_name = self.config.get("s2_papers_collection", None)
        if papers_collection_name is None:
            raise ValueError("Your DB configuration file is malformed."
                             "Please contact the developers for more information")

        return self.db[papers_collection_name]

    def get_author_id_name_collection(self):
        author2id_collection_name = self.config.get("author_id_name_collection", None)
        if author2id_collection_name is None:
            raise ValueError("Your DB configuration file is malformed."
                             "Please contact the developers for more information")

        return self.db[author2id_collection_name]

    def get_author_profile_collection(self):
        author_profile_collection_name = self.config.get("author_profile_collection", None)
        if author_profile_collection_name is None:
            raise ValueError("Your DB configuration file is malformed."
                             "Please contact the developers for more information")

        return self.db[author_profile_collection_name]

    def get_titles_preprocessed_collection(self):
        titles_preprocessed_collection_name = self.config.get("titles_preprocessed_collection",
                                                              None)
        if titles_preprocessed_collection_name is None:
            raise ValueError("Your DB configuration file is malformed."
                             "Please contact the developers for more information")

        return self.db[titles_preprocessed_collection_name]

