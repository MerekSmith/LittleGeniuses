import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  getFacilitySlides,
  addFacilitySlide,
  updateFacilitySlide,
  deleteFacilitySlide,
  facilitySuccessAlertClose
} from "../../../actions/facilityActions";

import FacilitySlides from "./FacilitySlides";
import Map from "../../google/Map";
import Loader from "../../common/Loader";
import SuccessAlert from "../../common/SuccessAlert";

class Facility extends Component {
  render() {
    const {
      facility,
      getFacilitySlides,
      addFacilitySlide,
      updateFacilitySlide,
      deleteFacilitySlide,
      facilitySuccessAlertClose
    } = this.props;
    const { facilitySuccessOpen, facilitySuccessMessage } = facility;
    const { isAuthenticated } = this.props.auth;

    return (
      <div className='locations-container'>
        <h1 className='page-header'>Locations</h1>

        {/* <h3>Take A Tour</h3>
        <iframe
          className='tourVideo'
          title='tourVideo'
          src='https://www.youtube.com/embed/LkBoABKzIJY'
          frameborder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        ></iframe> */}

        <div className='locations-details'>
          <Row>
          <Col lg={6}>
            <div className='locations-info-container'>
              <h1>Midvale</h1>
              <div className='locations-address-container'>
                <p className='contact-address'>7351 S 900 E</p>
                <p className='contact-address'>Midvale, UT 84047</p>
                <p className='contact-address'><strong>Phone</strong>: <span className='contact-info'>385-275-7233</span></p>
                <p className='contact-address'><strong>Email</strong>: <span className='contact-info'>littlegeniusesmidvale@gmail.com</span></p>
              </div>
              <Map location='midvale' />
            </div>
          </Col>

          <Col lg={6}>
            <div className='locations-info-container'>
              <h1>Pleasant Grove</h1>
              <div className='locations-address-container'>
                <p className='contact-address'>352 E State Rd</p>
                <p className='contact-address'>Pleasant Grove, UT 84062</p>
                <p className='contact-address'><strong>Phone</strong>: <span className='contact-info'>801-899-2098</span></p>
                <p className='contact-address'><strong>Email</strong>: <span className='contact-info'>littlegeniusesmidvale@gmail.com</span></p>
              </div>
              <Map location='pleasantGrove' />
            </div>
          </Col>
          </Row>
        </div>

        <div className='facility-slides'>
          {facility.slides ? (
            <FacilitySlides
              facility={facility}
              getFacilitySlides={getFacilitySlides}
              addFacilitySlide={addFacilitySlide}
              updateFacilitySlide={updateFacilitySlide}
              deleteFacilitySlide={deleteFacilitySlide}
              isAuthenticated={isAuthenticated}
            />
          ) : (
            <Loader />
          )}
        </div>
        <SuccessAlert
          successOpen={facilitySuccessOpen}
          handleSuccessClose={facilitySuccessAlertClose}
          message={facilitySuccessMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  facility: state.facility
});

export default connect(
  mapStateToProps,
  {
    getFacilitySlides,
    addFacilitySlide,
    updateFacilitySlide,
    deleteFacilitySlide,
    facilitySuccessAlertClose
  }
)(Facility);
