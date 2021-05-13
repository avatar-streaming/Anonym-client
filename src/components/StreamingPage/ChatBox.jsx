import React from "react";

function ChatBox() {
  return (
    <div className="chat-container">
      <div className="chat-box">
        <ul>
          <li>chatting list</li>
        </ul>
      </div>
      <div className="chat-form">
        <form>
          <input type="text" />
          <button>Chat</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
