// let note1 = 523.25;
// let note2 = 659.26;
// let note3 = 783.99;
// let type = 'saw';
// let type = 'sine';
// let type = 'square';



// var context = new (window.AudioContext || window.webkitAudioContext)();
// var context2 = new AudioContext();
// var o = context.createOscillator();
// let o2 = context2.createOscillator();
// o.type = 'square';
// // o.frequency.setTargetAtTime(note1, context.currentTime, 0);
// o.frequency.value = 123;
// // o2.frequency.setTargetAtTime(523.25, context.currentTime, 0);
// o2.frequency.setTargetAtTime(note2, context2.currentTime, 0);
// o.connect(context.destination);
// o2.connect(context2.destination);
// o.start(0);
// o2.start(0);
// let on = false;
// let first = true;
// console.log(o);


// let context = new MidiContext();
// let on = false;
// context.newNote(note1);
// context.newNote(note2);
// context.newNote(note3);


// let button = document.querySelector("#buttonmidi");

// button.addEventListener("click", () => {
// 	if (!on) {
// 		// if (first) {
// 		// 	context.resume();
// 		// 	first = false;
// 		// } else {
// 		// 	// o.start();
// 		// }
// 		// context.resume();
// 		// context2.resume();
// 		// console.log("Audio value is " + o.frequency.value);
// 		// context.resumeNote(note1);
// 		context.unmute();
// 		on = true;
// 	} else {
// 		// o.stop();
// 		// context.suspend();
// 		// context2.suspend();
// 		// context.stopNote(note1);
// 		context.mute();
// 		on = false;
// 	}
// });


// let source;
// var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
// var analyser = audioCtx.createAnalyser();
// let gain = audioCtx.createGain();
// let distortion = audioCtx.createWaveShaper();
// var mediaStream = navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
//   source = audioCtx.createMediaStreamSource(stream);
//   // source.connect(distortion);
//   source.connect(gain);
//   analyser.connect(audioCtx.destination);
//   gain.connect(analyser);
// });

// ...

// analyser.fftSize = 2048;
// var bufferLength = analyser.frequencyBinCount;
// var dataArray = new Uint8Array(bufferLength);
// analyser.getByteTimeDomainData(dataArray);

let mic = new MicContext();

// Get a canvas defined with ID "oscilloscope"
var canvas = document.getElementById("graph-canvas");
var canvasCtx = canvas.getContext("2d");

// gain.gain.value = 1000;
// mic.setGain(10);
let first = true;


// draw an oscilloscope of the current audio source

function draw() {

  requestAnimationFrame(draw);

  // analyser.getByteTimeDomainData(dataArray);
  dataArray = mic.getMicRawData();
  if (first) {
    mic.updateFourierData();
    console.log(mic.getFourierFreq1());
    console.log(mic.getFourierFreq2());
    first = false;
  }

  canvasCtx.fillStyle = "rgb(200, 200, 200)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";

  canvasCtx.beginPath();

  var sliceWidth = canvas.width * 1.0 / mic.getBufferLength();
  var x = 0;

  for (var i = 0; i < mic.getBufferLength(); i++) {

    var v = dataArray[i] / 128.0;
    var y = v * canvas.height / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

}
draw();


let obutt = document.querySelector("#obutton");

obutt.addEventListener("click", () => {
  mic.resume();
  first = true;
  console.log("Starting audio context");
});
