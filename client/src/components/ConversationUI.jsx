export default function ConversationUI({ messages }) {

  return (

    <div className="chat-box">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={
            msg.sender === "user"
              ? "user-msg"
              : "bot-msg"
          }
        >

          {msg.text}

        </div>

      ))}

    </div>

  );
}
