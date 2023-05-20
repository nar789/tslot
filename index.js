const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use('/assets',express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3002, () => {
    console.log('SLOT server listening on *:3002');
});