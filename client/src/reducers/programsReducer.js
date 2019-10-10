import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from "../actions/types";

const intitalState = {
  programs: null,
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
        programs: [...state.programs, action.payload]
      };
    case UPDATE_PROGRAM:
      let programs = [...state.programs];
      let programIndex = programs.findIndex(program => {
        return program._id === action.payload._id;
      });
      programs[programIndex] = action.payload;
      return {
        ...state,
        programs
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        programs: state.programs.filter(
          program => program._id !== action.payload
        )
      };
    default:
      return state;
  }
}
