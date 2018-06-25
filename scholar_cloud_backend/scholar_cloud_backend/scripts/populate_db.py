import click
import os
import json
from scholar_cloud_backend.db.db import DB
from scholar_cloud_backend.utils.data_utils import create_authors_id_mapping, create_author_profile, \
    create_preprocessed_titles


@click.command()
@click.option('--corpus_filepath', default=os.path.join('..', 'data/sample-s2-records.json'),
              help="Enter the full path for the sample file downloaded from Semantic Scholar. "
                   "labs.semanticscholar.org/corpus/")
def populate_db(corpus_filepath):
    if not os.path.isfile(corpus_filepath):
        raise FileNotFoundError("We could not find the path of the corpus file that you specified")

    db = DB()
    papers_collection = db.get_papers_collection()
    with open(corpus_filepath, 'r') as fp:
        for doc in fp:
            json_doc = json.loads(doc)
            papers_collection.insert_one(json_doc)

    create_authors_id_mapping()
    create_author_profile()
    create_preprocessed_titles()
