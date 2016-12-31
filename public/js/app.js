'use strict';

const paper = require('paper')
const socket = io();
let canvas = document.getElementById("canvas");

socket.on('connect', function (data) {
    console.log('socket.io connected');
    socket.emit('packet', {
        message: 'client connected'
    })
});

paper.install(window);
window.onload = function() {
    paper.setup('canvas');
    window.onresize()
}
window.onresize = function() {
    if (canvas.width != window.innerWidth) {
        canvas.style.width = window.innerWidth + 'px';
    }
    if (canvas.height != window.innerHeight) {
        canvas.style.height = window.innerHeight + 'px';
    }
}

let origin = { x: 400, y: 200 };
let fromPt = { x: 400, y: 200 }
socket.on('packet', function(packet) {
    console.log('packet: ' + JSON.stringify(packet))
    let newPt = getPoint(packet)
    let toPt = {
        x: origin.x + newPt.x,
        y: origin.y + newPt.y,
    }
    let path = new Path.Line(fromPt, toPt);
    path.strokeColor = 'green';
    fromPt = {
        x: toPt.x,
        y: toPt.y,
    }
})

function getPoint(coordinate) {
    return {
        x: parseInt(coordinate.x),
        y: parseInt(coordinate.y),
    }
}
