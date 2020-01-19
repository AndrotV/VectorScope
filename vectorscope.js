"use strict"
let canvas = document.querySelector('#graph-canvas');
let ctx = canvas.getContext('2d');

let f1 = 1;
let f2 = 50;

const SLIDER = 0;
const MIC = 1;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const ORIGIN = {x: WIDTH/2, y: HEIGHT/2};

const AMP = canvas.height / 2; //half height of canvas
console.log(AMP);

const PHASE = Math.PI / 4 + .1;

let drawing;
let t, t2 = 0;

let input = SLIDER;

ctx.fillStyle = `rgba(220, 220, 200)`;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

//let miccontext = new MicContext();

//draw out the curve for one period of the waveforms
function draw() {
    drawing = requestAnimationFrame(draw);

    if (input == SLIDER) {
        
    } else if (input == MIC) {
        miccontext.updateFourierData();
        f1 = miccontext.getFourierFreq1();
        f2 = miccontext.getFourierFreq2();
        console.log(f1,f2);
    }

    //let a = 1;

    let minf = Math.min(f1, f2);

    let g = gcd(f1, f2);

    let a = (minf - g) / minf / 10;    

    ctx.fillStyle = `rgba(220, 220, 200, ${a})`;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(0, 0, 0)';

    ctx.beginPath();

    let x = AMP * Math.sin(t * 2*Math.PI * f1 + PHASE); //map f1 to x
    let y = AMP * Math.sin(t * 2*Math.PI * f2); //map f2 to y

    ctx.moveTo(ORIGIN.x + x, ORIGIN.y - y);


    while (true) {
        //do this until t2 hits
        for (t = t2; t <= t2 + (1/f1 || 0); t += (1/Math.max(f2,f1) || 0) / 100) {
            x = AMP * Math.sin(t * 2*Math.PI * f1 + PHASE); //map f1 to x
            y = AMP * Math.sin(t * 2*Math.PI * f2); //map f2 to y

            ctx.lineTo(ORIGIN.x + x, ORIGIN.y - y);
        }
        t2 += (1/f1 || 0);

        if (f2 == 0 || t2 >= 1/f2) break;
    }    

    ctx.stroke();
}

startButton.addEventListener('click', function() {
    miccontext.resume();
});

function gcd(a, b) {
    // base cases
    if (a === 0) { return b;}
    if (b === 0) { return a;}

    // general case
    return gcd(b, a % b);
}