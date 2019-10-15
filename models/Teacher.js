const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  bio: {
    type: Array,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  }
});

module.exports = Teacher = mongoose.model("teacher", TeacherSchema);
