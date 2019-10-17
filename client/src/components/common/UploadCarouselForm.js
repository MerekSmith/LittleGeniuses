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
      mongoId: ""
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
        imagePath: image,
        editMode,
        mongoId: _id
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
        mongoId: ""
      });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleSubmit = () => {
    const {
      header,
      details,
      image,
      link,
      linkName,
      editMode,
      mongoId
    } = this.state;
    const { addCarouselSlide, updateCarouselSlide } = this.props;

    // Create formData to send over with post request. Needs to be in this format due to image.
    let slide = new FormData();
    slide.append("image", image);
    slide.append("header", header);
    slide.append("details", details);
    slide.append("link", link);
    slide.append("linkName", linkName);

    if (editMode) {
      // update slide action request
      updateCarouselSlide(mongoId, slide);
      this.handleClose();
    } else {
      // post slide action request.
      addCarouselSlide(slide);
      this.handleCancel();
    }
  };

  render() {
    const { open, header, details, link, linkName, editMode } = this.state;
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
            variant='outlined'
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
          <form autoComplete='off'>
            <DialogContent>
              <DialogContentText>
                To create a new carousel slide, please provide an image and
                header. The detail text line, link, and linkName are optional.
                If you provide a link, you must provide a linkName.
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
                margin='dense'
                id='link'
                label='Link'
                name='link'
                type='text'
                value={link}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
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
