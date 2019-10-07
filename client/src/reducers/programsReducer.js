import { GET_PROGRAMS } from "../actions/types";

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
    default:
      return state;
  }
}
