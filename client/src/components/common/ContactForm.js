import React, { Component } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      submitted: false,
      mailSent: false,
      error: null
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();

    // Send post request to node server to submit mail request.
    axios
      .post("/send", this.state)
      .then(res => {
        const { mailSent } = res.data;
        if (mailSent === false) {
          this.setState({ error: true, submitted: true });
        }

        this.setState({
          mailSent,
          submitted: true,
          name: "",
          email: "",
          phone: "",
          address: "",
          message: ""
        });
      })
      .catch(error => {
        console.log("catch", error);
        this.setState({ error: true, submitted: true });
      });
  };

  render() {
    const { submitted, error } = this.state;

    return (
      <div>
        {submitted ? (
          !error ? (
            <h2 className='message-sucess animated lightSpeedIn'>
              Your message has been sent!
            </h2>
          ) : (
            <h2 className='error animated bounceInRight'>
              Sorry we had some problems. Please try again later or directly
              call or email us.
            </h2>
          )
        ) : (
          <form id='contact-form' onSubmit={e => this.handleFormSubmit(e)}>
            <div className='controls'>
              <Row>
                <Col md={6} xs={12}>
                  <div className='form-group'>
                    {/* <label htmlFor="form_name">Firstname *</label> */}
                    <input
                      id='form_name'
                      type='text'
                      name='name'
                      className='form-control'
                      placeholder='Name*'
                      required='required'
                      data-error='Name is required.'
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                    <div className='help-block with-errors' />
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className='form-group'>
                    {/* <label htmlFor="form_email">Email *</label> */}
                    <input
                      id='form_email'
                      type='email'
                      name='email'
                      className='form-control'
                      placeholder='Email*'
                      required='required'
                      data-error='Valid email is required.'
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <div className='help-block with-errors' />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6} xs={12}>
                  <div className='form-group'>
                    {/* <label htmlFor="form_lastname">Lastname *</label> */}
                    <input
                      id='form_phone'
                      type='text'
                      name='phone'
                      className='form-control'
                      required='required'
                      placeholder='Phone*'
                      value={this.state.phone}
                      onChange={e => this.setState({ phone: e.target.value })}
                    />
                    <div className='help-block with-errors' />
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className='form-group'>
                    {/* <label htmlFor="form_lastname">Lastname *</label> */}
                    <input
                      id='form_address'
                      type='text'
                      name='address'
                      className='form-control'
                      placeholder='Address'
                      value={this.state.address}
                      onChange={e => this.setState({ address: e.target.value })}
                    />
                    <div className='help-block with-errors' />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <div className='form-group message-form'>
                    {/* <label htmlFor="form_message">Message *</label> */}
                    <textarea
                      id='form_message'
                      name='message'
                      className='form-control'
                      placeholder='Write your message here.*&#10;Please provide ages and school, if inquiring on pricing.'
                      rows='4'
                      required='required'
                      data-error='Please, leave a message.'
                      value={this.state.message}
                      onChange={e => this.setState({ message: e.target.value })}
                    />
                    <div className='help-block with-errors' />
                  </div>
                </Col>
              </Row>
              {/* Submit button */}
              <Row className='row'>
                <Col md={6} xs={12} className='required-text'>
                  <p className='required-text required'>
                    <strong>*</strong> These fields are required.
                  </p>
                </Col>
                <Col md={6} xs={12} className='send-button'>
                  <button
                    type='submit'
                    className='btn btn-lg btn-secondary btn-send'
                  >
                    Send Message
                  </button>
                </Col>
              </Row>
            </div>
            <div className='submit-response'>
              {this.state.error && (
                <div className='error animated bounceInLeft'>
                  Sorry we had some problems. Please try again later or directly
                  call or email us.
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default ContactForm;
