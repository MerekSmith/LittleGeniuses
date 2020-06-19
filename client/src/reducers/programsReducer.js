import * as helpers from "../utils/helpers";

import {
  GET_PROGRAMS,
  ADD_PROGRAM,
  UPDATE_PROGRAM,
  DELETE_PROGRAM,
  PROGRAM_SUCCESS_ALERT_CLOSE,
  ERROR
} from "../actions/types";

const intitalState = {
  programs: [],
  programSuccessOpen: false,
  programErrorOpen: false,
  programSuccessMessage: ""
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_PROGRAMS:
      let newPrograms = action.payload;
      newPrograms.forEach(program => {
        const base64Flag = `data:${program.image.contentType};base64,`;
        const imgString = helpers.arrayBufferToBase64(program.image.data.data);
        program.imageUrl = base64Flag + imgString;
      });
      return {
        ...state,
        programs: newPrograms
      };
    case ADD_PROGRAM:
      const newProgram = action.payload;
      const addBase64Flag = `data:${newProgram.image.contentType};base64,`;
      const addImgString = helpers.arrayBufferToBase64(
        newProgram.image.data.data
      );
      newProgram.imageUrl = addBase64Flag + addImgString;
      return {
        ...state,
        programs: [...state.programs, newProgram],
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully added!"
      };
    case UPDATE_PROGRAM:
      let programs = [...state.programs];
      let programIndex = programs.findIndex(program => {
        return program._id === action.payload._id;
      });
      programs[programIndex] = action.payload;

      const updateBase64Flag = `data:${programs[programIndex].image.contentType};base64,`;
      const updateImgString = helpers.arrayBufferToBase64(
        programs[programIndex].image.data.data
      );
      programs[programIndex].imageUrl = updateBase64Flag + updateImgString;
      return {
        ...state,
        programs,
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully updated!"
      };
    case DELETE_PROGRAM:
      return {
        ...state,
        programs: state.programs.filter(
          program => program._id !== action.payload
        ),
        programSuccessOpen: true,
        programSuccessMessage: "The program has been sucessfully deleted!"
      };
    case PROGRAM_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        programSuccessOpen: false,
        programErrorOpen: false,
        programSuccessMessage: ""
      };
    case ERROR:
      return {
        ...state,
        carouselErrorOpen: true,
        carouselAlertMessage: action.message
      };
    default:
      return state;
  }
}
