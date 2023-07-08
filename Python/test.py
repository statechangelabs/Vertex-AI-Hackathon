from google.cloud import storage
from google.oauth2.service_account import Credentials
from google.cloud import aiplatform
import vertexai
from vertexai.preview.language_models import ChatModel, TextGenerationModel, InputOutputTextPair
import google.generativeai as palm
import json


with open ('./credentials.json') as f:
    creds = json.load(f)
    
# Define your credentials
# credentials = Credentials.from_service_account_file('./credentials.json')
palm.configure(api_key=creds)

model_list = [_ for _ in palm.list_models()]
for model in model_list:
    print(model.name)

# response = palm.chat(messages=["Hello."])
# print(response.last) #  'Hello! What can I help you with?'
# response.reply("Can you tell me a joke?")


# vertexai.init(project='ghc-010', location='us-central1')
# # aiplatform.Client(credentials=credentials)


# # Now you can use the `client` to interact with your Google Cloud Storage

# chat_model = ChatModel.from_pretrained("chat-bison@001")

# parameters = {
#         "temperature": 0.5,
#         "max_output_tokens": 256,
#         "top_p": 0.95,
#         "top_k": 40,
#     }

# chat = chat_model.start_chat(
#         context="You are an experience tour guide in Berlin that can answer any questions a tourist might ask.",
#     )

# response = chat.send_message("my name is sascha I would like to visit berlin can you give me your top 2 recommendations?", **parameters)
# print(f"PaLM 2 response: {response.text}")


# model = TextGenerationModel.from_pretrained("text-bison@001")
# def get_completion(prompt_text):
#     response = model.predict(
#         prompt_text,
#         max_output_tokens=1000,
#         temperature=0.3
#     )
#     return response.text
# prompt = f"""
# Write a blog post on renewable energy. Limit the number of words to 500.
# Format the output in HTML.
# """
# response=get_completion(prompt)
# print(response)
# from IPython.display import display, HTML
# display(HTML(response))

