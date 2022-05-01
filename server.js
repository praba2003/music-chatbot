'use strict';

const express = require('express');
const server = express();
const bodyparser = require('body-parser');
server.use(bodyparser.json())

const config = require('./config');
const lastfm = require('./lastfm');
console.log(config);
const FBeamer = require('./fbeamer');
const messenger = require('./messenger');
const fb = new FBeamer(config.FB);

// Default page when opening https://your-repository.repl.co/
server.get('/', (request, response) => response.send(`
<h1>Music Chatbot </h1>
<a href='https://m.me/111934974715226'>click here to chat with my bot</a> (open it on a new tab)
`));

// Registering WebHook url https://ChatBot-music.projetinfodia5.repl.co/fb
server.get('/fb', (request, response) => fb.registerHook(request, response));

const recommendation = require('./recommendation');

server.post('/fb', (request, response, next) => {
  fb.incoming(request, response, async msg => {
    messenger(fb, msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`FBeamer Bot Service running on Port ${PORT}`));