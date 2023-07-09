import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Args, Command, Flags } from "@oclif/core";
import { existsSync, promises, readFileSync, renameSync } from "fs";
import { v2, SpeechClient } from "@google-cloud/speech";
import { Bucket, Storage } from "@google-cloud/storage";
import { GoogleAuth } from "google-auth-library";
import { execSync, spawnSync } from "child_process";
import {} from "@google-cloud/aiplatform";

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
    source: Args.string({ description: "file to analyze", required: true }),
    destination: Args.string({
      description: "file to generate",
      required: false,
      default: "",
    }),
  };

  async run() {
    const {
      args: { source, destination },
    } = await this.parse(Convert);
    const obj = JSON.parse(await promises.readFile(source, "utf-8")) as {
      results: {
        alternatives: { transcript: string }[];
      }[];
    };
    console.log(obj);
    // const client = new EndpointServiceClient({
    //   apiEndpoint: "us-central1-aiplatform.googleapis.com",
    //   credentials: JSON.parse(
    //     await promises.readFile("./credentials.json", "utf-8")
    //   ),
    // });
    const parsedDestination = destination
      ? destination
      : source.replace(".json", ".txt");
    // for (const result of obj.results) {
    //   const { transcript } = result.alternatives[0];
    //   console.log(transcript);
    //   const [response] = await client.({});
    // }
    //#region write to file
    const compiledTranscript = obj.results.reduce((acc, curr) => {
      return acc + curr.alternatives[0].transcript;
    }, "");
    await promises.writeFile(parsedDestination, compiledTranscript);
    //#endregion
  }
}
