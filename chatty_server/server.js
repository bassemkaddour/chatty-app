// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

const clients = [];
const colors = ['purple', 'blue', 'red', 'green', 'turquoise', 'pink'];
// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server, clientTracking: true });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  
    const color = colors[clients.length % colors.length];

    function handleMessage(message) {
      //changes type from post to incoming
      const messageData = JSON.parse(message); 
      switch (messageData.type) {
        case 'postMessage': 
          messageData.type = 'incomingMessage';
          messageData.color = color;
          return JSON.stringify(messageData);
        case 'postNotification': 
          messageData.type = 'incomingNotification';
          return JSON.stringify(messageData);
        default: 
          console.error("Unknown event type " + messageData.type);
          break;
      }
    }

  clients.push(ws);
  
  wss.broadcast(JSON.stringify({type: 'user-count', count: wss.clients.size}));

  ws.on('message', function incoming(message) {
    const messageOut = handleMessage(message);
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageOut);
      }
    });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({type: 'user-count', count: wss.clients.size}));
    console.log('Client disconnected');
  });
});