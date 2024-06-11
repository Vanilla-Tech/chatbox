const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  uniqueChatId: {type: String, required: true},
  agent: { type: Schema.Types.ObjectId, ref: "User" },
  agentName: { type: String, required: true },
  agentSessionId: { type: String },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  customerName: { type: String },
  customerEmail: { type: String },
  customerMobileNumber: { type: String },
  customerSessionId: { type: String },
  startTime: { type: Date, require: true },
  endTime: { type: Date },
  requestIP: { type: String, require: true },
  rating: { type: Number },
  status: { type: String },
  department: { type: Schema.Types.ObjectId, ref: "Department" },
  departmentCode: { type: String, required: true },
  departmentName: { type: String, required: true },
  channelCode: { type: String, required: true }
});

module.exports = mongoose.model("Chat", schema);
