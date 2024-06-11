const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  modifiedDate: { type: Date, require: true },
  department: { type: Schema.Types.ObjectId, ref: 'Department' }
})

module.exports = mongoose.model('Customer', schema)
