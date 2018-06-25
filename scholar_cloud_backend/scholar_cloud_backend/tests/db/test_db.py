import pytest
from scholar_cloud_backend.db.db import DB
import scholar_cloud_backend.constants as constants
import os
import json
import pymongo

FILEPATHS = constants.FILEPATHS
CONFIG_DIR = FILEPATHS['CONFIG_DIR']


class TestDB:
    def test_no_config_file_found(self):
        """
        If there is no config file, the class should throw a FileNotFound Error
        """
        dummy_config_filename = "dummy.json"
        with pytest.raises(FileNotFoundError):
            db = DB(config_filename=dummy_config_filename)

    def test_no_db_found_in_config_file(self):
        """
        If there is no db key in the config file then it should throw a ValueErro
        """
        with open(os.path.join(CONFIG_DIR, "dummy_config.json"), 'w') as fp:
            json.dump({'blah': 1}, fp)

        with pytest.raises(ValueError):
            db = DB(config_filename="dummy_config.json")

        os.remove(os.path.join(CONFIG_DIR, "dummy_config.json"))

    def test_no_port_number_in_config_file(self):
        """
            If there is no db key in the config file then it should throw a ValueErro
        """
        with open(os.path.join(CONFIG_DIR, "dummy_config.json"), 'w') as fp:
            json.dump({'db': 'scholar_cloud_test'}, fp)

        with pytest.raises(ValueError):
            db = DB(config_filename="dummy_config.json")

        os.remove(os.path.join(CONFIG_DIR, "dummy_config.json"))

    def test_read_db_config_returns_dict(self):

        db = DB()
        assert type(db.read_db_config()) == dict

    def test_get_papers_collection_throws_error(self):
        db = DB()
        config = db.read_db_config()
        del config['s2_papers_collection']
        db.config = config

        with pytest.raises(ValueError):
            db.get_papers_collection()

    def test_get_papers_collection_returns_collection(self):
        db = DB()
        assert type(db.get_papers_collection()) == pymongo.collection.Collection

    def test_author_id_name_collection_throws_error(self):
        db = DB()
        config = db.read_db_config()
        del config['author_id_name_collection']
        db.config = config

        with pytest.raises(ValueError):
            db.get_author_id_name_collection()

    def test_author_id_name_collection_returns_collection(self):
        db = DB()
        assert type(db.get_author_id_name_collection()) == pymongo.collection.Collection

    def test_get_author_profile_throws_error(self):
        db = DB()
        config = db.read_db_config()
        del config['author_profile_collection']
        db.config = config

        with pytest.raises(ValueError):
            db.get_author_profile_collection()

    def test_author_profile_collection_returns_collection(self):
        db = DB()
        assert type(db.get_author_profile_collection()) == pymongo.collection.Collection

    def test_get_titles_preprocessed_collection_throws_error(self):
        db = DB()
        config = db.read_db_config()
        del config['titles_preprocessed_collection']
        db.config = config

        with pytest.raises(ValueError):
            db.get_titles_preprocessed_collection()

    def test_get_titles_preprocessed_collection_returns_collection(self):
        db = DB()
        assert type(db.get_titles_preprocessed_collection()) == pymongo.collection.Collection

