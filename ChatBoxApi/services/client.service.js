const mongoose = require('mongoose')
const db = require('../mongo/db')
Promise = require('bluebird')
mongoose.Promise = Promise

const SecretKey = db.SecretKey

async function checkValidSecretKey(key, secret) {
  // validate
  const key = await SecretKey.findOne({ key: key, secret: secret })
  if (key) {
    return true
  }
  return false
}
module.exports = {
  checkValidSecretKey
}
