import {
  GET_CAROUSEL_SLIDES,
  ADD_CAROUSEL_SLIDE,
  UPDATE_CAROUSEL_SLIDE,
  DELETE_CAROUSEL_SLIDE
} from "../actions/types";

const intitalState = {
  slides: null,
  originURL:
    process.env.NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:5000"
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_CAROUSEL_SLIDES:
      return {
        ...state,
        slides: action.payload
      };
    case ADD_CAROUSEL_SLIDE:
      return {
        ...state,
        slides: [...state.slides, action.payload]
      };
    case UPDATE_CAROUSEL_SLIDE:
      let slides = [...state.slides];
      let slideIndex = slides.findIndex(slide => {
        return slide._id === action.payload._id;
      });
      slides[slideIndex] = action.payload;
      return {
        ...state,
        slides
      };
    case DELETE_CAROUSEL_SLIDE:
      return {
        ...state,
        slides: state.slides.filter(slide => slide._id !== action.payload)
      };
    default:
      return state;
  }
}
