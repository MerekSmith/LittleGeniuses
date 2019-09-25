import axios from "axios";
import { GET_REVIEWS } from "../actions/types";

// Get reviews from google places API via the server side
export const getReviews = () => dispatch => {
  axios
    .get("/reviews")
    .then(res =>
      dispatch({
        type: GET_REVIEWS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REVIEWS,
        payload: {}
      })
    );
};
