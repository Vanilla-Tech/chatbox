const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  messageId: { type: String, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },
  timeStamp: { type: Date, require: true },
  agent: { type: Schema.Types.ObjectId, ref: 'User' },
  agentName: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  message: { type: String, require: true },
  status: { type: String, default: 'PENDING' },
  isAgentChat: { type: Boolean, default: false },
  isFile: { type: Boolean, default: false },
  originalFileName: { type: String },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  departmentCode: { type: String, required: true },
  isChatNote: { type: Boolean, default: false }
})

module.exports = mongoose.model('ChatHistory', schema)
