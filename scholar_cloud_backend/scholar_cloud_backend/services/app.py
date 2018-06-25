from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS
from scholar_cloud_backend.db.db import DB
from scholar_cloud_backend.utils.data_utils import get_tfidf
import operator

app_name = 'scholar_cloud'
app = Flask(app_name)
CORS(app)
db = DB()


@app.route('/top_words/')
def top_words():
    """
    /top_words/ Generates the top words for a given author and
    between given years.

    Request should contain the following parameters


    * author_id
    * from_year
    * to_year
    * limit - Number of top words to return

    """
    author_id = request.args.get('author_id', None)
    from_year = request.args.get('from_year', None)
    to_year = request.args.get('to_year', None)
    limit = request.args.get('limit', 100)
    limit = int(limit)

    if author_id is None or from_year is None or to_year is None:
        response = jsonify({
                        "status": 404,
                        "message": "You have to provide user_name, from_year and to_year "
                                   "in the requests"
                    })
        response.status_code = 404
        return response

    else:
        title_preprocessed_collection = db.get_titles_preprocessed_collection()

        subset_papers = title_preprocessed_collection.find({
                                            'authorId': author_id,
                                            "year": {
                                                "$gte": int(from_year),
                                                "$lte": int(to_year)
                                                }
                                            }).sort([("year", -1)])

        titles = [doc["title"] for doc in subset_papers]
        tfidf_words = get_tfidf(titles)

        tfidf_words = list(sorted(tfidf_words.items(), key=operator.itemgetter(1), reverse=True))
        tfidf_words = tfidf_words[:limit]
        tfidf_words = [{"word": name, "value": value} for name, value in tfidf_words]

        response = jsonify({
            "data": tfidf_words,
            "status": 200
        })
        response.status_code = 200

        return response


@app.route('/get_authors')
def get_authors():
    """
    /get_authors Gets all the authors that are in our database

    """
    db = DB()
    author_id_name_mapping_collection = db.get_author_id_name_collection()
    authors = author_id_name_mapping_collection.find()

    data = [{'name': author['s2_name'], 'id': author['s2_id']} for author in authors]

    response = jsonify({
        "data": data,
        "status": 200
    })
    response.status_code = 200

    return response


@app.route('/get_active_years/')
def get_active_years():
    """
    This gets the year of the first publication
    and the year of the last publication for a scholar

    """
    author_id = request.args.get('author_id')

    if author_id is None:
        response = jsonify({
            "status": 404,
            "message": "You have to provide author_id"
                       "in the requests"
        })
        response.status_code = 404
        return response

    else:
        title_preprocessed_collection = db.get_titles_preprocessed_collection()
        subset_papers = list(title_preprocessed_collection.find({
            'authorId': author_id,
        }).sort([("year", -1)]))

        subset_papers_len = len(subset_papers)

        to_year = subset_papers[0]["year"]
        from_year = subset_papers[subset_papers_len - 1]["year"]

        response = jsonify({
            "from_year": from_year,
            "to_year": to_year,
            "status": 200
        })
        response.status_code = 200

        return response


if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)