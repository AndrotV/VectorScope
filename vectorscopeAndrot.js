//VectorScope for BigWads
(function () {
	"use strict"
	//constants
	var amplitude = 1;
	var period = 2;
	//global fields
	var timeline;
	var timeBlock;
	var freqBlock;

	window.onload = function() {
		timeBlock = document.getElementById("timeText");
		freqBlock = document.getElementById("freqText");
		var startButton = document.getElementById("startButton");
		startButton.onclick = start;
		var stopButton = document.getElementById("stopButton");
		stopButton.onclick = stop;
	}

	function start () {
		console.log("start");
		timeline = setInterval(tick, 10); //refresh rate of 100Hz
	}

	function stop() {
		console.log("stop");
		clearInterval(timeline);
		timeBlock.value = 0;
		freqBlock.value = 0;
	}

	function tick() {
		var time = Number(timeBlock.value);
		time += 0.01;
		timeBlock.value = time;
		freqBlock.value = amplitude * Math.sin(time*2*Math.PI/period);
	}

})();