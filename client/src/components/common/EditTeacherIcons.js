import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadTeacherForm from "./UploadTeacherForm";
import DeleteAlert from "./DeleteAlert";

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
    const { teacher, isLastTeacher, addTeacher, updateTeacher } = this.props;
    const { mongoId, teacherIndex } = teacher;
    const isFirstTeacher = teacherIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 2 }}>
        {/* Add upload form */}
        <UploadTeacherForm addTeacher={addTeacher} />
        {/* Edit upload form */}
        <UploadTeacherForm
          editMode={true}
          teacher={teacher}
          addTeacher={addTeacher}
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
        <DeleteAlert confirmDelete={this.handleDeleteClick} mongoId={mongoId} />
      </div>
    );
  }
}

export default EditTeacherIcons;
