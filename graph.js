const width = 500;
const height = 500;
const xaxis = 250;
const yaxis = 250;
const dimrate = .05; //how fast pixel dims out per refresh in [0,1]

let canvas = document.querySelector('#graph-canvas');

let ctx = canvas.getContext('2d');

ctx.moveTo(0, 250);
ctx.lineTo(500, 250);

ctx.moveTo(250, 0);
ctx.lineTo(250, 500);

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

    //add current cursor point to buffer of pixels
    graph.pixels.push(new Pixel(graph.cursor.x, graph.cursor.y));

    //draw all the points with their resp. intensities
    graph.pixels.forEach(pixel => {
        let i = pixel.intensity;
        //fraction of black based on intensity
        ctx.fillStyle = `rgb(${255-255*i},${255-255*i},${255-255*i})`;
        ctx.fillRect(pixel.x, pixel.y, 1, 1);
    });

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
