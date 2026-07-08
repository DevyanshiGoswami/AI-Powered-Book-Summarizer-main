from flask import Flask, request, jsonify
from app import get_summary,get_title,get_author,get_questions,ansQuestion,getOnequestion
import json
import requests

app = Flask(__name__)
from flask_cors import CORS

CORS(app, origins=['*'], supports_credentials=True)


@app.route('/info/<book>', methods=['GET'])
def info(book):
    response = get_summary(book)
    return jsonify({'data':response})

@app.route('/bookinfo/', methods=['GET'])
def bookinfo():
    title = get_title()
    author=get_author()
    print(f"title:",title)
    print(f"author:",author)

    return jsonify({"title":title,"author":author})

# @app.route('/questions/', methods=['GET'])
# def questions():
#     questions = get_questions().split("\n")
#     print(questions)
#     return jsonify({"q1":questions[0],"q2":questions[1],"q3":questions[2]})

@app.route('/questions/', methods=['GET', 'POST'])
def questions():
    if request.method == 'GET':
        # Handle GET request
        questions = get_questions().split("\n")
        print(questions)
        return jsonify({"q1": questions[0], "q2": questions[1], "q3": questions[2]})
    elif request.method == 'POST':
        r = request.get_json()

        print("POST method called")
        print(r)

        question = r["q"]      # ✅ Read the correct key

        print(question)

        response = ansQuestion(question)   # ✅ Pass only the question string

        print(response)

        return jsonify({"data": response})

@app.route("/cover")
def cover():
    title = request.args.get("title")

    url = f"https://openlibrary.org/search.json?title={title}"

    data = requests.get(url).json()

    if data["docs"]:
        cover_id = data["docs"][0].get("cover_i")

        if cover_id:
            return jsonify({
                "url": f"https://covers.openlibrary.org/b/id/{cover_id}-L.jpg"
            })

    return jsonify({"url": ""})

@app.route('/question/', methods=['GET'])
def question():
    data= getOnequestion()
    print("returrning question",data)
    return jsonify({'q':data})

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8000,debug=True)
