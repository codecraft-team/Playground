# Samples with Websockets

## **AspNetCoreWebSockets** 
  - Contains the Web Sockets Server Side, written in a Asp.net core Project
  - As Client it can be used Chrome (see below) or the node client.js in the NodeWebSockets folder.

Open solution in VS. Start with F5.
Use Chrome (see below) or node client for communication.


## **NodeWebSockets**
  - Contains the Web Sockets Server side (app.js), written in a Node application.
  - As Client it can be used Chrome (see below) or the node application client.js.

  Start node server with (e.g. powershell):
  ```javascript
  node app.js
  ```

  Start client in a new (power)shell:
  ```javascript
  node client.js
  ```

After them the connection to the server will be opened and the client will be send in a intervall messages to the server. The server respons on the message.

In this example the framework 'ws' for node.js (npm install ws) is used. Other frameworks are socket.io or SockJS.

  ## Chrome as Web socket client     

  With Chrome it is possible (without a prepared script in the html site) to communicate through web sockets (Chrome implements the WebSocket API Specification).

  First call the server host in chrome "http://localhost:5000".
  Open the console in the developer tools.
  Start a connection to the web socket server, run in console following connection object:
  ```javascript
  socket = new WebSocket('ws://localhost:5000')
  ```
  A connection to the web socket server will be opend that is listening on localhost:5000 and will storen in the socket variable.

  After reciving a mmessage to the client it must be defined a output to the event onmessage:
  ```javascript
  socket.onmessage = function(message) {console.log(JSON.parse(message.data).response)};
  ```

To send a message, use the methode send:
```javascript
socket.send(JSON.stringify({type: 'pong'}))
```
The server will be answer (in this samples).