import React, { Component } from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import {
  getTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher,
  teacherSuccessAlertClose
} from "../../../actions/teachersActions.js";

import Teacher from "./Teacher";
import Loader from "../../common/Loader";
import SuccessAlert from "../../common/SuccessAlert";

class Teachers extends Component {
  render() {
    const {
      teachers,
      originURL,
      teacherSuccessOpen,
      teacherSuccessMessage
    } = this.props.teachers;
    const { isAuthenticated } = this.props.auth;
    const {
      getTeachers,
      addTeacher,
      deleteTeacher,
      updateTeacher,
      teacherSuccessAlertClose
    } = this.props;

    return (
      <div className='teachers-container'>
        <h1 className='page-header'>Meet Our Teachers</h1>
        {teachers ? (
          <Row className='teachers'>
            {teachers.map(
              ({ name, position, bio, imagePath, order, _id }, index) => {
                const isLastTeacher = index + 1 === teachers.length;
                return (
                  <Teacher
                    image={originURL + imagePath}
                    name={name}
                    position={position}
                    bio={bio}
                    order={order}
                    mongoId={_id}
                    teacherIndex={index}
                    key={index}
                    isLastTeacher={isLastTeacher}
                    getTeachers={getTeachers}
                    addTeacher={addTeacher}
                    deleteTeacher={deleteTeacher}
                    updateTeacher={updateTeacher}
                    isAuthenticated={isAuthenticated}
                  />
                );
              }
            )}
          </Row>
        ) : (
          <Loader />
        )}
        <SuccessAlert
          successOpen={teacherSuccessOpen}
          handleSuccessClose={teacherSuccessAlertClose}
          message={teacherSuccessMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  teachers: state.teachers,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getTeachers,
    addTeacher,
    deleteTeacher,
    updateTeacher,
    teacherSuccessAlertClose
  }
)(Teachers);
