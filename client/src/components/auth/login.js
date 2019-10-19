import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import {
  addCarouselSlide,
  carouselSuccessAlertClose
} from "../../actions/carouselActions";
import {
  addProgram,
  programSuccessAlertClose
} from "../../actions/programsActions";
import {
  addTeacher,
  teacherSuccessAlertClose
} from "../../actions/teachersActions";
import TextFieldGroup from "../common/TextFieldGroup";
import UploadCarouselForm from "../common/UploadCarouselForm";
import UploadProgramForm from "../common/UploadProgramForm";
import UploadTeacherForm from "../common/UploadTeacherForm";
import SuccessAlert from "../common/SuccessAlert";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const {
      carousel,
      programs,
      teachers,
      addCarouselSlide,
      carouselSuccessAlertClose,
      addProgram,
      programSuccessAlertClose,
      addTeacher,
      teacherSuccessAlertClose
    } = this.props;

    return (
      <div className='login'>
        <div className='container'>
          {isAuthenticated ? (
            <React.Fragment>
              <h1 className='display-4 text-center'>Admin Controls</h1>
              <div className='row justify-content-md-center'>
                <div className='col-md-3 text-center'>
                  <UploadCarouselForm
                    addCarouselSlide={addCarouselSlide}
                    adminPage={true}
                  />
                </div>
                <div className='col-md-3 text-center'>
                  <UploadProgramForm addProgram={addProgram} adminPage={true} />
                </div>
                <div className='col-md-3 text-center'>
                  <UploadTeacherForm addTeacher={addTeacher} adminPage={true} />
                </div>
                {/* Success Alerts. Only show when successful upload is made. */}
                <SuccessAlert
                  successOpen={carousel.carouselSuccessOpen}
                  handleSuccessClose={carouselSuccessAlertClose}
                  message={carousel.carouselSuccessMessage}
                />
                <SuccessAlert
                  successOpen={programs.programSuccessOpen}
                  handleSuccessClose={programSuccessAlertClose}
                  message={programs.programSuccessMessage}
                />
                <SuccessAlert
                  successOpen={teachers.teacherSuccessOpen}
                  handleSuccessClose={teacherSuccessAlertClose}
                  message={teachers.teacherSuccessMessage}
                />
              </div>
            </React.Fragment>
          ) : (
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Log In</h1>
                <p className='lead text-center'>
                  Sign in to your Little Geniuses admin account
                </p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder='Email Address'
                    name='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <input
                    type='submit'
                    className='btn btn-primary btn-block mt-4'
                    style={{ backgroundColor: "#039be5" }}
                    value='Submit'
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  carousel: state.carousel,
  programs: state.programs,
  teachers: state.teachers
});

export default connect(
  mapStateToProps,
  {
    loginUser,
    addCarouselSlide,
    carouselSuccessAlertClose,
    addProgram,
    programSuccessAlertClose,
    addTeacher,
    teacherSuccessAlertClose
  }
)(Login);
