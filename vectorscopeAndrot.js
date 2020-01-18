//VectorScope for BigWads
(function () {
	"use strict"
	//constants
	var amplitude = 500;
	var period = 1;
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

	function start() {
		console.log("start");
		timeline = setInterval(tick, 0.001); //refresh rate of 100Hz
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
		var position = amplitude * Math.sin(time*2*Math.PI/period)
		freqBlock.value = position;
		move(graph.cursor).to(position, 260);
        refresh(graph);
	}

//Ben graphics
const width = 500;
const height = 500;
const xaxis = 250;
const yaxis = 250;
const dimrate = 1; //how fast pixel dims out per refresh in [0,1]

let canvas = document.querySelector('#graph-canvas');

let ctx = canvas.getContext('2d');

//create axis lines
ctx.moveTo(0, yaxis);
ctx.lineTo(width, yaxis);

ctx.moveTo(xaxis, 0);
ctx.lineTo(xaxis, height);

ctx.stroke();

let graph = {
    //drawn pixels
    pixels: [{x:0, y:0}],

    cursor: {
        x: 0,
        y: 0
    }
}

//for moving the graph cursor
function move(cursor) {
    return {
        to: (x,y) => {
            cursor.x = x;
            cursor.y = y;
        }
    };
}

//remove last pixel, draw new one
function refresh(graph) {

    let pixel = graph.pixels[0];

    //remove last pixel
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(pixel.x, pixel.y, 1, 1);

    graph.pixels[0] = new Pixel(graph.cursor.x, graph.cursor.y);
    pixel = graph.pixels[0];

    //draw new pixel
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(pixel.x, pixel.y, 1, 1);


    //redraw axes
    //ctx.moveTo(0, yaxis);
    //ctx.lineTo(width, yaxis);

    //ctx.moveTo(xaxis, 0);
    //ctx.lineTo(xaxis, height);

    //ctx.stroke();
}

class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.intensity = 1;
    }
}


function enable_debug() {
    canvas.onmousemove = (e) => {
        move(graph.cursor).to(e.offsetX, e.offsetY);
        refresh(graph);
    }
}

})();