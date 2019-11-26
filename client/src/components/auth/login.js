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
import {
  addFacilitySlide,
  facilitySuccessAlertClose
} from "../../actions/facilityActions";
import TextFieldGroup from "../common/TextFieldGroup";
import UploadCarouselForm from "../common/UploadCarouselForm";
import UploadProgramForm from "../common/UploadProgramForm";
import UploadTeacherForm from "../common/UploadTeacherForm";
import UploadFacilityForm from "../common/UploadFacilityForm";
import SuccessAlert from "../common/SuccessAlert";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {},
      forgotPassword: false
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

  handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  handleRetrievePassword = e => {
    e.preventDefault();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { forgotPassword } = this.state;
    const login = forgotPassword
      ? this.renderForgotPassword()
      : this.renderAdminLogin();

    return (
      <div className='login'>
        <div className='container'>
          {isAuthenticated ? this.renderAdminAccess() : login}
        </div>
      </div>
    );
  }

  renderAdminAccess() {
    const {
      carousel,
      programs,
      teachers,
      facility,
      addCarouselSlide,
      carouselSuccessAlertClose,
      addProgram,
      programSuccessAlertClose,
      addTeacher,
      teacherSuccessAlertClose,
      addFacilitySlide,
      facilitySuccessAlertClose
    } = this.props;

    return (
      <React.Fragment>
        <h1 className='display-4 text-center'>Admin Controls</h1>
        <div className='row justify-content-md-center'>
          <div className='col-md-3 text-center' style={{ marginTop: "50px" }}>
            <UploadCarouselForm
              addCarouselSlide={addCarouselSlide}
              adminPage={true}
            />
          </div>
          <div className='col-md-3 text-center' style={{ marginTop: "50px" }}>
            <UploadProgramForm addProgram={addProgram} adminPage={true} />
          </div>
          <div className='col-md-3 text-center' style={{ marginTop: "50px" }}>
            <UploadTeacherForm addTeacher={addTeacher} adminPage={true} />
          </div>
          <div className='col-md-3 text-center' style={{ marginTop: "50px" }}>
            <UploadFacilityForm
              addFacilitySlide={addFacilitySlide}
              adminPage={true}
            />
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
          <SuccessAlert
            successOpen={facility.facilitySuccessOpen}
            handleSuccessClose={facilitySuccessAlertClose}
            message={facility.facilitySuccessMessage}
          />
        </div>
      </React.Fragment>
    );
  }

  renderAdminLogin() {
    const { errors } = this.state;

    return (
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Log In</h1>
          <p className='lead text-center'>
            Sign in to your Little Geniuses admin account
          </p>
          <form onSubmit={this.handleSubmit}>
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
          <br />
          <br />
          <div
            onClick={() => this.setState({ forgotPassword: true })}
            style={{ textAlign: "center" }}
          >
            <a href='#'>Forgot Password?</a>
          </div>
        </div>
      </div>
    );
  }

  renderForgotPassword() {
    const { errors } = this.state;

    return (
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Forgot Password</h1>
          <p className='lead text-center'>Please provide your email address</p>
          <form onSubmit={this.handleRetrievePassword}>
            <TextFieldGroup
              placeholder='Email Address'
              name='email'
              type='email'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <input
              type='submit'
              className='btn btn-primary btn-block mt-4'
              style={{ backgroundColor: "#039be5" }}
              value='Retrieve Password'
            />
          </form>
          <br />
          <br />
          <div
            onClick={() => this.setState({ forgotPassword: false })}
            style={{ textAlign: "center" }}
          >
            <a href='#'>Back to Login</a>
          </div>
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
  teachers: state.teachers,
  facility: state.facility
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
    teacherSuccessAlertClose,
    addFacilitySlide,
    facilitySuccessAlertClose
  }
)(Login);
