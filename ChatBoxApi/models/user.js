const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: { type: String, require: true },
  isBlocked: { type: Boolean, default: false },
  staffId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  picture: { type: String },
  type: { type: String, require: true },
  icNumber: { type: String, require: true },
  status: { type: String, required: true },
  forceChangePassword: { type: Boolean, default: false },
  modifiedDate: { type: Date },
  modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  departments: [{ type: Schema.Types.ObjectId, ref: 'Department' }],
  chatThreshold: { type: Number, require: false, default: 0 },
  currentJwtToken: { type: String },
  displayName: { type: String }
})

schema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', schema)
