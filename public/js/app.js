'use strict';

require('fabric')

const canvas = new fabric.Canvas('sketch-pad', {
    isDrawingMode: true
});

var socket = io();
socket.on('connect', function (data) {
    console.log('socket.io connected');
    socket.emit('packet', {
        message: 'client connected'
    })
});
