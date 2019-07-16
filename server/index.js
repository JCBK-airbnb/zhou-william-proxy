const express = require('express');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
const port = 3000;
const serverOne = 'http://localhost:3001',
      serverTwo = 'http://localhost:3002';

express()
    .use(express.static('public'))
    .all('/rooms(/dates)?', (req, res) => apiProxy.web(req, res, {target: serverOne}))
    .all('/reviews', (req, res) => apiProxy.web(req, res, {target: serverTwo}))
    .all('/search', (req, res) => apiProxy.web(req, res, {target: serverTwo}))
    .listen(port, () => console.log(`listening at ${port}`))