// Import the Cloud Speech-to-Text library
import { v2 } from "@google-cloud/speech";
// const fs = require('fs');
import { promises } from "fs";
import { Args, Command, Flags } from "@oclif/core";
import { Storage } from "@google-cloud/storage";
import { basename } from "path";
export default class Convert extends Command {
  static description = "Convert to audio";

  static examples = [
    `$ oex convert video.mp4 audio.mp3
    `,
  ];

  // static flags = {
  //   from: Flags.string({char: 'f', description: 'Who is saying hello', required: true}),
  // }

  static args = {
    source: Args.string({
      description: "key in gc to convert",
      required: true,
    }),
    destination: Args.string({
      description: "file to generate",
      required: false,
      default: "./output.mp3",
    }),
  };

  async run() {
    // Instantiates a client
    const {
      args: { source },
    } = await this.parse(Convert);
    const credentials = await promises.readFile("./vcredentials.json", "utf-8");
    console.log("Getting clinet");
    const client = new v2.SpeechClient({
      keyFilename: "./vcredentials.json",
      apiEndpoint: "us-central1-speech.googleapis.com",
    });
    const bucketName = "scp-vertex-audio";
    // Your local audio file to transcribe
    const audioFilePath = `gs://${bucketName}/${source}`;
    // Full recognizer resource name

    const recognizerName =
      "projects/287955880258/locations/us-central1/recognizers/english-recognizer";
    // The output path of the transcription result.
    const workspace = `gs://${bucketName}/transcripts`;

    const recognitionConfig = {
      autoDecodingConfig: {},
    };

    const audioFiles = [{ uri: audioFilePath }];
    const outputPath = {
      gcsOutputConfig: {
        uri: workspace,
      },
    };

    let to: ReturnType<typeof setInterval> | undefined = undefined;
    const transcriptionRequest = {
      recognizer: recognizerName,
      config: recognitionConfig,
      files: audioFiles,
      recognitionOutputConfig: outputPath,
    };
    const startProcessingTime = Date.now();
    console.log("Start processing", new Date().toLocaleString());
    const process = await client.batchRecognize(transcriptionRequest);
    const firstProcess = process[0];

    to = setInterval(() => {
      console.log(
        "Processing",
        new Date().toLocaleString(),
        firstProcess.metadata && (firstProcess.metadata as any).progressPercent
      );
    }, 10000);
    await firstProcess.promise();
    const processingDuration = Date.now() - startProcessingTime;
    console.log("Processing duration", processingDuration);
    clearInterval(to);
    // console.log("Processed", firstProcess);
    const result = (firstProcess.result as any).results[audioFiles[0].uri].uri;
    console.log("Result is", result);
    const url = new URL(result);
    const path = url.pathname.substring(1);
    console.log("My path from that is ", path);
    const sc = new Storage({ credentials: JSON.parse(credentials) });
    const bucket = sc.bucket(bucketName);
    const file = bucket.file(path);
    const exists = await file.exists();
    if (!exists[0]) {
      console.log("File does not exist");
      return;
    }
    const destination = basename(source) + ".json";
    await file.download({ destination });
    console.log("File downloaded", source, destination);
  }
}
