import scholar_cloud_backend.constants as constants
from scholar_cloud_backend.db.db import DB
import requests
import time
from tqdm import tqdm
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np


FILEPATHS = constants.FILEPATHS
CONFIGS_DIR = FILEPATHS["CONFIG_DIR"]

SS_API = constants.SS_API
SS_AUTHOR_API = SS_API['SS_AUTHOR_API']


def create_authors_id_mapping(db_config_filename="db_config.json"):
    """
       Reads the data from MONGODB and
       creates another collection that contains the mapping from
       author_id -> author_mapping

       * *This method ideally has to be called only once.*
       * *If you call it multiple times, the MONGODB collection will be udpated with the new ids
         and names.*

       :param db_config_filename: DB configuration filename
       :type db_config_filename: str
    """

    db = DB(config_filename=db_config_filename)
    papers_collection = db.get_papers_collection()
    author_id_name_collection = db.get_author_id_name_collection()
    papers = papers_collection.find()

    author_id_mapping = {}
    for paper in papers:
        authors = paper['authors']
        for author in authors:
            author_name = author['name']
            ids = author['ids']  # We will always take the first id found
            if not len(ids) > 0:
                continue
            else:
                author_id = ids[0]

            # Here we overwrite if the id is already there. We do not check
            # whether the id already exists in the dictionary
            if not author_id_name_collection.find_one({'s2_id': author_id}):
                author_id_mapping[author_id] = author_name

    author_id_collection = [{'s2_id': author_id, 's2_name': author_name}
                            for author_id, author_name in author_id_mapping.items()]

    if len(author_id_collection) > 0:
        author_id_name_collection.insert_many(author_id_collection)


def create_author_profile(db_config_filename="db_config.json"):
    """
    Get all the papers written by the all the users in our database
    This connects to the Semantic Scholar API (`/author` end point)
    and gets information like Citation Velocity and all the papers written
    by the author and writes it to a separate MONGODB collection 
    

    :param db_config_filename:  DB configuration file
    :type db_config_filename: str
    """
    db = DB(config_filename=db_config_filename)
    author_id_name_collection = db.get_author_id_name_collection()
    author_profile_collection = db.get_author_profile_collection()

    author_id_name_docs = author_id_name_collection.find(no_cursor_timeout=True)
    for author_id_name in tqdm(author_id_name_docs,
                               total=author_id_name_collection.count()):
        author_id = author_id_name['s2_id']

        # Skip if the author's profile is already present
        if author_profile_collection.find_one({'authorID': author_id}):
            continue

        response = requests.get(SS_AUTHOR_API + author_id)
        if response.status_code == requests.codes.ok:
            response_json = response.json()
            author_profile_collection.insert_one(response_json)

        # sleep before making further api calls
        time.sleep(1)


def create_preprocessed_titles(db_config_filename="db_config.json"):
    """
    This is used to preprocess the titles of all the papers belonging to the author

    :param db_config_filename: DB configuration file
    :type db_config_filename: str
    """
    nlp = spacy.load('en')
    db = DB(config_filename=db_config_filename)
    author_profile_collection = db.get_author_profile_collection()
    titles_preprocessed_collection = db.get_titles_preprocessed_collection()
    author_profiles = author_profile_collection.find()

    for author_profile in tqdm(author_profiles, total=author_profile_collection.count(),
                               desc="Pre processing author paper titles"):
        s2_id = author_profile['authorId']
        papers = author_profile['papers']
        if titles_preprocessed_collection.find_one({'authorId': s2_id}):
            continue
        for paper in papers:
            title = paper['title']
            year = paper['year']

            if not year:
                continue

            # Pre-processing
            title = title.strip()
            title = title.replace("\n", "")
            title = title.replace("\t", " ")
            title = title.lower()

            # remove stop words
            doc = nlp(title)
            tokens = [token for token in doc]
            title = filter(lambda token: not token.is_stop, tokens)
            title = [token.text for token in list(title)]
            title = ' '.join(title)

            titles_preprocessed_collection.insert_one({
                "title": title,
                "year": year,
                "authorId": s2_id
            })


def get_tfidf(corpus):
    """

    :param corpus: The set of documents from which tfidf values needs to be calculated
    :type corpus: List[str]
    :return: dict {word: tfidf_value}
    """
    vectorizer = TfidfVectorizer()
    try:
        td_matrix = vectorizer.fit_transform(corpus)  # The term document sparse matrix
    except ValueError:
        return {}

    td_matrix = np.array(td_matrix.todense())

    feature_names = vectorizer.get_feature_names()
    num_words = len(feature_names)

    tfidf_words = {}
    for i in range(num_words):
        tfidf_values = td_matrix[:, i]
        tfidf_value = float(tfidf_values[tfidf_values.nonzero()][0])
        tfidf_value = round(tfidf_value, 2)
        tfidf_words[feature_names[i]] = tfidf_value

    return tfidf_words


if __name__ == '__main__':
    create_author_profile()
