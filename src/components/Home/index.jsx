import React from "react";
import useFetchStreamings from "../../hooks/useFetchStreamings";

function Home() {
  const streamings = useFetchStreamings();

  return (
    <div>
      <main>
        <ul>
          {
            streamings.map((streaming, index) => (
              <li id={index}>streaming {index}</li>
            ))
          }
        </ul>
      </main>
    </div>
  );
}

export default Home;
