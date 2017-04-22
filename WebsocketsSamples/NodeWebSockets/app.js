'use strict'

const http = require('http');
const ws = require('ws');

const server = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hallo I am here.....");
});

const wsServer = new ws.Server({ server });

wsServer.on('connection', socket => {
    console.log('connected');

    setInterval(() => {
        var tt = new Date();
        socket.send(JSON.stringify({ type: 'time', response: tt.getSeconds() }));
    }, 1000);

    socket.on('message', data => {
        const message = JSON.parse(data);

        switch (message.type) {
            case 'ping':
                socket.send(JSON.stringify({ type: 'ping', response: 'pong' }));
                break;
            case 'pong':
                socket.send(JSON.stringify({ type: 'pong', response: 'ping' }));
                break;

            default:
                socket.send(JSON.stringify({ type: 'error', response: 'error' }));
                break;
        }
    })
})

server.listen(5000, () => {
    console.log('server running on port 5000...');
})