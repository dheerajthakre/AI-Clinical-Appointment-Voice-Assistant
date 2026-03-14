import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./config/db.js";
import voiceRouter, { processVoice } from "./routes/voiceRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/voice", voiceRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("voice-input", async (data) => {
    //socket.emit("processing");
    if (!data || !data.text) return;

    const response = await processVoice(data);

    socket.emit("voice-response", response);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
