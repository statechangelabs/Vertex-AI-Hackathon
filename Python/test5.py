import os
from langchain import PromptTemplate, OpenAI, LLMChain
import chainlit as cl
from google.auth import credentials
from google.oauth2 import service_account
from google.cloud import aiplatform
import vertexai
from vertexai.preview.language_models import ChatModel, TextGenerationModel, InputOutputTextPair
import json  # add this line

from langchain.chat_models import ChatVertexAI
from langchain.llms import VertexAI
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.schema import HumanMessage, SystemMessage
from langchain import PromptTemplate, LLMChain

from langchain.vectorstores import MatchingEngine


with open(
    "vertex-hackathon-creds.json", encoding="utf-8"
) as f:  # replace 'serviceAccount.json' with the path to your file if necessary
    service_account_info = json.load(f)
    project_id = service_account_info["project_id"]


our_credentials = service_account.Credentials.from_service_account_info(
    service_account_info
)




def create_deploy_endpoint():
    my_index_endpoint = aiplatform.MatchingEngineIndexEndpoint.create(
        credentials=our_credentials,
        display_name=f"public-test-endpoint",
        public_endpoint_enabled = True,
    )
    
    my_index_endpoint = my_index_endpoint.deploy_index(
    index='vertexai_test_index', deployed_index_id='4847060671608651776'
    )

    print("Deployed indices are:", my_index_endpoint.deployed_indexes)
    print("Deployed index endpoint is:", my_index_endpoint)
    return my_index_endpoint

create_deploy_endpoint()