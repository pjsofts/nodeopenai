import { useState } from "react";

import "./App.css";
import { sendMessage } from "./api/message";

function App() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  return (
    <div>
      <div>
        {history.map((item, index) => {
          if (item.ai) {
            return <div className="chat-box" key={index}>AI: {item.ai}</div>;
          } else {
            return <div  className="chat-box" key={index}>{item}</div>;
          }
        })}
      </div>

      <button
        type="button"
        onClick={async () => {
          const response = await sendMessage(message);
          console.log(response);
          setHistory([...history, message, response]);
          console.log(history);
        }}
      >
        Send
      </button>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
    </div>
  );
}

export default App;
