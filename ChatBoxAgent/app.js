const express = require('express')

var app = express()
app.use('/public', express.static(__dirname + '/public'))
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/admin.html')
})

app.listen('3039', function() {
  console.log('Server started 3035 ' + +' at ' + new Date().toLocaleString().substr(0, 24))
})
