const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
  // serve the index.html file
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(content));
  res.end(content);
});

const io = require('socket.io')(httpServer);

//Evenement permettant de faire la connexion entre le client et le serveur
io.on('connect', socket => {
    let counter = 0;
    setInterval(() => {
        //Chaque seconde, on emet un evenenement
        socket.emit('hello', ++counter)
    }, 1000)
});

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});