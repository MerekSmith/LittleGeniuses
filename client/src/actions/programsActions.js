import axios from "axios";
import { GET_PROGRAMS } from "./types";

// Get reviews from google places API via the server side
export const getPrograms = () => dispatch => {
  axios
    .get("/api/programs")
    .then(res => {
      dispatch({
        type: GET_PROGRAMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROGRAMS,
        payload: {}
      })
    );
};
