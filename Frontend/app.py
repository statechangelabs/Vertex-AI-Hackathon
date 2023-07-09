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

# os.environ["OPENAI_API_KEY"] = "YOUR_OPEN_AI_API_KEY"

template = """Question: {question}

Answer: Let's think step by step."""

# Getting the Hackathon credentials from the environment variable
hack_credentials = os.getenv('credentials')
service_account_info = json.loads(hack_credentials)
hackathon_project_id = service_account_info["project_id"]

hackathon_credentials = service_account.Credentials.from_service_account_info(
    service_account_info
)


# Getting our own account credentials from the environment variable
our_creds = os.getenv('our_creds')
our_service_account_info = json.loads(our_creds)
our_project_id = our_service_account_info["project_id"]

our_credentials = service_account.Credentials.from_service_account_info(
    our_service_account_info
)


template = """Question: {question}

Answer: Let's think step by step."""

# prompt = PromptTemplate(template=template, input_variables=["question"])
# llm = VertexAI(credentials=my_credentials, project=project_id, location="us-central1", model_name="text-bison@001", temperature=0.5, max_output_tokens=1024, top_p=0.95, top_k=40)
# llm_chain = LLMChain(prompt=prompt, llm=llm)
# question = "What NFL team won the Super Bowl in the year Justin Beiber was born?"

# print(llm_chain.run(question))



@cl.langchain_factory(use_async=True)
def factory():
    # prompt = PromptTemplate(template=template, input_variables=["question"])
    # llm_chain = LLMChain(prompt=prompt, llm=OpenAI(temperature=0), verbose=True)
    prompt = PromptTemplate(template=template, input_variables=["question"])
    llm = VertexAI(credentials=hackathon_credentials, project=hackathon_project_id, location="us-central1", model_name="text-bison@001", temperature=0.5, max_output_tokens=1024, top_p=0.95, top_k=40)
    llm_chain = LLMChain(prompt=prompt, llm=llm)


    return llm_chain
