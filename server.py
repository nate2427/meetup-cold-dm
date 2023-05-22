from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import create_links_dict

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/get_links', methods=['POST'])
def get_links():
    """ returns a list of links with member_id, name and link """
    filename = request.json['filename']
    return jsonify(create_links_dict("./chrome_ext/" + filename))


if __name__ == '__main__':
    app.run(debug=True)
