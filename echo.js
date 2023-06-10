require('dotenv').config();
const { LISTEN_PORT, HOSTNAME, PRIVATE_KEY, PUBLIC_KEY } = process.env;

const privateKeyPath = PRIVATE_KEY;
const fullchainPath = PUBLIC_KEY;

const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.static('public'));
app.use(express.json({limit: '200mb'})); 
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const httpsServer = https.createServer({
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(fullchainPath),
  }, app);
  
  httpsServer.listen(LISTEN_PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server running on port ${LISTEN_PORT}`);
});





// io.on('connection', (socket) => {
//   console.log(socket.request.session);
//   if(socket.request.session.name !== undefined){
//     socket.emit('name', socket.request.session.name); // notice socket.io has access to session.name
//     io.emit('event', socket.request.session.name + ' has joined!');
//   }


//   socket.on('name', (name) => {
//     socket.request.session.name = name; // add name to the session object
//     socket.request.session.save(); // save the session object to persist through other requests
//     socket.broadcast.emit('event', name + ' says hello!');
//   });
// });
