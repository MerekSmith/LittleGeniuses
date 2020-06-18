import axios from "axios";
import {
  GET_FACILITY_SLIDES,
  ADD_FACILITY_SLIDE,
  UPDATE_FACILITY_SLIDE,
  DELETE_FACILITY_SLIDE,
  FACILITY_SUCCESS_ALERT_CLOSE,
  ERROR
} from "./types";

// Get all facility slides from mongodb
export const getFacilitySlides = () => dispatch => {
  return axios
    .get("/api/facility")
    .then(res => {
      dispatch({
        type: GET_FACILITY_SLIDES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_FACILITY_SLIDES,
        payload: {}
      })
    );
};

// add a new facility slide into mongodb
export const addFacilitySlide = slide => dispatch => {
  return axios
    .post("/api/facility", slide)
    .then(res => {
      dispatch({
        type: ADD_FACILITY_SLIDE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error adding a facility slide."
      });
    });
};

// update an existing facility slide in mongodb
export const updateFacilitySlide = (id, slide) => dispatch => {
  return axios
    .put(`/api/facility/${id}`, slide)
    .then(res => {
      dispatch({
        type: UPDATE_FACILITY_SLIDE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error updating the facility slide."
      });
    });
};

// remove a facility slide from mongodb
export const deleteFacilitySlide = id => dispatch => {
  return axios
    .delete(`/api/facility/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_FACILITY_SLIDE,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error deleting the facility slide."
      });
    });
};

export const facilitySuccessAlertClose = (event, reason) => dispatch => {
  if (reason === "clickaway") {
    return;
  }
  dispatch({
    type: FACILITY_SUCCESS_ALERT_CLOSE
  });
};
