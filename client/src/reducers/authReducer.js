import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  PASSWORD_RESET_SUCCESS_ALERT_CLOSE
} from "../actions/types";

const intitalState = {
  isAuthenticated: false,
  user: {},
  passwordResetSuccessMessage: false
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case PASSWORD_RESET_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        carouselSuccessOpen: false
      };
    default:
      return state;
  }
}
