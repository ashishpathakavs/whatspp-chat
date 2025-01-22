import { useEffect, useState } from "react";
import "./styles.css";

const RecievedMsg = [
  "Recieved Msg 1",
  "Recieved Msg 2",
  "Recieved Msg 3",
  "Recieved Msg 4",
  "Recieved Msg 5",
  "Recieved Msg 6",
];

export default function App() {
  return (
    <div className="App">
      <Chat />
    </div>
  );
}

function Chat() {
  const [draftMsg, setDraftMsg] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomId = Math.floor(Math.random() * (RecievedMsg.length + 1));
      const randomMsg = RecievedMsg[randomId];
      setMessages((prevMesg) => [
        ...prevMesg,
        {
          msg: randomMsg,
          createdAt: new Date().toISOString(),
          isReceived: true,
        },
      ]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="chat-container">
      <h3 className="">Whatsapp Chat</h3>
      <div className="message-container">
        {messages.map((message) => (
          <div
            key={message.createdAt}
            className={`message-text ${
              message.isReceived ? "msg-recived" : "msg-sent"
            }`}
          >
            {message.msg}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          className="input-box"
          type="text"
          value={draftMsg}
          onChange={(e) => {
            setDraftMsg(e.target.value);
          }}
        />
        <button
          className="send-btn"
          onClick={() => {
            if (draftMsg.trim() !== "") {
              setMessages([
                ...messages,
                {
                  msg: draftMsg,
                  createdAt: new Date().toISOString(),
                  isReceived: false,
                },
              ]);
              setDraftMsg("");
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
