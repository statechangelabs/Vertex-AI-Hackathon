import os

from google.cloud.speech_v2 import SpeechClient
from google.cloud.speech_v2.types import cloud_speech
from google.oauth2.service_account import Credentials

import json

with open(
    "credentials.json", encoding="utf-8"
) as f:  # replace 'serviceAccount.json' with the path to your file if necessary
    service_account_info = json.load(f)
    project_id = service_account_info["project_id"]


service_account_info = json.load(open('credentials.json'))
creds = Credentials.from_service_account_info(
    service_account_info)

# Instantiates a client
client = SpeechClient(credentials = creds)

# The output path of the transcription result.
workspace = "gs://scp-vertex-audio/transcripts"

# The name of the audio file to transcribe:
gcs_uri = "gs://scp-vertex-audio/output.mp3"

# Recognizer resource name:
name = "projects/287955880258/locations/us-central1/recognizers/english-recognizer"



config = cloud_speech.RecognitionConfig(
  auto_decoding_config={},
)

output_config = cloud_speech.RecognitionOutputConfig(
  gcs_output_config=cloud_speech.GcsOutputConfig(
    uri=workspace),
)

files = [cloud_speech.BatchRecognizeFileMetadata(
    uri=gcs_uri
)]

request = cloud_speech.BatchRecognizeRequest(
    recognizer=name, config=config, files=files, recognition_output_config=output_config
)
operation = client.batch_recognize(request=request)
print(operation.result())