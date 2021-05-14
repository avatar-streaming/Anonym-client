import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMotionAnimator from "../../hooks/useMotionAnimator";
import useToggleOnOff from "../../hooks/useToggleOnOff";
import useToggleStreaming from "../../hooks/useToggleStreaming";
import ChatBox from "./ChatBox";

function StreamingPage() {
  const { _id: userId } = useSelector((state) => state.authReducer.userInfo);
  const { id } = useParams();
  const { isOn, toggleOnOff } = useToggleOnOff();
  const [streamingTitle, setStreamingTitle] = useState("");
  const { outputRef, avatarRef, videoRef } = useMotionAnimator();

  useToggleStreaming(isOn, streamingTitle);

  return (
    <div className="content-wrapper">
      <div className="streaming-container">
        <div className="main-container">
          <div className="canvas-container">
            <div id='main'>
              <video ref={videoRef} playsInline />
              <canvas ref={outputRef} className="camera-canvas" />
            </div>
            <canvas ref={avatarRef} className="illustration-canvas" />
          </div>
          <div>
            {userId === id ? (
              <>
                <div className="streaming-state">
                  <form>
                    <input
                      type="text"
                      className="input-text"
                      value={streamingTitle}
                      onChange={(e) => {
                        setStreamingTitle(e.target.value);
                      }}
                    />
                    <button>save</button>
                  </form>
                  <button onClick={() => {
                    toggleOnOff();
                  }}>
                    {isOn ? "STOP STREAM" : "START STREAM"}
                  </button>
                </div>
                <ul className="character-list">
                  <li className="character">1</li>
                  <li className="character">2</li>
                  <li className="character">3</li>
                </ul>
                <ul className="character-list">
                  <li className="character">1</li>
                  <li className="character">2</li>
                  <li className="character">3</li>
                </ul>
              </>
            ) : (
              <div>title</div>
            )}
          </div>
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default StreamingPage;
