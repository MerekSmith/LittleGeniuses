import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getFacilitySlides,
  addFacilitySlide,
  updateFacilitySlide,
  deleteFacilitySlide,
  facilitySuccessAlertClose
} from "../../../actions/facilityActions";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import EditFacilityIcons from "../../common/EditFacilityIcons";
import { relative } from "path";

const facilitySlides = [
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-2.jpg",
    alt: "image2",
    legendName: "Legend 2"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-3.jpg",
    alt: "image3",
    legendName: "Legend 3"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-4.jpg",
    alt: "image4",
    legendName: "Legend 4"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-5.jpg",
    alt: "image5",
    legendName: "Legend 5"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-6.jpg",
    alt: "image6",
    legendName: "Legend 6"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-7.jpg",
    alt: "image7",
    legendName: "Legend 7"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-8.jpg",
    alt: "image8",
    legendName: "Legend 8"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-9.jpg",
    alt: "image9",
    legendName: "Legend 9"
  }
];

class FacilitySlides extends Component {
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
      <Carousel>
        <div style={{ position: relative, zIndex: 1 }}>
          <img
            src='http://lorempixel.com/output/cats-q-c-640-480-1.jpg'
            alt='image1'
          />
          <p className='legend'>Legend 1</p>
        </div>
        {/* <div>
          <img
            src='http://lorempixel.com/output/cats-q-c-640-480-2.jpg'
            alt='image2'
          />
          <p className='legend'>Legend 3</p>
        </div> */}
        {/* Maps through hard coded images */}
        {facility.slides &&
          facility.slides.map(({ image, alt, legendName }, index) => (
            <div key={index}>
              <img src={image} alt={alt} />
              <p className='legend'>{legendName}</p>
            </div>
          ))}
        }
      </Carousel>
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
)(FacilitySlides);
