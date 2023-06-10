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


/*
 * REST Endpoints
 */

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

/*
 * HTTPS Express Server
 */

const httpsServer = https.createServer({
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(fullchainPath),
  }, app);
  
  httpsServer.listen(LISTEN_PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server running on port ${LISTEN_PORT}`);
});

/*
 * SocketIo Server
 */

const io = require('socket.io')(httpsServer, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  console.log('socketio connection', socket.id);
  socket.on('echo', (msg) => socket.emit('echo', msg));
});
