import React, { Component } from "react";
import { DeleteForever, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadProgramForm from "./UploadProgramForm";

class EditProgramIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteProgram(id);
    this.props.getPrograms();
  };

  handleMoveUp = id => {
    let moveDirection = { orderMove: "up" };
    axios.put(`/api/programs/order/${id}`, moveDirection).then(res => {
      this.props.getPrograms();
    });
  };

  handleMoveDown = id => {
    let moveDirection = { orderMove: "down" };
    axios.put(`/api/programs/order/${id}`, moveDirection).then(res => {
      this.props.getPrograms();
    });
  };

  render() {
    const { program, isLastProgram, addProgram, updateProgram } = this.props;
    const { mongoId } = program;
    const isFirstProgram = program.programIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 2 }}>
        {/* Add upload form */}
        <UploadProgramForm addProgram={addProgram} />
        {/* Edit upload form */}
        <UploadProgramForm
          editMode={true}
          program={program}
          addProgram={addProgram}
          updateProgram={updateProgram}
        />
        {/* Does not show up for the first program */}
        {!isFirstProgram && (
          <ArrowUpward
            className='move-up-icon'
            fontSize='large'
            onClick={() => this.handleMoveUp(mongoId)}
          />
        )}
        {/* Does not show up for the last program */}
        {!isLastProgram && (
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

export default EditProgramIcons;
