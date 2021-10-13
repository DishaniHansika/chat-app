import React from "react";
import { useState } from "react";
import useChat from "../useChat";

const Message = (props) => {
  const { groupId } = props.match.params;
  const { messages, sendMessage } = useChat(groupId);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div>
      <div className="group">Group:{groupId}</div>
      <div className="displayMessage">
        <ul style={{listStyle:"none"}}>
          {messages.map((message, index) => (
            <li 
              key={index}
              className={`messageItem ${
                message.currentUser ? "userMessage" : "recieverMessage"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ul>
      </div>

      <textarea
        value={newMessage}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <div>
        <input type="file" id="fileIcon" />
        <label for="fileIcon">
          <img
            src="https://img.icons8.com/material-outlined/24/000000/attach.png"
            alt=""
          />
        </label>
      </div>
      <button onClick={handleSendMessage}>Send</button>

    </div>
  );
};

export default Message;
