// Import the Cloud Speech-to-Text library
import { v2 } from "@google-cloud/speech";
// const fs = require('fs');
import { promises } from "fs";
import { Args, Command, Flags } from "@oclif/core";
import { Storage } from "@google-cloud/storage";
import { basename } from "path";

import fetch from "node-fetch";
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
      description: "local file to read",
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
    console.log("working with current directory", process.cwd());
    const text = await promises.readFile(source, "utf-8");
    const json = JSON.parse(text) as {
      results: {
        alternatives: {
          transcript: string;
          words: { startOffset: string; endOffset: string; word: string }[];
        }[];
      }[];
    };
    const sc = new Storage({
      credentials: JSON.parse(
        await promises.readFile("./vcredentials.json", "utf-8")
      ),
    });
    let batch: string[] = [];
    const MAX_LENGTH = 5;
    const manageBatch = async (batch: string[], counter: number) => {
      const documents = batch;
      const embedEndpoint =
        "https://python-zoiedlljwa-uc.a.run.app/get_embeddings";
      const response = await fetch(embedEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents }),
      });
      if (response.status === 200) {
        const json = (await response.json()) as { embeddings: number[][] };
        // this.log(JSON.stringify(json.embeddings, null, 2));
        this.log("Got a batch of embeddings", json.embeddings.length);

        //i know my source, my embeddings, and the original text
        //so lets generate json and then upload it all to the bucket
        const bucket = sc.bucket("vertexai-hackathon-embeddings");
        const filename = `batch_root/embeddings-${basename(
          source
        )}-${counter}.json`;
        const file = bucket.file(filename);
        let lines = [];
        for (let i = 0; i < json.embeddings.length; i++) {
          const embedding = json.embeddings[i];
          const document = documents[i];
          let obj = {
            id: `${basename(source)}-${counter}-${i}`,
            source,
            embedding,
            document,
          };
          lines.push(JSON.stringify(obj));
        }
        await file.save(lines.join("\n"));
        console.log("Saved file ", filename);
      } else {
        //oh fudge
        this.logToStderr("Error getting embeddings");
        return;
      }
    };
    let counter = 0;
    for (const result of json.results) {
      const transcript = result.alternatives[0].transcript;
      batch.push(transcript);

      if (batch.length == MAX_LENGTH) {
        await manageBatch(batch, counter++);
        batch = [];
      }
    }
    if (batch.length > 0) {
      await manageBatch(batch, counter);
    }

    // const endpoints = await esc.listEndpoints();
    // console.log("Endpoints", endpoints);
  }
}
