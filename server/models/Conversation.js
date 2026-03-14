import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  userId: String,
  role: String,
  text: String,
  language: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Conversation", conversationSchema);
