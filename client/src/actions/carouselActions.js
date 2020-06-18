import axios from "axios";
import {
  GET_CAROUSEL_SLIDES,
  ADD_CAROUSEL_SLIDE,
  UPDATE_CAROUSEL_SLIDE,
  DELETE_CAROUSEL_SLIDE,
  CAROUSEL_SUCCESS_ALERT_CLOSE,
  ERROR
} from "./types";

// Get all carousel slides from mongodb
export const getCarouselSlides = () => dispatch => {
  return axios
    .get("/api/carousel")
    .then(res => {
      dispatch({
        type: GET_CAROUSEL_SLIDES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CAROUSEL_SLIDES,
        payload: {}
      });
    });
};

// add a new carousel slide into mongodb
export const addCarouselSlide = slide => dispatch => {
  return axios
    .post("/api/carousel", slide)
    .then(res => {
      dispatch({
        type: ADD_CAROUSEL_SLIDE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error adding a carousel slide."
      });
    });
};

// update an existing carousel slide in mongodb
export const updateCarouselSlide = (id, slide) => dispatch => {
  return axios
    .put(`/api/carousel/${id}`, slide)
    .then(res => {
      dispatch({
        type: UPDATE_CAROUSEL_SLIDE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error updating the carousel slide."
      });
    });
};

// remove a carousel slide from mongodb
export const deleteCarouselSlide = id => dispatch => {
  return axios
    .delete(`/api/carousel/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_CAROUSEL_SLIDE,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        message: "There was an error deleting the carousel slide."
      });
    });
};

export const carouselSuccessAlertClose = (event, reason) => dispatch => {
  if (reason === "clickaway") {
    return;
  }
  dispatch({
    type: CAROUSEL_SUCCESS_ALERT_CLOSE
  });
};
