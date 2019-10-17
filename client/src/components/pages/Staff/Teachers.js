import React, { Component } from "react";
import { connect } from "react-redux";
import { Row } from "react-bootstrap";
import {
  getTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher
} from "../../../actions/teachersActions.js";

import Teacher from "./Teacher";
import Loader from "../../common/Loader";

class Teachers extends Component {
  render() {
    const { teachers, originURL } = this.props.teachers;
    const { isAuthenticated } = this.props.auth;

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
                    image={imagePath}
                    name={name}
                    position={position}
                    bio={bio}
                    order={order}
                    mongoId={_id}
                    teacherIndex={index}
                    key={index}
                    isLastTeacher={isLastTeacher}
                    getTeachers={this.props.getTeachers}
                    addTeacher={this.props.addTeacher}
                    deleteTeacher={this.props.deleteTeacher}
                    updateTeacher={this.props.updateTeacher}
                    isAuthenticated={isAuthenticated}
                  />
                );
              }
            )}
          </Row>
        ) : (
          <Loader />
        )}
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
  { getTeachers, addTeacher, deleteTeacher, updateTeacher }
)(Teachers);
