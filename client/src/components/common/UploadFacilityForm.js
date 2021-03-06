import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from "@material-ui/core";
import { Edit, AddBox } from "@material-ui/icons";
import BackdropLoader from "./BackdropLoader";
import isEmpty from "../../validation/is-empty";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class UploadFacilityForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      legend: "",
      image: null,
      editMode: false,
      mongoId: "",
      errors: {},
      isLoading: false
    };
  }

  componentDidMount = () => {
    const { editMode = false, slide } = this.props;

    // If editMode is true, it will set the state to the slide that is selected so the fields are populated.
    if (editMode) {
      const { legend, image, _id } = slide;

      this.setState({
        legend,
        image,
        editMode,
        mongoId: _id
      });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      legend: "",
      image: null,
      mongoId: "",
      errors: {},
      isLoading: false
    });
  };

  handleCancel = () => {
    // This is linked to the cancel button. Will clear out the form if using a new slide form but will only close it if using the edit form.

    if (this.state.editMode) {
      this.handleClose();
    } else {
      this.setState({
        open: false,
        legend: "",
        image: null,
        mongoId: "",
        errors: {}
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = e => {
    const file = e.target.files[0] || {};
    let image = {};

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/svg"
    ) {
      image.contentType = file.type;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result;
        image.data = [...new Uint8Array(arrayBuffer)];
      };
      this.setState({ image, errors: {} });
    } else {
      this.setState(({ errors }) => ({
        image: null,
        errors: {
          ...errors,
          image: true
        }
      }));
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const { legend, image, editMode, mongoId, errors } = this.state;
    const { addFacilitySlide, updateFacilitySlide } = this.props;

    // Check if all errors are clear then move on to submitting form. Otherwise, do not submit. Mainly just checks if image is the correct format. The form checks if required fields are filled out or not.
    if (!isEmpty(errors)) {
      // TODO: add error snackbar that tells to deal with errors?
      return;
    }

    // Create formData to send over with post request. Needs to be in this format due to image.
    const slide = {};
    slide.image = image;
    slide.legend = legend;

    this.setState({ isLoading: true, open: false });
    if (editMode) {
      // update slide action request
      updateFacilitySlide(mongoId, slide)
        .then(() => {
          this.handleClose();
        })
        .catch(() => this.setState({ isLoading: false, open: true }));
    } else {
      // post slide action request.
      addFacilitySlide(slide)
        .then(() => {
          this.handleClose();
        })
        .catch(() => this.setState({ isLoading: false, open: true }));
    }
  };

  render() {
    const { open, legend, editMode, errors, isLoading } = this.state;
    const { adminPage } = this.props;

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
            variant='contained'
            color='primary'
            onClick={this.handleClickOpen}
          >
            Add Faciltiy Slide
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
          fullScreen={Boolean(window.innerWidth < 800)}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>
            {editMode ? "Update" : "Create New"} Facility Slide
          </DialogTitle>
          <form autoComplete='off' onSubmit={e => this.handleSubmit(e)}>
            <DialogContent>
              <DialogContentText>
                {editMode
                  ? "To update a facility slide, you can just change any field you need. The image is not neccessary unless you want it changed."
                  : "To create a new facility slide, please provide an image and legend."}
              </DialogContentText>
              <DialogContentText>
                Image must be jpeg, png, or svg format.
              </DialogContentText>
              <TextField
                autoFocus
                disabled={isLoading}
                required={!editMode}
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
                <h6 style={{ color: "red", margin: 0 }}>
                  The image must be in jpg, svg, or png format
                </h6>
              )}
              <TextField
                margin='dense'
                id='legend'
                label='Legend'
                name='legend'
                type='text'
                disabled={isLoading}
                value={legend}
                fullWidth
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleCancel}
                color='primary'
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                disabled={isLoading}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <BackdropLoader open={isLoading} />
      </div>
    );
  }
}

export default UploadFacilityForm;
