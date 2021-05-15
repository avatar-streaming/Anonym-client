import React, { useState } from "react";
import useToggleOnOff from "../../hooks/useToggleOnOff";
import useToggleStreaming from "../../hooks/useToggleStreaming";

function Streamer() {
  const [streamingTitle, setStreamingTitle] = useState("");
  const { isOn, toggleOnOff } = useToggleOnOff();

  useToggleStreaming(isOn, streamingTitle);

  return (
    <>
      <div className="streaming-state">
        <input
          type="text"
          className="input-text"
          value={streamingTitle}
          onChange={(e) => {
            setStreamingTitle(e.target.value);
          }}
        />
        <button>save</button>
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
  );
}

export default Streamer;
