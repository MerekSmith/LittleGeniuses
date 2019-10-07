import React, { Component } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import axios from "axios";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: "",
      header: "",
      description: "",
      image: null,
      textColor: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCancel = () => {
    this.setState({
      open: false,
      header: "",
      description: "",
      image: null,
      textColor: ""
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({ image: event.target.files[0] });
  };

  handleSubmit = () => {
    const { header, description, image, textColor } = this.state;

    // Create formData to send over with post request. Needs to be in this format due to image.
    let fd = new FormData();
    fd.append("image", image);
    fd.append("header", header);
    fd.append("description", description);
    fd.append("textColor", textColor);
    // axios post request
    axios
      .post("api/programs", fd, {
        // This extra argument gives access to upload progress.
        onUploadProgress: progressEvent => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        }
      })
      .then(res => {
        this.props.getPrograms();
        this.handleCancel();
      });
  };

  render() {
    const { open, header, description, textColor } = this.state;

    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
        >
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
          <form
            action='/api/programs'
            method='POST'
            encType='multipart/form-data'
            autoComplete='off'
          >
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
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
                onChange={this.handleChange("header")}
              />
              <TextField
                required
                margin='dense'
                id='description'
                label='Description'
                name='description'
                type='text'
                value={description}
                fullWidth
                multiline
                rowsMax='4'
                onChange={this.handleChange("description")}
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
                onChange={this.handleChange("textColor")}
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
