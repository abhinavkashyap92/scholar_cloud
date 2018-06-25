import click
import scholar_cloud_backend.constants as constants
import os
import json
ROOT_DIR = constants.ROOT


@click.command()
def setup_db_config():
    db_url = click.prompt('Enter a db url', type=str, default='localhost')
    db_port = click.prompt('Enter a db port', type=str, default='27017')
    db_name = click.prompt('Enter a db name', type=str, default='scholar_cloud')
    s2_papers_collection = click.prompt('Enter a name for collection where we store '
                                        'the information from initially downloaded '
                                        'file from semantic scholr', type=str,
                                        default='s2_papers')
    author_id_name_collection = click.prompt('Enter a name for collection where we '
                                             'store the author id and author name.'
                                             'This is automatically generated',
                                             type=str, default="author_id_name")
    author_profile_collection = click.prompt('Enter a name for collection where we store '
                                             'all the information about a author including'
                                             'his papers, citation velocity etc',
                                             type=str, default='author_profile')
    titles_preprocessed_collection = click.prompt('Enter a name for the collection where we '
                                                  'preprocess the author titles to for easy '
                                                  'calculation of tf-idf later', type=str,
                                                  default='titles_preprocessed')

    if not os.path.isdir(os.path.join(ROOT_DIR, 'configs')):
        os.mkdir(os.path.join(ROOT_DIR, 'configs'))

    with open(os.path.join(ROOT_DIR, 'configs', 'db_config.json'), 'w') as fp:
        json.dump({
            'url': db_url,
            'port': db_port,
            'db': db_name,
            's2_papers_collection': s2_papers_collection,
            'author_id_name_collection': author_id_name_collection,
            'author_profile_collection': author_profile_collection,
            'titles_preprocessed_collection': titles_preprocessed_collection
        }, fp, indent=4)
