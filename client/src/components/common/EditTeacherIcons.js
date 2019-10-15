import React, { Component } from "react";
import { DeleteForever, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadTeacherForm from "./UploadTeacherForm";

class EditTeacherIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteTeacher(id);
    this.props.getTeachers();
  };

  handleMoveUp = id => {
    let moveDirection = { orderMove: "up" };
    axios.put(`/api/teachers/order/${id}`, moveDirection).then(res => {
      this.props.getTeachers();
    });
  };

  handleMoveDown = id => {
    let moveDirection = { orderMove: "down" };
    axios.put(`/api/teachers/order/${id}`, moveDirection).then(res => {
      this.props.getTeachers();
    });
  };

  render() {
    const {
      teacher,
      isLastTeacher,
      addTeacher,
      getTeachers,
      updateTeacher
    } = this.props;
    const { mongoId, teacherIndex } = teacher;
    const isFirstTeacher = teacherIndex === 0;

    return (
      <div className='edit-icons rounded'>
        {/* Add upload form */}
        <UploadTeacherForm
          teacher={teacher}
          addTeacher={addTeacher}
          getTeachers={getTeachers}
        />
        {/* Edit upload form */}
        <UploadTeacherForm
          editMode={true}
          teacher={teacher}
          addTeacher={addTeacher}
          getTeachers={getTeachers}
          updateTeacher={updateTeacher}
        />
        {/* Does not show up for the first teacher */}
        {!isFirstTeacher && (
          <ArrowUpward
            className='move-up-icon'
            fontSize='large'
            onClick={() => this.handleMoveUp(mongoId)}
          />
        )}
        {/* Does not show up for the last teacher */}
        {!isLastTeacher && (
          <ArrowDownward
            className='move-down-icon'
            fontSize='large'
            onClick={() => this.handleMoveDown(mongoId)}
          />
        )}
        <DeleteForever
          className='delete-icon'
          fontSize='large'
          onClick={() => this.handleDeleteClick(mongoId)}
        />
      </div>
    );
  }
}

export default EditTeacherIcons;
