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
import axios from "axios";

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      header: "",
      description: [""],
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
      description: [""],
      image: null,
      textColor: ""
    });
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
    const { header, description, image, textColor } = this.state;
    console.log(description);
    // Create formData to send over with post request. Needs to be in this format due to image.
    let program = new FormData();
    program.append("image", image);
    program.append("header", header);
    // Loop through description array and append each index element.
    for (let i = 0; i < description.length; i++) {
      program.append("description", description[i]);
    }
    program.append("textColor", textColor);
    console.log("program to send", program.description);
    // axios post request
    axios
      .post("api/programs", program, {
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
    console.log(description);
    return (
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={this.handleClickOpen}
        >
          Create New Program
        </Button>
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