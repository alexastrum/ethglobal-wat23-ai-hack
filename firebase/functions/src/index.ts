import * as functions from "firebase-functions";
import { OpenAI } from "langchain/llms/openai";

require("dotenv").config();
// functions.logger.write({ severity: "DEBUG", message: "ENV", ...process.env });

const model = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY || "--",
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    functions.logger.write({
      severity: "DEBUG",
      message: "request",
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // Set CORS headers for preflight requests to allow POSTs from any origin
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    response.set("Access-Control-Max-Age", "3600");

    // Do not cache responses
    response.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );

    if (request.method === "OPTIONS") {
      response.status(204).send("");
      return;
    }

    if (request.method === "GET") {
      response.status(400).send("Please send a POST request");
      const res = await model.call((request.query?.q as string) || "Hello");
      response.send(res);
    } else {
      const msg = await model.call(
        (request.body?.payload as string) || "Hello"
      );
      functions.logger.write({
        severity: "DEBUG",
        message: "request",
        msg: msg.trim(),
      });
      response.status(200).send({ msg });
    }

    // response.send("ok");
  }
);
