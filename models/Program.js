const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProgramSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  textColor: {
    type: String
  },
  order: {
    type: Number,
    required: true
  }
});

module.exports = Program = mongoose.model("program", ProgramSchema);
