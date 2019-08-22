import React from "react";
import { Link } from "react-router-dom";

import blueBalloon from "../../img/Round Balloons/balloon_round_blue.png";

function TryUs() {
  return (
    <div
      className='tryus-container'
      data-aos='fade-up'
      data-aos-duration='2000'
    >
      <img src={blueBalloon} className='tryus-balloon' alt='balloon' />
      <div className='balloon-text'>
        <h1>Want to try us for FREE?</h1>
        <h4>Valid from 8am - 12pm</h4>
        <Link className='btn btn-secondary btn-lg balloon-btn' to='/contact'>
          Contact Us!
        </Link>
      </div>
    </div>
  );
}

export default TryUs;
