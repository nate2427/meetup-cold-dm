from flask import Flask, request, jsonify
from utils import get_links_from_pdf

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/get_links', methods=['POST'])
def get_links():
    # filename = request.json['filename']
    return jsonify(get_links_from_pdf())


if __name__ == '__main__':
    app.run(debug=True)
