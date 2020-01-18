/*
 * https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
 * 
 * Steps:
 * 1. create audio context
 * 2. create analyser
 * 3. create media stream with {audio: true} constrant
 *     .then(
 *         create media stream source
 *         connect analyser to context dest
 *         connect source to analyser
 *     )
 * 4. get time data from analyser
 */

let source;
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
var mediaStream = navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
  source = audioCtx.createMediaStreamSource(stream);
  // maybe other stuff here
  analyser.connect(audioCtx.destination);
  source.connect(analyser);
});

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// dataArray will contain mic data