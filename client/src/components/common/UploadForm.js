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

export default class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      setOpen: "",
      header: "",
      description: "",
      image: null
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({ image: event.target.files[0] });
  };

  render() {
    const { open, header, description } = this.state;

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
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Cancel
              </Button>
              <input type='submit' value='Submit' className='btn btn-primary' />
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
