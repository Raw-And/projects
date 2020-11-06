const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.79, // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozkitGetUserMedia;

const video = document.getElementById("video");
const audio = document.querySelector("#audio");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        setInterval(runDetection, 1000);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((predictions) => {
    console.log(predictions);
    if (predictions.length > 0) {
      audio.play();
    }
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
