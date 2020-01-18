const width = 500;
const height = 500;

let canvas = document.querySelector('#graph');

let ctx = canvas.getContext('2d');

ctx.moveTo(0, 250);
ctx.lineTo(500, 250);
ctx.stroke();

ctx.moveTo(250, 0);
ctx.lineTo(250, 500);
ctx.stroke();

