"use strict"
const LOG_BASE = 2;
var microphoneEnabled = false

const BGCOLOR = 'rgb(34,34,34)';
const PTCOLOR = 'rgb(59, 151, 182)';
var ph1 = 0;
var ph2 = 0;

function expandFreq(val){
    var expandFreq = 0;
    if (val.search(/.*k.*/, '') != -1) {
        var expandFreq = parseInt(val.substring(0, val.indexOf("."))) * 1000;
        expandFreq += parseInt(val.substring(val.indexOf(".")+1, val.indexOf("k"))) * 100;
        return expandFreq;
    } else if (val.search(/.*H.*/, '') != -1) {
        return parseInt(val.substring(0, val.indexOf("H")));
    } else {
        return val;
    }
}

function getVal(id, base){
    var val = Number(expandFreq(document.getElementById(id).value));
    if (base == 0)
        return val;
    return (Math.pow(base, val));
}

function setSliderVal(id, val){

    if (id == "xPhase") {
        if (val < 0)
            val = 0;
        else if (val > 1)
            val = 1;

        document.getElementById(id).value = val;
    }

    if (val < 0)
        val = 0;
    else if (val > 24000)
        val = 24000;
    document.getElementById(id).value = Math.log2(val);

}

function setInputVal(id, val) {
    if (val < 0)
        val = 0;
    else if (val > 24000)
        val = 24000;
    document.getElementById(id).value = val;

    if (id == 'xHzInput') {
        f1 = val;
        ctx.fillStyle = BGCOLOR;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else if (id == 'yHzInput') {
        f2 = val;
        ctx.fillStyle = BGCOLOR;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else if (id == 'xPhaseInput') {
        ctx.fillStyle = BGCOLOR;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ph1 = val;
    }
}

function removeHz(id) {
    var val = document.getElementById(id).value;
    document.getElementById(id).value = expandFreq(val);
}

function toggleMicrophone() {
    microphoneEnabled = !microphoneEnabled;
    for (var i = 0; i < arguments.length; i++){
        if (microphoneEnabled){
            document.getElementById(arguments[i]).disabled = true;
            document.getElementById(arguments[i]).style.opacity = 0.1;
        } else {
            document.getElementById(arguments[i]).disabled = false;
            document.getElementById(arguments[i]).style.opacity = 1;
        }
    }
}