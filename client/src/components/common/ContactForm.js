import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      senderEmail: "",
      phone: "",
      address: "",
      message: "",
      mailSent: false,
      error: null
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // TODO: handle form submit through node.
    console.log(this.state);
  };

  render() {
    return (
      <div>
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
                    value={this.state.senderEmail}
                    onChange={e =>
                      this.setState({ senderEmail: e.target.value })
                    }
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
              <Col md={6} xs={12} className='send-button right'>
                <input
                  type='submit'
                  className='btn btn-lg btn-secondary btn-send'
                  value='Send message'
                />
              </Col>
            </Row>
          </div>
          <div className='submit-response'>
            {this.state.mailSent && (
              <div className='success animated tada'>
                Thank you for contacting us.
              </div>
            )}
            {this.state.error && (
              <div className='error animated bounceInLeft'>
                Sorry we had some problems.
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default ContactForm;
