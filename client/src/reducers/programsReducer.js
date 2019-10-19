import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM,
  PROGRAM_SUCCESS_ALERT_CLOSE
} from "../actions/types";

const intitalState = {
  programs: null,
  programSuccessOpen: false,
  programSuccessMessage: "",
  originURL:
    process.env.NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:5000"
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_PROGRAMS:
      return {
        ...state,
        programs: action.payload
      };
    case ADD_PROGRAM:
      return {
        ...state,
        programs: [...state.programs, action.payload],
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully added!"
      };
    case UPDATE_PROGRAM:
      let programs = [...state.programs];
      let programIndex = programs.findIndex(program => {
        return program._id === action.payload._id;
      });
      programs[programIndex] = action.payload;
      return {
        ...state,
        programs,
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully updated!"
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        programs: state.programs.filter(
          program => program._id !== action.payload
        ),
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully deleted!"
      };
    case PROGRAM_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        programSuccessOpen: false
      };
    default:
      return state;
  }
}
