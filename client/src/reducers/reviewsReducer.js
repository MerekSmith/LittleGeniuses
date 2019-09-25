import { GET_REVIEWS } from "../actions/types";

const intitalState = {
  reviews: null,
  rating: "",
  reviewCount: ""
};

export default function(state = intitalState, action) {
  switch (action.type) {
    // case PROFILE_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case GET_REVIEWS:
      const { reviews, rating, user_ratings_total } = action.payload;
      return {
        ...state,
        reviews,
        rating,
        reviewCount: user_ratings_total
      };
    default:
      return state;
  }
}
