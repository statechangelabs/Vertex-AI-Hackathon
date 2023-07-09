import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { Args, Command, Flags } from "@oclif/core";
import { existsSync, promises, readFileSync, renameSync } from "fs";
import { v2, SpeechClient } from "@google-cloud/speech";
import { Bucket, Storage } from "@google-cloud/storage";
import { GoogleAuth } from "google-auth-library";
import { execSync, spawnSync } from "child_process";
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
    source: Args.string({ description: "file to convert", required: true }),
    destination: Args.string({
      description: "file to generate",
      required: false,
      default: "./output.mp3",
    }),
  };

  async run() {
    console.log("Getting starting test");
    const {
      args: { source, destination },
      flags,
    } = await this.parse(Convert);
    // const ffmpegInstance = createFFmpeg({ log: true });
    // console.log("a");
    // await ffmpegInstance.load();
    // console.log("b");
    if (!existsSync(source)) {
      this.logToStderr(`File ${source} does not exist`);
      return;
    }

    console.log("I am working wouth a source mp4 file", source);
    // ffmpegInstance.FS("writeFile", "source.mp4", await fetchFile(source));
    console.log("I am working wouth a source mp4 file 2", source);
    spawnSync(
      "ffmpeg",
      [
        "-i",
        source,
        "-vn",
        "-ar",
        "44100",
        "-ac",
        "2",
        "-b:a",
        "192k",
        //   "-o",
        "./__temp.mp3",
      ],
      { stdio: "inherit" }
    );
    // const authClient = new AuthClient({credentials: './credentials.json'}})
    // this.log("Finished running wasm ffmpeg");
    renameSync("__temp.mp3", destination);
    // await promises.writeFile(
    //   destination,
    //   ffmpegInstance.FS("readFile", "output.mp3")
    // );
    //     const credentials = JSON.parse(
    //       await promises.readFile("./credentials.json", "utf-8")
    //     );
    //     const vcredentials = JSON.parse(
    //       await promises.readFile("./vcredentials.json", "utf-8")
    //     );
    //     const bucketName = "scp-vertex-audio";
    //     const storage = new Storage({ credentials: vcredentials });
    //     let bucket = storage.bucket(bucketName);
    //     // try {
    //     //   const existArr = await bucket.exists();
    //     //   this.log("Output of bucket.exists", existArr);
    //     //   if (!existArr[0]) {
    //     //     await storage.createBucket(bucketName);
    //     //     bucket = storage.bucket(bucketName);
    //     //   }
    //     // } catch (e) {
    //     //   await storage.createBucket(bucketName);
    //     //   bucket = storage.bucket(bucketName);
    //     // }
    //     console.log("making bucket public");
    //     // await bucket.makePublic();
    //     console.log("bucket is public");
    //     console.log("saving file to bucket");
    //     const file = bucket.file("output.mp3");
    //     // await file.save(await promises.readFile("output.mp3"));
    //     console.log("saved file to bucket");

    //     const sc = new SpeechClient({ credentials: vcredentials });
    //     const sc2 = new v2.SpeechClient({
    //       keyFile: "./vcredentials.json",
    //       projectId: "vertex-hackathon",
    //     });
    //     console.log("Creating a recognizer");

    //     // const [recognizerOperation] = await sc.createRecognizer({
    //     //   parent: "projects/vertex-hackathon/locations/global",
    //     //   // parent: "projects/ghc-010/locations/global",
    //     //   recognizer: { model: "latest_long", languageCodes: ["en-US"] },
    //     //   recognizerId: "abc123",
    //     // });
    //     // console.log("Created recognizer promise", "recognizerOperation.name");
    //     // await recognizerOperation.promise();
    //     // console.log(
    //     //   "finished  recognizer creation promise",
    //     //   recognizerOperation.name
    //     // );

    //     // await sc.initialize();
    //     // const output = await sc.longRunningRecognize({
    //     //   audio: { uri: `gs://${bucketName}/output.mp3` },
    //     //   config: {
    //     //     languageCode: "en-US",
    //     //     // model: "chirp-rnnt",
    //     //   },
    //     //   outputConfig: { gcsUri: `gs://${bucketName}/output.json` },
    //     // });
    //     // console.log("Getting output", output);

    //     // const result = await output[0].promise();
    //     // console.log("Got output", result);
    //     // const [firstResult] = result;
    //     // console.log("Got first result", firstResult);

    //     const responses = await sc2.batchRecognize({
    //       files: [
    //         {
    //           uri: `gs://${bucketName}/output.mp3`,
    //         },
    //       ],
    //       recognizer:
    //         "projects/287955880258/locations/us-central1/recognizers/english-recognizer",
    //       recognitionOutputConfig: {
    //         gcsOutputConfig: { uri: `gs://${bucketName}/output2.json` },
    //       },
    //     });
    //     console.log("Hi this was the bacth recognize response", responses);
    //     await bucket.file("output.json").download({
    //       destination: "output.json",
    //     });
    //     console.log("I got some responses", responses);
    //     // // const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n')
    this.log(`Converted ${source} to ${destination}`);
    return;
  }
}
