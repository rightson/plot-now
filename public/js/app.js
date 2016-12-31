'use strict';

const paper = require('paper')

const socket = io();
socket.on('connect', function (data) {
    console.log('socket.io connected');
    socket.emit('packet', {
        message: 'client connected'
    })
});

paper.install(window);
window.onload = function() {
    paper.setup('canvas');

    let lastPoint = null;
    socket.on('packet', function(packet) {
        console.log('packet: ' + JSON.stringify(packet))
                    new Path.Circle(new Point(80, 50), 30);
        let point = getCenterize(packet);
        if (!lastPoint) {
            console.log('origin: ' + JSON.stringify(point))
            drawPoint(point)
            lastPoint = point;
        } else {
            console.log('lineTo: ' + JSON.stringify(point))
            drawPoint(point)
            //drawPath(lastPoint, point)
            lastPoint = null;
        }
    })
}
function getPoint(coordinate) {
    return {
        x: parseInt(coordinate.x),
        y: parseInt(coordinate.y),
    }
}

function getCenterize(coordinate) {
    return {
        x: parseInt(coordinate.x) + 400,
        y: parseInt(coordinate.y) + 400,
    }
}

function drawPoint(point) {
    let circle = new Path.Circle(new Point(point.x, point.y), 2);
    circle.fillColor = 'red'
}

function drawPath(origin, lineTo) {
    let path = new paper.Path();
    console.log('Painting origin: ' + JSON.stringify(origin) + ' lineTo:' + JSON.stringify(lineTo))
    path.strokeColor = 'red';
    let start = new paper.Point(origin.x, origin.y);
    path.moveTo(start);
    path.lineTo(start.add([ lineTo.x, lineTo.y ]));
    paper.view.draw();
}
