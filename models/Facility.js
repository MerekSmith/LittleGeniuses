const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FacilitySchema = new Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  image: {
    data: Buffer,
    ContentType: String
  },
  legend: {
    type: String
  },
  order: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Facility = mongoose.model("facility", FacilitySchema);
