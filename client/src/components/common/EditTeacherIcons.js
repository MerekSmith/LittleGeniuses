import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadTeacherForm from "./UploadTeacherForm";
import DeleteAlert from "./DeleteAlert";
import BackdropLoader from "./BackdropLoader";

class EditTeacherIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handleDeleteClick = id => {
    this.setState({ isLoading: true });
    this.props.deleteTeacher(id).then(() => {
      this.props.getTeachers().then(() => this.setState({ isLoading: false }));
    });
  };

  handleMove = (id, direction) => {
    this.setState({ isLoading: true });
    let moveDirection = { orderMove: direction };
    axios.put(`/api/teachers/order/${id}`, moveDirection).then(res => {
      this.props.getTeachers().then(() => this.setState({ isLoading: false }));
    });
  };

  render() {
    const { teacher, isLastTeacher, addTeacher, updateTeacher } = this.props;
    const { isLoading } = this.state;
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
            onClick={() => this.handleMove(mongoId, "up")}
          />
        )}
        {/* Does not show up for the last teacher */}
        {!isLastTeacher && (
          <ArrowDownward
            className='move-down-icon'
            fontSize='large'
            onClick={() => this.handleMove(mongoId, "down")}
          />
        )}
        <DeleteAlert confirmDelete={this.handleDeleteClick} mongoId={mongoId} />
        <BackdropLoader open={isLoading} />
      </div>
    );
  }
}

export default EditTeacherIcons;
