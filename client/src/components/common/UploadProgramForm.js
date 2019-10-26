import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  Slide
} from "@material-ui/core";
import { Edit, AddBox } from "@material-ui/icons";

import isEmpty from "../../validation/is-empty";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class UploadProgramForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      header: "",
      description: [""],
      image: null,
      textColor: "",
      editMode: false,
      mongoId: "",
      errors: {}
    };
  }

  componentDidMount = () => {
    const { editMode = false, program } = this.props;

    // If editMode is true, it will set the state to the program that is selected so the fields are populated.
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
        mongoId: "",
        errors: {}
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

  handleFileChange = e => {
    console.log(e.target.files[0]);
    let image = e.target.files[0] || {};
    // if (!image) {
    //   image.type = null;
    // }
    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/svg"
    ) {
      this.setState(({ errors }) => ({
        image,
        errors: {
          ...errors,
          image: undefined
        }
      }));
    } else {
      this.setState(({ errors }) => ({
        image: null,
        errors: {
          ...errors,
          image: "The image must be in jpg, svg, or png format"
        }
      }));
    }
  };

  newDescLine = () => {
    this.setState(({ description }) => ({
      description: [...description, ""]
    }));
  };

  removeDescLine = () => {
    // Remove last array index from description array.
    if (this.state.description.length > 1) {
      this.setState(({ description }) => ({
        description: description.filter((desc, index) => {
          return index !== description.length - 1;
        })
      }));
    }
  };

  handleSubmit = () => {
    const {
      header,
      description,
      image,
      textColor,
      editMode,
      mongoId,
      errors
    } = this.state;
    const { addProgram, updateProgram } = this.props;

    if (!image && !editMode) {
      this.setState(({ errors }) => ({
        errors: { ...errors, image: "An image is required" }
      }));
    }

    if (isEmpty(header)) {
      this.setState(({ errors }) => ({
        errors: { ...errors, header: "Header field is required" }
      }));
    }

    if (isEmpty(description)) {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          description: "The first description field is required"
        }
      }));
    }

    // Check if all errors are clear then move on to submitting form. Otherwise, do not submit.
    if (!isEmpty(errors)) {
      // TODO: add error snackbar that tells to deal with errors?
      return;
    }

    // Create formData to send over with post request. Needs to be in this format due to image.
    let program = new FormData();
    program.append("image", image);
    program.append("header", header);
    program.append("textColor", textColor);
    // Loop through description array and append each index element.
    for (let i = 0; i < description.length; i++) {
      program.append("description", description[i]);
    }

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
      editMode = false,
      errors
    } = this.state;
    const { adminPage } = this.props;
    const isMultiLineDesc = description.length > 1;

    return (
      <div>
        {/* This top portion determines if it is in edit mode and provides either the edit or addbox icon on the EditIcons component. */}
        {editMode ? (
          <Edit
            className='edit-icon'
            fontSize='large'
            onClick={this.handleClickOpen}
          />
        ) : adminPage ? (
          <Button
            variant='outlined'
            color='primary'
            onClick={this.handleClickOpen}
          >
            Add Program
          </Button>
        ) : (
          <AddBox
            className='add-icon'
            fontSize='large'
            onClick={this.handleClickOpen}
          />
        )}
        <Dialog
          open={open}
          TransitionComponent={Transition}
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
              <DialogContentText>
                Image must be jpeg, png, or svg format.
              </DialogContentText>
              <TextField
                autoFocus
                required
                error={errors.image}
                margin='dense'
                id='image'
                label='Choose Image'
                type='file'
                name='image'
                fullWidth
                onChange={this.handleFileChange}
              />
              {errors.image && (
                <h6 style={{ color: "red", margin: 0 }}>{errors.image}</h6>
              )}
              <TextField
                required
                error={errors.header}
                margin='dense'
                id='header'
                label='Header'
                name='header'
                type='text'
                value={header}
                fullWidth
                onChange={this.handleChange}
              />
              {errors.header && (
                <h6 style={{ color: "red", margin: 0 }}>{errors.header}</h6>
              )}
              <TextField
                margin='dense'
                id='textColor'
                label='Header Text Color, *defaults to black'
                name='textColor'
                type='text'
                value={textColor}
                fullWidth
                onChange={this.handleChange}
              />
              {description.map((desc, index) => {
                return (
                  <React.Fragment key={index}>
                    <TextField
                      required
                      error={errors.description && index === 0}
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
                    />
                    {errors.description && index === 0 && (
                      <h6 style={{ color: "red", margin: 0 }}>
                        {errors.description}
                      </h6>
                    )}
                  </React.Fragment>
                );
              })}
              <Icon onClick={this.newDescLine} className='add-bio-line-icon'>
                add_circle
              </Icon>
              {isMultiLineDesc && (
                <Icon
                  onClick={this.removeDescLine}
                  className='remove-bio-line-icon'
                >
                  remove_circle
                </Icon>
              )}
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

export default UploadProgramForm;
