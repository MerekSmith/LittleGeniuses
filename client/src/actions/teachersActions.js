import axios from "axios";
import {
  GET_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER
} from "./types";

// Get reviews from google places API via the server side
export const getTeachers = () => dispatch => {
  axios
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
  axios.post("/api/teachers", teacher).then(res => {
    dispatch({
      type: ADD_TEACHER,
      payload: res.data
    });
    alert("Teacher has been successfully added");
  });
};

export const updateTeacher = (id, teacher) => dispatch => {
  axios.put(`/api/teachers/${id}`, teacher).then(res => {
    dispatch({
      type: UPDATE_TEACHER,
      payload: res.data
    });
    alert("Teacher has been successfully updated");
  });
};

export const deleteTeacher = id => dispatch => {
  console.log("delete hit");
  axios.delete(`/api/teachers/${id}`).then(res => {
    dispatch({
      type: DELETE_TEACHER,
      payload: id
    });
    alert("Teacher has been successfully deleted");
  });
};
