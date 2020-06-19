import * as helpers from "../utils/helpers";

import {
  GET_FACILITY_SLIDES,
  ADD_FACILITY_SLIDE,
  UPDATE_FACILITY_SLIDE,
  DELETE_FACILITY_SLIDE,
  FACILITY_SUCCESS_ALERT_CLOSE,
  ERROR
} from "../actions/types";

const intitalState = {
  slides: [],
  facilitySuccessOpen: false,
  facilityErrorOpen: false,
  facilitySuccessMessage: ""
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_FACILITY_SLIDES:
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
    case ADD_FACILITY_SLIDE:
      const newSlide = action.payload;
      const addBase64Flag = `data:${newSlide.image.contentType};base64,`;
      const addImgString = helpers.arrayBufferToBase64(
        newSlide.image.data.data
      );
      newSlide.imageUrl = addBase64Flag + addImgString;
      return {
        ...state,
        slides: [...state.slides, newSlide],
        facilitySuccessOpen: true,
        facilitySuccessMessage: "The facility slide has been sucessfully added!"
      };
    case UPDATE_FACILITY_SLIDE:
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
        facilitySuccessOpen: true,
        facilitySuccessMessage:
          "The facility slide has been sucessfully updated!"
      };
    case DELETE_FACILITY_SLIDE:
      return {
        ...state,
        slides: state.slides.filter(slide => slide._id !== action.payload),
        facilitySuccessOpen: true,
        facilitySuccessMessage:
          "The facility slide has been sucessfully deleted!"
      };
    case FACILITY_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        facilitySuccessOpen: false,
        facilityErrorOpen: false,
        facilitySuccessMessage: ""
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
