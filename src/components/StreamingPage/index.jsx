import React from "react";
import ChatBox from "./ChatBox";
import Streamer from "./Streamer";
import Viewer from "./Viewer";
import useJoinAndLeaveRoom from "../../hooks/useJoinAndLeaveRoom";

function StreamingPage() {
  const { userId, id } = useJoinAndLeaveRoom();

  return (
    <div className="content-wrapper">
      <div className="streaming-container">
        <div className="main-container">
          {userId === id ? <Streamer /> : <Viewer />}
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default StreamingPage;
