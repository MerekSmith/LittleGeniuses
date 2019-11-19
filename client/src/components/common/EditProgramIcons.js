import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadProgramForm from "./UploadProgramForm";
import DeleteAlert from "./DeleteAlert";

class EditProgramIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteProgram(id);
    this.props.getPrograms();
  };

  handleMove = (id, direction) => {
    let moveDirection = { orderMove: direction };
    axios.put(`/api/programs/order/${id}`, moveDirection).then(res => {
      this.props.getPrograms();
    });
  };

  render() {
    const { program, isLastProgram, addProgram, updateProgram } = this.props;
    const { mongoId } = program;
    const isFirstProgram = program.programIndex === 0;

    return (
      <div className='edit-icons rounded' style={{ zIndex: 999 }}>
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
            onClick={() => this.handleMoveUp(mongoId, "up")}
          />
        )}
        {/* Does not show up for the last program */}
        {!isLastProgram && (
          <ArrowDownward
            className='move-down-icon'
            fontSize='large'
            onClick={() => this.handleMoveDown(mongoId, "down")}
          />
        )}
        <DeleteAlert confirmDelete={this.handleDeleteClick} mongoId={mongoId} />
      </div>
    );
  }
}

export default EditProgramIcons;
