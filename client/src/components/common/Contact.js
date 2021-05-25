import React from "react";
import ContactForm from "./ContactForm";
import { Row, Col } from "react-bootstrap";

import "../../css/contact.css";

function Contact() {
  return (
    <div className='contact-container'>
      <h2 className='page-header' style={{ textAlign: "center" }}>Contact Us!</h2>
      <Row>
        <Col md={4} xs={12} style={{ margin: 'auto' }}>
          <div className='contact-info-container'>
            <div>
            <strong>Email</strong>: <span className='contact-info'>littlegeniusesmidvale@gmail.com</span>
            </div>
            <br />
            <div className='contact-address-container'>
              <p className='contact-address'><strong>Midvale</strong></p>
              <p className='contact-address'>7351 S 900 E</p>
              <p className='contact-address'>Midvale, UT 84047</p>
              <strong>Phone</strong>: <span className='contact-info'>385-275-7233</span>
            </div>
            <br />
            <div className='contact-address-container'>
              <p className='contact-address'><strong>Pleasant Grove</strong></p>
              <p className='contact-address'>352 E State Rd</p>
              <p className='contact-address'>Pleasant Grove, UT 84062</p>
              <strong>Phone</strong>: <span className='contact-info'>801-899-2098</span>
            </div>
          </div>
        </Col>
        <Col md={8} xs={12}>
          <ContactForm />
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
