const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const OpeningMessage = require("./openingDetails");

const schema = new Schema({
  name: { type: String, require: true },
  code: { type: String, require: true, unique: true },
  displayName: { type: String, require: true },
  openingDetails: [
    {
      day: { type: String, require: true },
      openingTime: { type: Number, require: true },
      closingTime: { type: Number, require: true },
      isActive: { type: Boolean, default: false }
    }
  ],
  preChatForm: {
    isRequired: { type: Boolean, default: true },
    isEmailRequired: { type: Boolean, default: true },
    isNameRequired: { type: Boolean, default: true },
    isMobileNumberRequired: { type: Boolean, default: true },
    name: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    mobile: { type: Boolean, default: true }
  },
  offlineForm: {
    isRequired: { type: Boolean, default: true },
    isEmailRequired: { type: Boolean, default: true },
    isNameRequired: { type: Boolean, default: true },
    isMobileNumberRequired: { type: Boolean, default: true },
    name: { type: Boolean, default: true },
    email: { type: Boolean, default: true },
    mobile: { type: Boolean, default: true }
  },
  channels: [
    {
      code: { type: String, require: true }
    }
  ],
  chatSetting: {
    closeTime: { type: Number, require: true },
    uniqueIdentifier: { type: String, require: true }
  },
  offlineFormEmail: { type: String, require: true },
  offlineFormMessage: { type: String, require: true },
  announcementBanner: { type: String, require: true },
  status: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  modifiedDate: { type: Date },
  modifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Department', schema)
