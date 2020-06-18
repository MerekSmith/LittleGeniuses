const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarouselSchema = new Schema({
  image: {
    data: Buffer,
    contentType: String
  },
  header: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  link: {
    type: String
  },
  linkName: {
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

module.exports = Carousel = mongoose.model("carousel", CarouselSchema);
