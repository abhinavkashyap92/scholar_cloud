"""
All the constants required for the project
"""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

FILEPATHS = dict(
    DATA_DIR=os.path.join(ROOT, 'data'),
    CONFIG_DIR=os.path.join(ROOT, 'configs'),
)

SS_API = dict(
    SS_AUTHOR_API="http://api.semanticscholar.org/v1/author/"
)
