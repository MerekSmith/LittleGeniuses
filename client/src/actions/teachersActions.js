import axios from "axios";
import {
  GET_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  TEACHER_SUCCESS_ALERT_CLOSE,
  ERROR
} from "./types";

// Get reviews from google places API via the server side
export const getTeachers = () => dispatch => {
  return axios
    .get("/api/teachers")
    .then(res => {
      dispatch({
        type: GET_TEACHERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_TEACHERS,
        payload: {}
      })
    );
};

export const addTeacher = teacher => dispatch => {
  return axios
    .post("/api/teachers", teacher)
    .then(res => {
      dispatch({
        type: ADD_TEACHER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error adding a teacher."
      });
    });
};

export const updateTeacher = (id, teacher) => dispatch => {
  return axios
    .put(`/api/teachers/${id}`, teacher)
    .then(res => {
      dispatch({
        type: UPDATE_TEACHER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error updating a teacher."
      });
    });
};

export const deleteTeacher = id => dispatch => {
  return axios
    .delete(`/api/teachers/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_TEACHER,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error deleting a teacher."
      });
    });
};

export const teacherSuccessAlertClose = (event, reason) => dispatch => {
  if (reason === "clickaway") {
    return;
  }
  dispatch({
    type: TEACHER_SUCCESS_ALERT_CLOSE
  });
};
