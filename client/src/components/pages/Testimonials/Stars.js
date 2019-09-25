import React from "react";

export default function Stars(props) {
  const { starPercentage } = props;

  return (
    <div
      className='stars-outer'
      data-aos='zoom-out'
      data-aos-easing='linear'
      data-aos-duration='1500'
    >
      <div className='stars-inner' style={{ width: starPercentage }}></div>
    </div>
  );
}
