import React, { Component } from "react";
import { DeleteForever, ArrowUpward, ArrowDownward } from "@material-ui/icons";

import UploadForm from "./UploadForm";

class EditIcons extends Component {
  handleDeleteClick = id => {
    this.props.deleteProgram(id);
  };

  render() {
    const { program, addProgram, getPrograms, updateProgram } = this.props;

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
        <ArrowUpward className='move-up-icon' fontSize='large' />
        <ArrowDownward className='move-down-icon' fontSize='large' />
        <DeleteForever
          className='delete-icon'
          fontSize='large'
          onClick={() => this.handleDeleteClick(program.mongoId)}
        />
      </div>
    );
  }
}

export default EditIcons;
