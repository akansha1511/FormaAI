from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    prompt = data.get("prompt", "")

    response = {
        "success": True,
        "title": "Generated Form",
        "fields": [
            {
                "label": "Full Name",
                "type": "text",
                "required": True
            }
        ]
    }

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True, port=5001)