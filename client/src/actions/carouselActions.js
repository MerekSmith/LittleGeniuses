import axios from "axios";
import {
  GET_CAROUSEL_SLIDES,
  ADD_CAROUSEL_SLIDE,
  UPDATE_CAROUSEL_SLIDE,
  DELETE_CAROUSEL_SLIDE
} from "./types";

// Get all carousel slides from mongodb
export const getCarouselSlides = () => dispatch => {
  axios
    .get("/api/carousel")
    .then(res => {
      dispatch({
        type: GET_CAROUSEL_SLIDES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_CAROUSEL_SLIDES,
        payload: {}
      })
    );
};

// add a new carousel slide into mongodb
export const addCarouselSlide = slide => dispatch => {
  axios.post("/api/carousel", slide).then(res => {
    dispatch({
      type: ADD_CAROUSEL_SLIDE,
      payload: res.data
    });
    alert("Slide has been successfully added");
  });
};

// update an existing program in mongodb
export const updateCarouselSlide = (id, slide) => dispatch => {
  axios.put(`/api/carousel/${id}`, slide).then(res => {
    dispatch({
      type: UPDATE_CAROUSEL_SLIDE,
      payload: res.data
    });
    alert("Slide has been successfully updated");
  });
};

// remove a program from mongodb
export const deleteCarouselSlide = id => dispatch => {
  axios.delete(`/api/carousel/${id}`).then(res => {
    dispatch({
      type: DELETE_CAROUSEL_SLIDE,
      payload: id
    });
    alert("Slide has been successfully deleted");
  });
};
