import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const SYSTEM_PROMPT = `
You are a healthcare voice assistant for a digital clinic.

Your responsibilities:
- Book doctor appointments
- Reschedule appointments
- Cancel appointments
- Check doctor availability

Supported languages:
English, Hindi, Tamil

Conversation rules:
- Keep responses under 20 words
- Ask only one question at a time
- Be polite and concise
- Continue the conversation in the user's language
- Never invent appointment slots

Goal:
Help patients quickly schedule or manage their appointments through natural conversation.
`;

export async function runLLM(userText, language = "en") {

  try {

    const start = Date.now();

    const response = await groq.chat.completions.create({

      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: userText
        }
      ]

    });

    const latency = Date.now() - start;

    console.log("LLM latency:", latency, "ms");

    return {
      text: response.choices[0].message.content,
      latency
    };

  } catch (error) {

    console.error("LLM Error:", error.message);

    return {
      text: "Sorry, I couldn't process your request.",
      latency: 0
    };

  }

}

