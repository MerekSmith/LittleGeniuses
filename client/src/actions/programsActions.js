import axios from "axios";
import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM
} from "./types";

// Get all programs from mongodb
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

// add a new program into mongodb
export const addProgram = program => dispatch => {
  axios.post("/api/programs", program).then(res => {
    dispatch({
      type: ADD_PROGRAM,
      payload: res.data
    });
    alert("Program has been successfully added");
  });
};

// update an existing program in mongodb
export const updateProgram = (id, program) => dispatch => {
  axios.put(`/api/programs/${id}`, program).then(res => {
    dispatch({
      type: UPDATE_PROGRAM,
      payload: res.data
    });
    alert("Program has been successfully updated");
  });
};

// remove a program from mongodb
export const deleteProgram = id => dispatch => {
  axios.delete(`/api/programs/${id}`).then(res => {
    dispatch({
      type: DELETE_PROGRAM,
      payload: id
    });
    alert("Program has been successfully deleted");
  });
};
