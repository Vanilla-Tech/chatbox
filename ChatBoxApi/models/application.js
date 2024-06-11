const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, require: true },
  type: { type: String, require: true },
  sessionCode: { type: String, require: true },
  description: { type: String, require: true }
});

module.exports = mongoose.model("Application", schema);
