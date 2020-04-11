// const https = require('https');
const http = require('http');
const express = require('express');
// const enforce = require('express-sslify');
// const fs = require('fs');
const { Client } = require('pg');
const config = require('../config');
const socket = require('./lib/socket');

// const key = fs.readFileSync('./key.pem');
// const cert = fs.readFileSync('./cert.pem');

const app = express();
// const server = https.createServer({ key, cert }, app);
const server = http.createServer(app);


const client = new Client({
  connectionString: config.DB.uri,
  ssl: true
});

client.connect();

const getUsers = (request, response) => {
  client.query(`CREATE TABLE IF NOT EXISTS users (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
  )`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// app.use(enforce.HTTPS());

app.use('/', express.static(`${__dirname}/../client`));

app.use('/users', getUsers);

server.listen(config.PORT, () => {
  socket(server);
  console.log('Server is listening at :', config.PORT);
});
