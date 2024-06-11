const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  year: {type: Number, required: true},
  month: {type: Number, required: true},
  runningNumber: {type: Number, required: true}
});

module.exports = mongoose.model("RunningNumber", schema);
