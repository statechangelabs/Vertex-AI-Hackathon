# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
from google.auth import credentials
from google.oauth2 import service_account
from google.cloud import aiplatform
# from vertexai.preview.language_models import ChatModel, InputOutputTextPair
# from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
import vertexai
from vertexai.preview.language_models import ChatModel, TextGenerationModel, InputOutputTextPair
import json  # add this line

# Load the service account json file
# Update the values in the json file with your own
with open(
    "credentials.json"
) as f:  # replace 'serviceAccount.json' with the path to your file if necessary
    service_account_info = json.load(f)

my_credentials = service_account.Credentials.from_service_account_info(
    service_account_info
)

# Initialize Google AI Platform with project details and credentials
aiplatform.init(
    credentials=my_credentials,
)

with open("credentials.json", encoding="utf-8") as f:
    project_json = json.load(f)
    project_id = project_json["project_id"]


# Initialize Vertex AI with project and location
vertexai.init(project=project_id, location="us-central1")

chat_model = ChatModel.from_pretrained("chat-bison@001")

parameters = {
        "temperature": 0.5,
        "max_output_tokens": 256,
        "top_p": 0.95,
        "top_k": 40,
    }

chat = chat_model.start_chat(
        context="You are an experience tour guide in Berlin that can answer any questions a tourist might ask.",
    )

response = chat.send_message("my name is sascha I would like to visit berlin can you give me your top 2 recommendations?", **parameters)
print(f"PaLM 2 response: {response.text}")


# # Initialize the FastAPI application
# app = FastAPI()
