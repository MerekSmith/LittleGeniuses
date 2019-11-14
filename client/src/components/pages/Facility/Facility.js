import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getFacilitySlides,
  addFacilitySlide,
  updateFacilitySlide,
  deleteFacilitySlide,
  facilitySuccessAlertClose
} from "../../../actions/facilityActions";

import FacilitySlides from "./FacilitySlides";
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
      <div className='facility-container'>
        <h1 className='page-header'>Our Facility</h1>
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
