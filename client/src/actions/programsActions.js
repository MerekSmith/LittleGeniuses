import axios from "axios";
import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM,
  PROGRAM_SUCCESS_ALERT_CLOSE,
  ERROR
} from "./types";

// Get all programs from mongodb
export const getPrograms = () => dispatch => {
  return axios
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

// add a new program into mongodb
export const addProgram = program => dispatch => {
  return axios.post("/api/programs", program).then(res => {
    dispatch({
      type: ADD_PROGRAM,
      payload: res.data
    }).catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error adding a program."
      });
    });
  });
};

// update an existing program in mongodb
export const updateProgram = (id, program) => dispatch => {
  return axios
    .put(`/api/programs/${id}`, program)
    .then(res => {
      dispatch({
        type: UPDATE_PROGRAM,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error updating a program."
      });
    });
};

// remove a program from mongodb
export const deleteProgram = id => dispatch => {
  return axios
    .delete(`/api/programs/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PROGRAM,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error deleting a program."
      });
    });
};

export const programSuccessAlertClose = (event, reason) => dispatch => {
  if (reason === "clickaway") {
    return;
  }
  dispatch({
    type: PROGRAM_SUCCESS_ALERT_CLOSE
  });
};
