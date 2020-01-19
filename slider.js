"use strict"
const LOG_BASE = 2;
var microphoneEnabled = false

function abbrFreqId(id){
    document.getElementById(id).value = abbrFreq(document.getElementById(id).value);
}

function abbrFreq(val){
    if (val < 1000) 
        return val + "Hz";
    return (val/1000).toFixed(1) + "kHz"
}

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
    var val = Number(document.getElementById(id).value);
    if (base == 0)
        return val;
    return (Math.pow(base, val)).toFixed(1);
}

function setVal(id, val){
    if (val < 0)
        val = 0;
    else if (val > 24000)
        val = 24000;
    document.getElementById(id).value = abbrFreq(val);
}

function removeHz(id) {
    var val = document.getElementById(id).value;
    document.getElementById(id).value = expandFreq(val);
}

function toggleMicrophone(btn) {
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