import * as helpers from "../utils/helpers";

import {
  GET_CAROUSEL_SLIDES,
  ADD_CAROUSEL_SLIDE,
  UPDATE_CAROUSEL_SLIDE,
  DELETE_CAROUSEL_SLIDE,
  CAROUSEL_SUCCESS_ALERT_CLOSE,
  ERROR
} from "../actions/types";

const intitalState = {
  slides: [],
  carouselSuccessOpen: false,
  carouselErrorOpen: false,
  carouselAlertMessage: ""
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_CAROUSEL_SLIDES:
      let newSlides = action.payload;
      newSlides.forEach(slide => {
        const base64Flag = `data:${slide.image.contentType};base64,`;
        const imgString = helpers.arrayBufferToBase64(slide.image.data.data);
        slide.imageUrl = base64Flag + imgString;
      });
      return {
        ...state,
        slides: newSlides
      };
    case ADD_CAROUSEL_SLIDE:
      const newSlide = action.payload;
      const addBase64Flag = `data:${newSlide.image.contentType};base64,`;
      const addImgString = helpers.arrayBufferToBase64(
        newSlide.image.data.data
      );
      newSlide.imageUrl = addBase64Flag + addImgString;
      return {
        ...state,
        slides: [...state.slides, newSlide],
        carouselSuccessOpen: true,
        carouselAlertMessage: "The carousel slide has been sucessfully added!"
      };
    case UPDATE_CAROUSEL_SLIDE:
      let slides = [...state.slides];
      let slideIndex = slides.findIndex(slide => {
        return slide._id === action.payload._id;
      });
      slides[slideIndex] = action.payload;

      const updateBase64Flag = `data:${slides[slideIndex].image.contentType};base64,`;
      const updateImgString = helpers.arrayBufferToBase64(
        slides[slideIndex].image.data.data
      );
      slides[slideIndex].imageUrl = updateBase64Flag + updateImgString;
      return {
        ...state,
        slides,
        carouselSuccessOpen: true,
        carouselAlertMessage: "The carousel slide has been sucessfully updated!"
      };
    case DELETE_CAROUSEL_SLIDE:
      return {
        ...state,
        slides: state.slides.filter(slide => slide._id !== action.payload),
        carouselSuccessOpen: true,
        carouselAlertMessage: "The carousel slide has been sucessfully deleted!"
      };
    case CAROUSEL_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        carouselSuccessOpen: false,
        carouselErrorOpen: false,
        carouselAlertMessage: ""
      };
    case ERROR:
      return {
        ...state,
        carouselErrorOpen: true,
        carouselAlertMessage: action.message
      };
    default:
      return state;
  }
}
