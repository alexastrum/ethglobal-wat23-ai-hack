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
    functions.logger.info("Model", model.openAIApiKey);
    // response.send("ok");

    const res = await model.call((request.query.q as string) || "Hello");
    response.send(res);
  }
);
