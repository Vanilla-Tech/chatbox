require('custom-env').env(true, process.cwd() + '//')
const express = require('./config/expressconfig.js')
var _ = require('underscore')
var path = require('path')
global.appRoot = path.resolve(__dirname)
var http = require('http')
var app = express()
var server = http.createServer(app)

// start server
const port = process.env.SERVER_PORT
app.connection = server.listen(port, function() {
  console.log('Server listening on port ' + port)
})

module.exports = app.connection
