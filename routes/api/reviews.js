const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/keys");

const apiKey = keys.googleApiKey;
const placeID = "ChIJC9CH0myJUocRQSSLj5EUZtk";
const fields = "reviews,rating,user_ratings_total";
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&language=en&fields=${fields}&key=${apiKey}`;

// @route 	GET api/reviews
// @desc 		Gets Google Places API Reviews
// @access 	Public
router.get("/", async (req, res) => {
  let reviews = await axios.get(url);
  res.json(reviews.data.result);
});

module.exports = router;
