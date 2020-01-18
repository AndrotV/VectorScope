"use strict"

let canvas = document.querySelector('#graph-canvas');
let ctx = canvas.getContext('2d');

const f1 = 500;
const f2 = 600;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const ORIGIN = {x: WIDTH/2, y: HEIGHT/2};

const AMP = canvas.height / 2; //half height of canvas
console.log(AMP);

const PHASE = Math.PI / 4;

let drawing;
let t, t2 = 0;

//draw out the curve for one period of the waveforms
function draw() {
    //drawing = requestAnimationFrame(draw);

    ctx.fillStyle = 'rgb(220, 220, 200)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    ctx.beginPath();


    let x = AMP * Math.sin(t * 2*Math.PI / f1 + PHASE); //map f1 to x
    let y = AMP * Math.sin(t * 2*Math.PI / f2); //map f2 to y

    ctx.moveTo(ORIGIN.x + x, ORIGIN.y - y);


    while (true) {
        //do this until t2 hits
        for (t = t2; t <= t2 + 1/f1; t += 1/(f1*f2)) {
            x = AMP * Math.sin(t * 2*Math.PI * f1 + PHASE); //map f1 to x
            y = AMP * Math.sin(t * 2*Math.PI * f2); //map f2 to y

            ctx.lineTo(ORIGIN.x + x, ORIGIN.y - y);
        }
        t2 += 1/f1;

        if (t2 >= 1/f2) break;
    }    

    ctx.stroke();
}

function gcd(a, b) {
    // base case
    if(a === 0) { return b;}
    if(b === 0) { return a;}

    // general case
    return gcd(b, a % b);
}