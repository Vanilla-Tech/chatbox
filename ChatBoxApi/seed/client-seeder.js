require('custom-env').env(true, process.cwd() + '//')
const SecretKey = require('../models/secretKey')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true
})

const keys = [
  {
    key: '73332daa-3647-4fc8-837b-60b415177add',
    secret: '37d77422-3c85-498d-96c7-cc46ef487a85',
    name: 'SOCKET_SERVER'
  }
]

if (keys.length > 0) {
  SecretKey.collection.insertMany(keys, (err, res) => {
    mongoose.disconnect()
  })
}
