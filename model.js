const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TodoTask", todoSchema);
