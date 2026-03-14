import { useState, useEffect } from "react";
import VoiceRecorder from "./components/VoiceRecorder";
import ConversationUI from "./components/ConversationUI";
import socket from "./services/socket";

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const handleResponse = (data) => {

    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: data.text }
    ]);

    speak(data.text);

  };

  socket.on("voice-response", handleResponse);

  return () => {
    socket.off("voice-response", handleResponse);
  };
    /*socket.on("voice-response", (data) => {

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.text }
      ]);

      speak(data.text);

    });*/

  }, []);

  const handleUserSpeech = (text) => {

    setMessages((prev) => [
      ...prev,
      { sender: "user", text }
    ]);

  };

  const speak = (text) => {

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";

    window.speechSynthesis.speak(speech);

  };

  return (

    <div className="app">

      <h1>
        AI Clinical Appointment Assistant
      </h1>

      <ConversationUI messages={messages} />

      <VoiceRecorder
        onUserSpeech={handleUserSpeech}
      />

    </div>

  );
}

export default App;
