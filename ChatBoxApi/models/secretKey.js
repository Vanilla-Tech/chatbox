const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  key: { type: String, required: true },
  secret: { type: String, required: true },
  name: { type: String, required: true }
})

module.exports = mongoose.model('SecretKey', schema)
