import os

from flask import Flask, request, jsonify
import json
from google.oauth2 import service_account
from langchain.embeddings import VertexAIEmbeddings


app = Flask(__name__)


@app.route("/")
def hello_world():
    """Example Hello World route."""
    name = os.environ.get("NAME", "World")
    return f"Hello {name}!"


@app.route('/perform_operation', methods=['POST'])
def perform_operation():
    # Extract the JSON from the POST request
    data = request.get_json()

    # Get the numbers and the operation from the JSON
    num1 = data['num1']
    num2 = data['num2']
    operation = data['operation']

    # Perform the operation and get the result
    if operation == 'add':
        result = num1 + num2
    elif operation == 'subtract':
        result = num1 - num2
    elif operation == 'multiply':
        result = num1 * num2
    elif operation == 'divide':
        if num2 != 0: # to avoid division by zero
            result = num1 / num2
        else:
            return jsonify({"error": "Division by zero is not allowed"}), 400
    else:
        return jsonify({"error": "Invalid operation"}), 400

    # Return the result as JSON
    return jsonify({'result': result})


@app.route('/get_embeddings', methods=['POST'])
def get_embeddings():
    credentials = os.getenv('credentials')
    service_account_info = json.loads(credentials)
    project_id = service_account_info["project_id"]

    my_credentials = service_account.Credentials.from_service_account_info(
        service_account_info
    )

    embeddings = VertexAIEmbeddings(credentials=my_credentials, project=project_id)

    data = request.get_json()
    
    documents = data['documents']

    doc_result = embeddings.embed_documents(documents)
    print(len(doc_result[0]))
    
    return jsonify({'embeddings': doc_result})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))