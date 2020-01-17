import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import EditFacilityIcons from "../../common/EditFacilityIcons";
import { relative } from "path";
import facility1 from "../../../img/Facility/facility_1.jpg";
import facility2 from "../../../img/Facility/facility_2.jpg";
import facility3 from "../../../img/Facility/facility_3.jpg";

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
        <img src={facility1} alt='facility1' />
        <p className='legend'>Main Front Room</p>
      </div>
      <div>
        <img src={facility2} alt='facility2' />
        <p className='legend'>Main Back Room</p>
      </div>
      <div>
        <img src={facility3} alt='facility3' />
        <p className='legend'>Reading Area</p>
      </div>
      {/* Maps through hard coded images */}
      {slides.map((slide, index) => {
        const { imagePath, legend } = slide;
        const isLastSlide = index + 1 === slides.length;

        return (
          <div key={index}>
            <img src={originURL + imagePath} alt={legend} />
            {legend && <p className='legend'>{legend}</p>}
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
