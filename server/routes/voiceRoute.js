import express from "express";
import { runLLM } from "../services/llmService.js";
import Conversation from "../models/Conversation.js";
import { runAgent } from "../agent/voiceAgent.js";

const router = express.Router();


//Voice endpoint

router.post("/", async (req, res) => {
  try {

    const { text, language } = req.body;

    const response = await runLLM(text, language);

    res.json(response);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Voice processing failed"
    });

  }
});


//Socket handler

export async function processVoice(data) {

  /*const { text, language } = data;

  const result = await runLLM(text, language);

  return result;*/
  const { text, language = "en" } = data;

  await Conversation.create({
    userId: "patient123",
    role: "user",
    text,
    language
  });

  const result = await runAgent(text);

  await Conversation.create({
    userId: "patient123",
    role: "assistant",
    text: result.text
  });

  return result;

}

export default router;
