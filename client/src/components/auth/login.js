import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
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
import Loader from "../common/Loader";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      question: "",
      answer: "",
      errors: {},
      forgotPassword: false,
      gotQuestion: false,
      canResetPassword: false,
      passwordReset: false
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

  handleRetrieveQuestion = e => {
    e.preventDefault();
    this.setState({ errors: {}, gotQuestion: true });

    const emailData = {
      email: this.state.email
    };

    axios
      .post("/api/users/question", emailData)
      .then(res => {
        this.setState({
          email: res.data.email,
          question: res.data.secretQuestion
        });
      })
      .catch(err =>
        this.setState({ errors: err.response.data, gotQuestion: false })
      );
  };

  handleAnswerQuestion = e => {
    e.preventDefault();

    const emailData = {
      email: this.state.email,
      answer: this.state.answer
    };

    axios
      .post("/api/users/answer", emailData)
      .then(res => {
        // Save to local storage
        const { token } = res.data;
        // Set token to local storage
        localStorage.setItem("jwtToken", token);
        // Set token to auth Header
        setAuthToken(token);

        this.setState({ canResetPassword: true });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  handlePasswordReset = e => {
    e.preventDefault();

    const emailData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .put("/api/users/reset", emailData)
      .then(res => {
        this.setState({
          password: "",
          question: "",
          answer: "",
          errors: {},
          canResetPassword: false,
          gotQuestion: false,
          forgotPassword: false,
          passwordReset: true
        });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  passwordResetSuccessClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ passwordReset: false });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { forgotPassword, passwordReset } = this.state;
    const login = forgotPassword
      ? this.renderForgotPassword()
      : this.renderAdminLogin();

    return (
      <div className='login'>
        <div className='container'>
          {isAuthenticated ? this.renderAdminAccess() : login}
        </div>
        <SuccessAlert
          successOpen={passwordReset}
          handleSuccessClose={() => this.passwordResetSuccessClose()}
          message={
            "Password has successfully been reset. You may now login with new password."
          }
        />
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
      <div style={{ marginBottom: "30px" }}>
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
            errorOpen={carousel.carouselErrorOpen}
            handleSuccessClose={carouselSuccessAlertClose}
            message={carousel.carouselAlertMessage}
          />
          <SuccessAlert
            successOpen={programs.programSuccessOpen}
            errorOpen={programs.programErrorOpen}
            handleSuccessClose={programSuccessAlertClose}
            message={programs.programSuccessMessage}
          />
          <SuccessAlert
            successOpen={teachers.teacherSuccessOpen}
            errorOpen={teachers.teacherErrorOpen}
            handleSuccessClose={teacherSuccessAlertClose}
            message={teachers.teacherSuccessMessage}
          />
          <SuccessAlert
            successOpen={facility.facilitySuccessOpen}
            errorOpen={facility.facilityErrorOpen}
            handleSuccessClose={facilitySuccessAlertClose}
            message={facility.facilitySuccessMessage}
          />
        </div>
      </div>
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
          <div style={{ textAlign: "center" }}>
            <button onClick={() => this.setState({ forgotPassword: true })}>
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderForgotPassword() {
    const { errors, email, gotQuestion, canResetPassword } = this.state;
    const passwordReset = canResetPassword
      ? this.renderResetPassword()
      : this.renderSecretQuestion();

    return (
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <h1 className='display-4 text-center'>Forgot Password</h1>
          <p className='lead text-center'>Please provide your email address</p>
          {!gotQuestion ? (
            <form onSubmit={this.handleRetrieveQuestion}>
              <TextFieldGroup
                placeholder='Email Address'
                name='email'
                type='email'
                value={email}
                onChange={this.onChange}
                error={errors.email}
              />
              <input
                type='submit'
                className='btn btn-primary btn-block mt-4'
                style={{ backgroundColor: "#039be5" }}
                value='Submit'
              />
            </form>
          ) : (
            passwordReset
          )}
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <button onClick={() => this.setState({ forgotPassword: false })}>
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderSecretQuestion() {
    const { question, answer, errors } = this.state;

    return question ? (
      <form onSubmit={this.handleAnswerQuestion} autoComplete='off'>
        <h2 style={{ textAlign: "center" }}>{question}</h2>
        <TextFieldGroup
          placeholder='Secret Answer'
          name='answer'
          type='answer'
          value={answer}
          onChange={this.onChange}
          error={errors.answer}
        />
        <input
          type='submit'
          className='btn btn-primary btn-block mt-4'
          style={{ backgroundColor: "#039be5" }}
          value='Submit'
        />
      </form>
    ) : (
      <Loader />
    );
  }

  renderResetPassword() {
    const { password, errors } = this.state;

    return (
      <form onSubmit={this.handlePasswordReset}>
        <h2 style={{ textAlign: "center" }}>Reset Password</h2>
        <TextFieldGroup
          placeholder='New Password'
          name='password'
          type='password'
          value={password}
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
