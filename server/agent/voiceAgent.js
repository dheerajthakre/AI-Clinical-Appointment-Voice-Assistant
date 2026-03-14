import { bookAppointment } from "../tools/bookingTools.js";
import { runLLM } from "../services/llmService.js";

export async function runAgent(userText) {

  const prompt = `
Classify the user intent.

User: ${userText}

Return ONLY one:
BOOK
RESCHEDULE
CANCEL
CHAT
`;

  const ai = await runLLM(prompt);

  const intent = ai.text.trim();

  if (intent === "BOOK") {

    return await bookAppointment(
      "patient123",
      "general physician",
      new Date()
    );

  }

  return await runLLM(userText);
}

/*import { bookAppointment } from "../tools/bookingTools.js";
import { runLLM } from "../services/llmService.js";

export async function runAgent(userText) {

  const prompt = `
You are a healthcare voice assistant.

Rules:
- Keep responses under 20 words
- Ask only one question at a time
- Support English, Hindi, Tamil

Capabilities:
- book appointment
- reschedule
- cancel

User: ${userText}

If user wants booking return:
INTENT:BOOK

If normal conversation return:
INTENT:CHAT

Response:
`;

  const aiResponse = await runLLM(prompt);

  // TOOL CALL
  if (aiResponse.includes("INTENT:BOOK")) {

    const result = await bookAppointment(
      "patient123",
      "general physician",
      new Date()
    );

    return result;
  }

  return aiResponse;
}*/
