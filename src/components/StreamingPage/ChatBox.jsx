import React from "react";
import useChatting from "../../hooks/useChatting";

function ChatBox() {
  const {
    inputValue,
    updateInputValue,
    handleSubmit,
    chatList,
  } = useChatting();

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chatList.map((chat, index) => (
          <div key={index} className="chat">
            <span>{chat.userName}</span>
            <span>: {chat.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            value={inputValue}
            onChange={(e) => {
              updateInputValue(e.target.value);
            }}
          />
          <button>Chat</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
