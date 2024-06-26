import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div id="loading-div">
      <div id="bounce-wrapper">
        <div id="roll-wrapper">
          <img src="/ball.png" alt="Loading..." id="loading" />
        </div>
      </div>
      <div id="loading-ground">
        <p id='fetching'>Fetching<span id="dots"></span></p>
      </div>
    </div>
  );
}

export default Loading;
