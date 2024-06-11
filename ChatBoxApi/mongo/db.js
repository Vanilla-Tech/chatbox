const mongoose = require('mongoose')
const fs = require('fs')

if (process.env.APP_ENV === 'sit') {
  // Read the certificates
  var ca = [fs.readFileSync(__dirname + '/cert/server.crt')]
  var cert = fs.readFileSync(__dirname + '/cert/mongodb.crt')
  var key = fs.readFileSync(__dirname + '/cert/mongodb.key')

  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    sslValidate: true,
    sslCA: ca,
    sslKey: key,
    sslCert: cert,
    sslPass: '10gen'
  })
} else {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
}
mongoose.Promise = global.Promise

module.exports = {
  User: require('../models/user'),
  Department: require('../models/department'),
  Chat: require('../models/chat'),
  Application: require('../models/application'),
  ChatHistory: require('../models/chatHistory'),
  Customer: require('../models/customer'),
  OfflineMessage: require('../models/offlineMessage'),
  SecretKey: require('../models/secretKey'),
  RunningNumber: require('../models/runningNumber')
}
