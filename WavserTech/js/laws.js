//Camera snapshot workings
/*
Please try with devices with camera!
*/

/*
Reference: 
https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
https://developers.google.com/web/updates/2015/07/mediastream-deprecations?hl=en#stop-ended-and-active
https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
*/

// reference to the current media stream
var mediaStream = null;

// Prefer camera resolution nearest to 1280x720.
var constraints = { 
  audio: false, 
  video: { 
    width: {ideal: 640}, 
    height: {ideal: 480},
    facingMode: "environment"
  } 
}; 

async function getMediaStream(constraints) {
  try {
    mediaStream =  await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById('cam');    
    video.srcObject = mediaStream;
    video.onloadedmetadata = (event) => {
      video.play();
    };
  } catch (err)  {    
    console.error(err.message);   
  }
};

async function switchCamera(cameraMode) {  
  try {
    // stop the current video stream
    if (mediaStream != null && mediaStream.active) {
      var tracks = mediaStream.getVideoTracks();
      tracks.forEach(track => {
        track.stop();
      })      
    }
    
    // set the video source to null
    document.getElementById('cam').srcObject = null;
    
    // change "facingMode"
    constraints.video.facingMode = cameraMode;
    
    // get new media stream
    await getMediaStream(constraints);
  } catch (err)  {    
    console.error(err.message); 
    alert(err.message);
  }
}

function takePicture() {  
  let canvas = document.getElementById('canvas');
  let video = document.getElementById('cam');
  let photo = document.getElementById('photo');  
  let context = canvas.getContext('2d');
  
  const height = video.videoHeight;
  const width = video.videoWidth;
  
  if (width && height) {    
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);    
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearphoto();
  }
}

function clearPhoto() {
  let canvas = document.getElementById('canvas');
  let photo = document.getElementById('photo');
  let context = canvas.getContext('2d');
  
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

document.getElementById('switchFrontBtn').onclick = (event) => {
  switchCamera("user");
}

document.getElementById('switchBackBtn').onclick = (event) => {  
  switchCamera("environment");
}

document.getElementById('snapBtn').onclick = (event) => {  
  takePicture();
  event.preventDefault();
}

clearPhoto();

//Video recordings
let preview = document.getElementById("cam");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");
let logElement = document.getElementById("log");

let recordingTimeMS = 10000;
function log(msg) {
  logElement.innerHTML += msg + "\n";
}
function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
}
function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];
 
  recorder.ondataavailable = event => data.push(event.data);
  recorder.start();
  log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");
 
  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = event => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  );
 
  return Promise.all([
    stopped,
    recorded
  ])
  .then(() => data);
}
function stop(stream) {
  stream.getTracks().forEach(track => track.stop());
}
startButton.addEventListener("click", function() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    preview.srcObject = stream;
    downloadButton.href = stream;
    preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    return new Promise(resolve => preview.onplaying = resolve);
  }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
  .then (recordedChunks => {
    let recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
    recording.src = URL.createObjectURL(recordedBlob);
    downloadButton.href = recording.src;
    downloadButton.download = "RecordedVideo.mp4";
    
    log("Successfully recorded " + recordedBlob.size + " bytes of " +
        recordedBlob.type + " media.");
  })
  .catch(log);
}, false);stopButton.addEventListener("click", function() {
  stop(preview.srcObject);
}, false);