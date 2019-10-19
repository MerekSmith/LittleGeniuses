import {
  GET_TEACHERS,
  ADD_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
  TEACHER_SUCCESS_ALERT_CLOSE
} from "../actions/types";

const intitalState = {
  teachers: null,
  teacherSuccessOpen: false,
  teacherSuccessMessage: "",
  originURL:
    process.env.NODE_ENV === "production"
      ? window.location.origin
      : "http://localhost:5000"
};

export default function(state = intitalState, action) {
  switch (action.type) {
    case GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload
      };
    case ADD_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
        teacherSuccessOpen: true,
        teacherSuccessMessage: "The teacher has been sucessfully added!"
      };
    case UPDATE_TEACHER:
      let teachers = [...state.teachers];
      let teacherIndex = teachers.findIndex(teacher => {
        return teacher._id === action.payload._id;
      });
      teachers[teacherIndex] = action.payload;
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
    default:
      return state;
  }
}
