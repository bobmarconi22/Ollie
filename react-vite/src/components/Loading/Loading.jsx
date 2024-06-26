import "./Loading.css";

function Loading() {
  return (
    <div id="loading-div">
      <div id="bounce-wrapper">
        <div id="roll-wrapper">
          <img src="https://marconi22-ollie.s3.us-east-2.amazonaws.com/06a5ad6dc3e04d56b3737ceb0932e636.png" alt="ball.png" id="loading" />
        </div>
      </div>
      <div id="loading-ground">
        <p id='fetching'>Fetching<span id="dots"></span></p>
      </div>
    </div>
  );
}

export default Loading;
