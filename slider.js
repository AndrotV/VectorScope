"use strict"
const LOG_BASE = 2;

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

function getVal(id){
    var val = document.getElementById(id).value;
    return (Math.pow(2, val)).toFixed(1);
}

function setVal(id, val){
    if (val < 1)
        val = 1;
    else if (val > 24000)
        val = 24000;
    document.getElementById(id).value = abbrFreq(val);
}

function removeHz(id) {
    var val = document.getElementById(id).value;
    document.getElementById(id).value = expandFreq(val);
}