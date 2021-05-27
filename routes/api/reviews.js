const express = require("express");
const router = express.Router();
const axios = require("axios");
const keys = require("../../config/keys");

const apiKey = keys.googleApiKey;
const placeIds = {
  midvale: "ChIJC9CH0myJUocRQSSLj5EUZtk",
  pleasantGrove: "ChIJE2ElRFeFTYcRGdlo3TRDfbY"
};
const fields = "reviews,rating,user_ratings_total";
const urlGet = placeId => `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&language=en&fields=${fields}&key=${apiKey}`;

// @route 	GET api/reviews
// @desc 		Gets Google Places API Reviews
// @access 	Public
router.get("/", async (req, res) => {
  let reviews = { rating: 0, reviews: [], user_ratings_total: 0 };
  let midvaleReviews = await axios.get(urlGet(placeIds.midvale));
  let pleasantGroveReviews = await axios.get(urlGet(placeIds.pleasantGrove));

  reviews = midvaleReviews.data.result ? midvaleReviews.data.result : reviews;
  if (pleasantGroveReviews.data.result) {
    const midvaleRatings = reviews.rating * reviews.user_ratings_total;
    const pleasantGroveRatings = pleasantGroveReviews.data.result.rating * pleasantGroveReviews.data.result.user_ratings_total;
    const totalReviews = reviews.user_ratings_total + pleasantGroveReviews.data.result.user_ratings_total;
    const combinedRating = (midvaleRatings + pleasantGroveRatings)/totalReviews;
    
    reviews.rating = combinedRating;
    reviews.reviews = [...reviews.reviews, ...pleasantGroveReviews.data.result.reviews];
    reviews.user_ratings_total = totalReviews;
  }

  midvaleReviews.data.result || pleasantGroveReviews.data.result
  ? res.json(reviews) 
  : res.status(404).json({ midvaleReviews: midvaleReviews.data.error_message, pleasantGroveReviews: pleasantGroveReviews.data.error_message });
});

module.exports = router;
