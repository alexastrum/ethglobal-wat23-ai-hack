import { OpenAI } from "langchain/llms/openai";
import run from "./xmtp-bot-starter/src/Runner";

require("dotenv").config();
// functions.logger.write({ severity: "DEBUG", message: "ENV", ...process.env });

const model = new OpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

run(async (context) => {
  const messageBody = context.message.content;
  await context.reply("Thinking...");
  const msg = await model.call(messageBody);
  await context.reply(msg.trim());
});
