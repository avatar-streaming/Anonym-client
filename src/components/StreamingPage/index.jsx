import React, { useState } from "react";
import ChatBox from "./ChatBox";

function StreamingPage() {
  const [isStreamer, setIsStreamer] = useState(false);

  return (
    <div>
      <main>
        <div>
          <canvas />
        </div>
        <div>
          <div>thumnail</div>
          <div>name</div>
          {isStreamer ? (
            <form>
              <input type="text" />
              <button>save</button>
            </form>
          ) : (
            <div>title</div>
          )}
        </div>
      </main>
      <ChatBox />
    </div>
  );
}

export default StreamingPage;
