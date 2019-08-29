import React from "react";

import FacilitySlides from "./FacilitySlides";

function Facility() {
  return (
    <div className='facility-container'>
      <h1 className='page-header'>Our Facility</h1>
      <div className='facility-slides'>
        <FacilitySlides />
      </div>
    </div>
  );
}

export default Facility;
