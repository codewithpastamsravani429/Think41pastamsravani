from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/messages", methods=["POST"])
def chatbot_response():
    data = request.get_json()
    message = data.get("message", "")
    reply = f"You said: {message}"  # Basic echo reply — can be improved
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)