const https = require('https');
const express = require('express');
const enforce = require('express-sslify');
const fs = require('fs');
const config = require('../config');
const socket = require('./lib/socket');

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();
const server = https.createServer({ key, cert }, app);

app.use(enforce.HTTPS());

app.use('/', express.static(`${__dirname}/../client`));

server.listen(config.PORT, () => {
  socket(server);
  console.log('Server is listening at :', config.PORT);
});
