'use strict'

const ws = require('ws');

const socket = new ws('ws://localhost:5000');

socket.on('open', () => {
    socket.on('message', data => {
        const message = JSON.parse(data);
        console.log(message);
    });

    setInterval(() => {
        socket.send(JSON.stringify({ type: 'pong' }));
    }, 1000);
})