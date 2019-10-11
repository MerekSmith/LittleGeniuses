import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon
} from "@material-ui/core";
import { Edit, AddBox } from "@material-ui/icons";

// import axios from "axios";

class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      header: "",
      description: [""],
      image: null,
      textColor: "",
      editMode: false,
      mongoId: ""
    };
  }

  componentDidMount = () => {
    // If editMode is true, it will set the state to the program that is selected so the fields are populated.
    const { editMode = false, program } = this.props;

    if (editMode) {
      const {
        header,
        description,
        textColor,
        image,
        programIndex,
        mongoId
      } = program;

      this.setState({
        header,
        description,
        textColor,
        imagePath: image,
        programIndex,
        editMode,
        mongoId
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCancel = () => {
    // This is linked to the cancel button. Will clear out the form if using a new program form but will only close it if using the edit form.

    if (this.state.editMode) {
      this.handleClose();
    } else {
      this.setState({
        open: false,
        header: "",
        description: [""],
        image: null,
        textColor: "",
        mongoId: ""
      });
    }
  };

  handleChange = e => {
    if (e.target.id === "description") {
      const index = e.target.parentElement.parentElement.dataset.index;
      let description = [...this.state.description];
      description[index] = e.target.value;
      this.setState({ description });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  // handleDescChange = this.setState()

  handleFileChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  newDescLine = () => {
    this.setState(({ description }) => ({
      description: [...description, ""]
    }));
  };

  handleSubmit = () => {
    const {
      header,
      description,
      image,
      textColor,
      editMode,
      mongoId
    } = this.state;
    const { addProgram, getPrograms, updateProgram } = this.props;

    // Create formData to send over with post request. Needs to be in this format due to image.
    let program = new FormData();
    program.append("image", image);
    program.append("header", header);
    program.append("textColor", textColor);
    // Loop through description array and append each index element.
    for (let i = 0; i < description.length; i++) {
      program.append("description", description[i]);
    }

    // TODO: put axios actions in programsAction file. Add edit action and route.

    if (editMode) {
      // update program action request
      updateProgram(mongoId, program);
      this.handleClose();
    } else {
      // post program action request.
      addProgram(program);
      this.handleCancel();
    }
  };

  render() {
    const {
      open,
      header,
      description,
      textColor,
      editMode = false
    } = this.state;

    return (
      <div>
        {editMode ? (
          <Edit
            className='edit-icon'
            fontSize='large'
            onClick={this.handleClickOpen}
          />
        ) : (
          <AddBox
            className='add-icon'
            fontSize='large'
            onClick={this.handleClickOpen}
          />
        )}
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Create New Program</DialogTitle>
          <form autoComplete='off'>
            <DialogContent>
              <DialogContentText>
                To create a new program, please provide an image, Header,
                Description, and a color for the Header text.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin='dense'
                id='image'
                label='Choose Image'
                type='file'
                name='image'
                fullWidth
                onChange={this.handleFileChange}
              />
              <TextField
                required
                margin='dense'
                id='header'
                label='Header'
                name='header'
                type='text'
                value={header}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                required
                margin='dense'
                id='textColor'
                label='Header Text Color'
                name='textColor'
                type='text'
                value={textColor}
                fullWidth
                onChange={this.handleChange}
              />
              {description.map((desc, index) => {
                return (
                  <TextField
                    required
                    margin='dense'
                    id='description'
                    data-index={index}
                    label='Description'
                    name='description'
                    type='text'
                    value={desc}
                    fullWidth
                    multiline
                    rows='2'
                    rowsMax='4'
                    onChange={this.handleChange}
                    key={index}
                  />
                );
              })}
              <Icon color='primary' onClick={this.newDescLine}>
                add_circle
              </Icon>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCancel} color='primary'>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color='primary'>
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default UploadForm;
