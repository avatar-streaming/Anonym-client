import React from "react";
import { Link } from "react-router-dom";
import useFetchStreamings from "../../hooks/useFetchStreamings";

function Home() {
  const streamings = useFetchStreamings();

  return (
    <div className="content-wrapper">
      <div className="streaming-list">
        {
          streamings.map((streaming) => (
            <Link
              to={`/streaming/${streaming.streamer._id}`}
              key={streaming._id}
              className="streaming-box"
            >
              <div className="streaming-thumnail">
                <img
                  src={streaming.thumnail}
                  alt="streaming thumnail"
                  className="streaming-thumnail"
                />
              </div>
              <div className="streaming-description">
                <img
                  src={streaming.streamer.thumnail}
                  alt="user thumnail"
                  className="streamer-thumnail"
                />
                <div className="description-text">
                  <div className="streamer-title">{streaming.title}</div>
                  <div className="streamer-name">{streaming.streamer.userName}</div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
