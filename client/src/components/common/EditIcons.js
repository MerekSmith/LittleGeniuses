import React, { Component } from "react";
import { DeleteForever, ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadForm from "./UploadForm";

class EditIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteProgram(id);
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
    const { program, addProgram, getPrograms, updateProgram } = this.props;
    const { mongoId } = program;

    return (
      <div className='edit-icons rounded'>
        {/* Add upload form */}
        <UploadForm
          program={program}
          addProgram={addProgram}
          getPrograms={getPrograms}
        />
        {/* Edit upload form */}
        <UploadForm
          editMode={true}
          program={program}
          addProgram={addProgram}
          getPrograms={getPrograms}
          updateProgram={updateProgram}
        />
        <ArrowUpward
          className='move-up-icon'
          fontSize='large'
          onClick={() => this.handleMoveUp(mongoId)}
        />
        <ArrowDownward
          className='move-down-icon'
          fontSize='large'
          onClick={() => this.handleMoveDown(mongoId)}
        />
        <DeleteForever
          className='delete-icon'
          fontSize='large'
          onClick={() => this.handleDeleteClick(mongoId)}
        />
      </div>
    );
  }
}

export default EditIcons;
