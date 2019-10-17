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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

class UploadTeacherForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: "",
      position: "",
      bio: [""],
      image: null,
      editMode: false,
      mongoId: ""
    };
  }

  componentDidMount = () => {
    const { editMode = false, teacher } = this.props;

    // If editMode is true, it will set the state to the teacher that is selected so the fields are populated.
    if (editMode) {
      const { name, bio, position, image, teacherIndex, mongoId } = teacher;

      this.setState({
        name,
        bio,
        position,
        imagePath: image,
        teacherIndex,
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
    // This is linked to the cancel button. Will clear out the form if using a new teacher form but will only close it if using the edit form.

    if (this.state.editMode) {
      this.handleClose();
    } else {
      this.setState({
        open: false,
        name: "",
        position: "",
        bio: [""],
        image: null,
        mongoId: ""
      });
    }
  };

  handleChange = e => {
    if (e.target.id === "bio") {
      const index = e.target.parentElement.parentElement.dataset.index;
      let bio = [...this.state.bio];
      bio[index] = e.target.value;
      this.setState({ bio });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleFileChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  newBioLine = () => {
    this.setState(({ bio }) => ({
      bio: [...bio, ""]
    }));
  };

  removeBioLine = () => {
    // Remove last array index from bio array.
    if (this.state.bio.length > 1) {
      this.setState(({ bio }) => ({
        bio: bio.filter((bioLine, index) => {
          return index !== bio.length - 1;
        })
      }));
    }
  };

  handleSubmit = () => {
    const { name, position, bio, image, editMode, mongoId } = this.state;
    const { addTeacher, updateTeacher } = this.props;

    // Create formData to send over with post request. Needs to be in this format due to image.
    let teacher = new FormData();
    teacher.append("image", image);
    teacher.append("name", name);
    teacher.append("position", position);
    // Loop through bio array and append each index element.
    for (let i = 0; i < bio.length; i++) {
      teacher.append("bio", bio[i]);
    }

    if (editMode) {
      // update teacher action request
      updateTeacher(mongoId, teacher);
      this.handleClose();
    } else {
      // post teacher action request.
      addTeacher(teacher);
      this.handleCancel();
    }
  };

  render() {
    const { open, name, position, bio, editMode = false } = this.state;
    const { adminPage } = this.props;
    const isMultiLineBio = bio.length > 1;

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
            Add Teacher
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
          <DialogTitle id='form-dialog-title'>Create New Teacher</DialogTitle>
          <form autoComplete='off'>
            <DialogContent>
              <DialogContentText>
                To create a new teacher bio, please provide an image, teacher
                name, teacher's position, and a bio.
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
                id='name'
                label="Teacher's Name"
                name='name'
                type='text'
                value={name}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                required
                margin='dense'
                id='position'
                label="Teacher's Position"
                name='position'
                type='text'
                value={position}
                fullWidth
                onChange={this.handleChange}
              />
              {bio.map((bioLine, index) => {
                return (
                  <TextField
                    required
                    margin='dense'
                    id='bio'
                    data-index={index}
                    label="Teacher's Bio"
                    name='bio'
                    type='text'
                    value={bioLine}
                    fullWidth
                    multiline
                    rows='2'
                    rowsMax='4'
                    onChange={this.handleChange}
                    key={index}
                  />
                );
              })}
              <Icon onClick={this.newBioLine} className='add-bio-line-icon'>
                add_circle
              </Icon>
              {isMultiLineBio && (
                <Icon
                  onClick={this.removeBioLine}
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

export default UploadTeacherForm;
