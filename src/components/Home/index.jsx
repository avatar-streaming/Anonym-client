import React from "react";
import useFetchStreamings from "../../hooks/useFetchStreamings";

function Home() {
  const streamings = useFetchStreamings();

  return (
    <div className="content-wrapper">
      <main>
        {
          streamings.map((streaming) => (
            <div key={streaming._id} className="streaming-box">
              <div className="streaming-thumnail"></div>
              <div className="streaming-description">
                <div className="streamer-image"></div>
                <div>
                  <div className="streamer-title">{streaming.title}</div>
                  <div className="streamer-name">{streaming.streamer.userName}</div>
                </div>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default Home;
