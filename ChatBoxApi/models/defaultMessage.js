const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  type: { type: String, require: true },
  message: { type: String, require: true },
  channelCode: { type: String, required: true }
});

module.exports = mongoose.model("DefaultMessage", schema);
