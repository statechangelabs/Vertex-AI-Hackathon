import { Args, Command, Flags } from "@oclif/core";
import { existsSync, promises, readFileSync, renameSync } from "fs";
import { Bucket, Storage } from "@google-cloud/storage";
import { basename } from "path";
export default class Upload extends Command {
  static description = "Convert to audio";

  static examples = [
    `$ oex convert video.mp4 audio.mp3
    `,
  ];

  static args = {
    source: Args.string({
      description: "file to upload",
      required: true,
    }),
    destination: Args.string({
      description: "key to generate",
      required: false,
    }),
  };

  async run() {
    // Instantiates a client
    const {
      args: { source, destination },
      flags,
    } = await this.parse(Upload);

    const parsedDestination = destination ? destination : basename(source);

    const credentials = await promises.readFile("./vcredentials.json", "utf-8");

    const sc = new Storage({
      credentials: JSON.parse(credentials),
    });
    const bucket = sc.bucket("scp-vertex-audio");
    const file = bucket.file(parsedDestination);
    const exists = await file.exists();
    if (exists[0]) {
      console.log("File already exists");
      return;
    }
    await file.save(readFileSync(source));
    console.log("File uploaded", source, parsedDestination);
  }
}
