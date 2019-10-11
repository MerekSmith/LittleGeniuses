import axios from "axios";
import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from "./types";

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

export const addProgram = program => dispatch => {
  axios.post("/api/programs", program).then(res => {
    dispatch({
      type: ADD_PROGRAM,
      payload: res.data
    });
  });
};

export const updateProgram = (id, program) => dispatch => {
  axios.put(`/api/programs/${id}`, program).then(res => {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: res.data
    });
  });
};

export const deleteProgram = id => dispatch => {
  console.log("delete hit");
  axios.delete(`/api/programs/${id}`).then(res =>
    dispatch({
      type: DELETE_PROGRAM,
      payload: id
    })
  );
};
