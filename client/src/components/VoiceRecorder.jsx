import { useState } from "react";
import socket from "../services/socket";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-IN";

export default function VoiceRecorder({ onUserSpeech }) {

  const [listening, setListening] = useState(false);

  const startListening = () => {

    recognition.start();
    setListening(true);

  };

  recognition.onresult = (event) => {

    /*const transcript = event.results[0][0].transcript;

    onUserSpeech(transcript);

    socket.emit("voice-input", {
      text: transcript
    });

    setListening(false);*/
    const result = event.results[event.resultIndex];

  if (!result.isFinal) return;

  const transcript = result[0].transcript;

  onUserSpeech(transcript);

  socket.emit("voice-input", {
    text: transcript
  });

  setListening(false);

  };

  return (
    <div>

      <button onClick={startListening}>
        {listening ? "Listening..." : " Speak"}
      </button>

    </div>
  );
}
