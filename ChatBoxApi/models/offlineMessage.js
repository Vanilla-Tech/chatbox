const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  customerName: {
    type: String,
    require: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerMobileNumber: {
    type: String,
    require: true
  },
  message: {
    type: String,
    require: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department"
  },
  departmentCode: {
    type: String,
    required: true
  },
  departmentEmail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("OfflineMessage", schema);