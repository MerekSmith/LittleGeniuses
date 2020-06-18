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

class UploadProgramForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      header: "",
      details: "",
      image: null,
      link: "",
      linkName: "",
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
      const { header, details, link, linkName, image, _id } = slide;

      this.setState({
        header,
        details,
        link,
        linkName,
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
      isLoading: false,
      header: "",
      details: "",
      image: null,
      link: "",
      linkName: "",
      mongoId: "",
      errors: {}
    });
  };

  handleCancel = () => {
    // This is linked to the cancel button. Will clear out the form if using a new slide form but will only close it if using the edit form.

    if (this.state.editMode) {
      this.handleClose();
    } else {
      this.setState({
        open: false,
        header: "",
        details: "",
        image: null,
        link: "",
        linkName: "",
        mongoId: "",
        errors: {}
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = e => {
    let image = e.target.files[0] || {};
    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/svg"
    ) {
      this.setState({
        image,
        errors: {}
      });
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

    const {
      header,
      details,
      image,
      link,
      linkName,
      editMode,
      mongoId,
      errors
    } = this.state;
    const { addCarouselSlide, updateCarouselSlide } = this.props;

    // Check if all errors are clear then move on to submitting form. Otherwise, do not submit. Mainly just checks if image is the correct format. The form checks if required fields are filled out or not.
    if (!isEmpty(errors)) {
      // TODO: add error snackbar that tells to deal with errors?
      return;
    }

    // Create formData to send over with post request. Needs to be in this format due to image.
    let slide = new FormData();
    slide.append("header", header);
    slide.append("details", details);
    slide.append("link", link);
    slide.append("linkName", linkName);
    slide.append("image", image);

    this.setState({ isLoading: true, open: false });
    if (editMode) {
      // update slide action request
      updateCarouselSlide(mongoId, slide)
        .then(() => {
          this.handleClose();
        })
        .catch(() => this.setState({ isLoading: false, open: true }));
    } else {
      // post slide action request.
      addCarouselSlide(slide)
        .then(() => {
          this.handleClose();
        })
        .catch(() => this.setState({ isLoading: false, open: true }));
    }
  };

  render() {
    const {
      open,
      header,
      details,
      link,
      linkName,
      editMode,
      errors,
      isLoading
    } = this.state;
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
            Add Carousel Slide
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
          <DialogTitle id='form-dialog-title'>
            {editMode ? "Update" : "Create New"} Carousel Slide
          </DialogTitle>
          <form autoComplete='off' onSubmit={e => this.handleSubmit(e)}>
            <DialogContent>
              <DialogContentText>
                {editMode
                  ? "To update a carousel slide, you can just change any field you need. The image is not neccessary unless you want it changed."
                  : "To create a new carousel slide, please provide an image and header."}
                The detail text line, link, and linkName are optional. However,
                if you provide a link, you must provide a linkName.
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
                required
                disabled={isLoading}
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
                disabled={isLoading}
                margin='dense'
                id='details'
                label='Details'
                name='details'
                type='text'
                value={details}
                fullWidth
                rowsMax='4'
                onChange={this.handleChange}
              />
              <TextField
                required={!isEmpty(linkName)}
                disabled={isLoading}
                margin='dense'
                id='link'
                label='Link, *Should be address part after the ".com"'
                name='link'
                type='text'
                value={link}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                required={!isEmpty(link)}
                disabled={isLoading}
                margin='dense'
                id='linkName'
                label='Link Name'
                name='linkName'
                type='text'
                value={linkName}
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

export default UploadProgramForm;
