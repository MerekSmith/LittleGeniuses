import {
  GET_FACILITY_SLIDES,
  ADD_FACILITY_SLIDE,
  UPDATE_FACILITY_SLIDE,
  DELETE_FACILITY_SLIDE,
  FACILITY_SUCCESS_ALERT_CLOSE
} from "../actions/types";

const intitalState = {
  slides: null,
  facilitySuccessOpen: false,
  facilitySuccessMessage: "",
  originURL:
    process.env.NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:5000"
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_FACILITY_SLIDES:
      return {
        ...state,
        slides: action.payload
      };
    case ADD_FACILITY_SLIDE:
      debugger;
      return {
        ...state,
        slides: [...state.slides, action.payload],
        facilitySuccessOpen: true,
        facilitySuccessMessage: "The facility slide has been sucessfully added!"
      };
    case UPDATE_FACILITY_SLIDE:
      let slides = [...state.slides];
      let slideIndex = slides.findIndex(slide => {
        return slide._id === action.payload._id;
      });
      slides[slideIndex] = action.payload;
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
        facilitySuccessMessage: ""
      };
    default:
      return state;
  }
}
