import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import EditFacilityIcons from "../../common/EditFacilityIcons";
import { relative } from "path";

function FacilitySlides(props) {
  const { slides, originURL } = props.facility;
  const {
    getFacilitySlides,
    addFacilitySlide,
    updateFacilitySlide,
    deleteFacilitySlide,
    isAuthenticated
  } = props;

  return (
    <Carousel>
      <div style={{ position: relative, zIndex: 1 }}>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-1.jpg'
          alt='image1'
        />
        <p className='legend'>Legend 1</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-2.jpg'
          alt='image2'
        />
        <p className='legend'>Legend 3</p>
      </div>
      {/* Maps through hard coded images */}
      {slides.map((slide, index) => {
        const { imagePath, legend } = slide;
        const isLastSlide = index + 1 === slides.length;

        return (
          <div key={index}>
            <img src={originURL + imagePath} alt={legend} />
            <p className='legend'>{legend}</p>
            {isAuthenticated && (
              <EditFacilityIcons
                slide={slide}
                slideIndex={index}
                isLastSlide={isLastSlide}
                getFacilitySlides={getFacilitySlides}
                addFacilitySlide={addFacilitySlide}
                updateFacilitySlide={updateFacilitySlide}
                deleteFacilitySlide={deleteFacilitySlide}
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
}

export default FacilitySlides;
