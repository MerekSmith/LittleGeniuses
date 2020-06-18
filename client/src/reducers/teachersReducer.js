import * as helpers from "../utils/helpers";

import {
  GET_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  TEACHER_SUCCESS_ALERT_CLOSE,
  ERROR
} from "../actions/types";

const intitalState = {
  teachers: [],
  teacherSuccessOpen: false,
  teacherErrorOpen: false,
  teacherSuccessMessage: ""
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_TEACHERS:
      let newTeachers = action.payload;
      newTeachers.forEach(teacher => {
        const base64Flag = `data:${teacher.image.contentType};base64,`;
        const imgString = helpers.arrayBufferToBase64(teacher.image.data.data);
        teacher.imageUrl = base64Flag + imgString;
      });
      return {
        ...state,
        teachers: newTeachers
      };
    case ADD_TEACHER:
      const newTeacher = action.payload;
      const addBase64Flag = `data:${newTeacher.image.contentType};base64,`;
      const addImgString = helpers.arrayBufferToBase64(
        newTeacher.image.data.data
      );
      newTeacher.imageUrl = addBase64Flag + addImgString;
      return {
        ...state,
        teachers: [...state.teachers, newTeacher],
        teacherSuccessOpen: true,
        teacherSuccessMessage: "The teacher has been sucessfully added!"
      };
    case UPDATE_TEACHER:
      let teachers = [...state.teachers];
      let teacherIndex = teachers.findIndex(teacher => {
        return teacher._id === action.payload._id;
      });
      teachers[teacherIndex] = action.payload;

      const updateBase64Flag = `data:${teachers[teacherIndex].image.contentType};base64,`;
      const updateImgString = helpers.arrayBufferToBase64(
        teachers[teacherIndex].image.data.data
      );
      teachers[teacherIndex].imageUrl = updateBase64Flag + updateImgString;
      return {
        ...state,
        teachers,
        teacherSuccessOpen: true,
        teacherSuccessMessage: "The teacher has been sucessfully updated!"
      };
    case DELETE_TEACHER:
      return {
        ...state,
        teachers: state.teachers.filter(
          teacher => teacher._id !== action.payload
        ),
        teacherSuccessOpen: true,
        teacherSuccessMessage: "The teacher has been sucessfully deleted!"
      };
    case TEACHER_SUCCESS_ALERT_CLOSE:
      return {
        ...state,
        teacherSuccessOpen: false
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
