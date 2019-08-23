import React from "react";
import Map from "../google/Map";
import ContactForm from "./ContactForm";
import { Row, Col } from "react-bootstrap";

import "../../css/contact.css";

function Contact() {
  return (
    <div className='contact-container'>
      <Row>
        <Col md={5} xs={12}>
          <Map />
        </Col>
        <Col md={7} xs={12}>
          <h2>Contact Us!</h2>
          <div className='contact-address-container'>
            <p className='contact-address'>7351 S 900 E</p>
            <p className='contact-address'>Midvale, UT 84047</p>
          </div>
          <br />
          <div className='contact-info-container'>
            <p className='contact-info'>littlegeniusesmidvale@gmail.com</p>
            <p className='contact-info'>385-275-7233</p>
          </div>
          <ContactForm />
        </Col>
      </Row>
    </div>
  );
}

export default Contact;
