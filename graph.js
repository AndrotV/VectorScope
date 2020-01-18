"use strict"

const WIDTH = 500;
const HEIGHT = 500;
const xaxis = 250;
const yaxis = 250;
const dimrate = .005; //how fast pixel dims out per refresh in [0,1]



//constants
const amplitude = 250;
const period = 500;

//global fields
var timeline;
var timeBlock;
var freqBlock;

let step;

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
    //timeline = setInterval(tick, 100);
    timeline = window.requestAnimationFrame(tick); //refresh rate of 60Hz
    step = true;
}

function stop() {
    console.log("stop");
    //clearInterval(timeline);
    timeBlock.value = 0;
    freqBlock.value = 0;
    step = false;
}

function tick() {
    var time = Number(timeBlock.value);
    time += 1;
    timeBlock.value = time;
    var position = amplitude * Math.sin(time*2*Math.PI/period);
    freqBlock.value = position;
    move(graph.cursor).to(yaxis + position, 260);
    refresh(graph);
    if (step)
        window.requestAnimationFrame(tick);
}
    


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
    pixels: [],

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

//refresh the entire graph, 
//drawing at cursor, 
//and dimming all other pixels
function refresh(graph) {
    //dim each pixel in the graph
    graph.pixels.forEach(pixel => {
        pixel.intensity -= dimrate;
    });

    console.log(graph.pixels.length);

    //add current cursor point to buffer of pixels
    graph.pixels.push(new Pixel(graph.cursor.x, graph.cursor.y));

    //draw all the points with their resp. intensities
    graph.pixels.forEach(pixel => {
        let i = pixel.intensity;
        //fraction of black based on intensity
        ctx.fillStyle = `rgb(${255-255*i},${255-255*i},${255-255*i})`;
        ctx.fillRect(pixel.x, pixel.y, 1, 1);
    });

    //redraw axes
    ctx.moveTo(0, yaxis);
    ctx.lineTo(width, yaxis);

    ctx.moveTo(xaxis, 0);
    ctx.lineTo(xaxis, height);

    ctx.stroke();

    //filter out any 0 intensity pixels
    graph.pixels = graph.pixels.filter(pixel => pixel.intensity > 0);
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


function plot(audioctx) {
    let analyzer = audioctx.createAnalyzer();

    analyzer.fftSize = 1024;

    let buffLength = 1024;

    let data = new Float32Array(buffLength);

    draw(analyzer, data);
    


}

function draw(analyzer, data) {

    let drawing = requestAnimationFrame(draw);

    analyzer.getFloatTimeDomainData(data);


    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0,0,0)';

    ctx.beginPath();

    let slice_width = WIDTH / data.length;

    let x = 0;

    for (let i = 0; i < buffLength; i++) {
        let y = HEIGHT / 2 + data[i] * HEIGHT;

        if (i == 0) {
            ctx.moveTo(x,y);
        } else {
            ctx.lineTo(x,y);
        }

        x += slice_width;
    }

    ctx.lineTo(WIDTH, HEIGHT/2);
    ctx.stroke();
}