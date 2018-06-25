from scholar_cloud_backend.utils.data_utils import create_authors_id_mapping
from scholar_cloud_backend.utils.data_utils import create_preprocessed_titles
from scholar_cloud_backend.utils.data_utils import get_tfidf
from scholar_cloud_backend.db.db import DB
import scholar_cloud_backend.constants as constants

FILEPATHS = constants.FILEPATHS
CONFIG_DIR = FILEPATHS["CONFIG_DIR"]


class TestCreateAuthorsIdMapping:
    def test_author_id_collection_is_filled(self):
        """
        Make sure that author_id -> author_name MONGODB collection is getting filled
        """
        db = DB()
        collection = db.get_author_id_name_collection()
        create_authors_id_mapping()

        assert collection.count() > 0

    def test_author_id_is_not_none(self):
        """
        Test to make sure that all the author ids are valid in the author_id -> author_name
        collection
        """
        db = DB()
        collection = db.get_author_id_name_collection()
        author_id_names = collection.find()
        author_ids = [doc['s2_id'] for doc in author_id_names]
        assert None not in author_ids

    def test_name_is_not_none(self):
        """
        Test to make sure that all the author names are valid in the author_id -> author_name
        collection
        """

        db = DB()
        collection = db.get_author_id_name_collection()
        author_id_names = collection.find()
        author_names = [doc['s2_name'] for doc in author_id_names]
        assert None not in author_names


class TestCreateAuthorProfile:
    def test_author_profile_collection_is_filled(self):
        """
        Test whether the author_profile collections is filled
        """
        db = DB()
        author_profile_collection = db.get_author_profile_collection()

        assert author_profile_collection.count() > 0


class TestCratePreProcessedTitles:
    def test_preprocessed_titles_is_filled(self):
        """
        Test whehter the titles_preprocessed collection is not empty
        """
        db = DB()
        pre_processed_collection = db.get_titles_preprocessed_collection();

        create_preprocessed_titles()

        assert pre_processed_collection.count() > 0


class TestGetTfIdf:
    def test_num_words(self):
        """
        Test whether the function is returning the values for all the words in the corpus

        """
        corpus = ["This is the document"]
        tfidf_words = get_tfidf(corpus)
        assert len(tfidf_words.keys()) == 4

    def test_empty_corpus(self):
        """
        Test whether the function return an empty dictionary in case the corpus is []

        """
        corpus = []
        tfidf_words = get_tfidf(corpus)
        assert len(tfidf_words.keys()) == 0

    def test_keys_are_strings(self):
        """
        Test whether the function satisfies the contract that it return a dictionary of {str: numbers}
        """
        corpus = ["This is the first document", "This is the second document"]
        tfidf_words = get_tfidf(corpus)
        assert all(map(lambda word: type(word) == str, tfidf_words.keys()))

    def test_values_are_numbers(self):
        """
            Test whether the function satisfies the contract that it return a dictionary of {str: numbers}
        """
        corpus = ["This is the first document", "This is the second document"]
        tfidf_words = get_tfidf(corpus)
        assert all(map(lambda value: type(value) == float, tfidf_words.values()))
