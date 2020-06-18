import React, { Component } from "react";
import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import axios from "axios";

import UploadProgramForm from "./UploadProgramForm";
import DeleteAlert from "./DeleteAlert";
import BackdropLoader from "./BackdropLoader";

class EditProgramIcons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  handleDeleteClick = id => {
    this.setState({ isLoading: true });
    this.props.deleteProgram(id).then(() => {
      this.props.getPrograms().then(() => this.setState({ isLoading: false }));
    });
  };

  handleMove = (id, direction) => {
    this.setState({ isLoading: true });
    let moveDirection = { orderMove: direction };
    axios.put(`/api/programs/order/${id}`, moveDirection).then(res => {
      this.props.getPrograms().then(() => this.setState({ isLoading: false }));
    });
  };

  render() {
    const { program, isLastProgram, addProgram, updateProgram } = this.props;
    const { isLoading } = this.state;
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
            onClick={() => this.handleMove(mongoId, "up")}
          />
        )}
        {/* Does not show up for the last program */}
        {!isLastProgram && (
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

export default EditProgramIcons;
