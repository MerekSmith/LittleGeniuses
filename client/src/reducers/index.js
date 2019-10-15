import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import reviewsReducer from "./reviewsReducer";
import programsReducer from "./programsReducer";
import teachersReducer from "./teachersReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  reviews: reviewsReducer,
  programs: programsReducer,
  teachers: teachersReducer
});
