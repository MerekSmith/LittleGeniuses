import React from "react";

function Balloon(props) {
  const { balloon, delay, btnText, link } = props;

  return (
    <div
      className='balloon-container'
      data-aos='fade-up'
      data-aos-duration='2000'
      data-aos-delay={delay}
    >
      <img src={balloon} className='balloon' alt='balloon' />
      <div className='balloon-content'>
        <a className='btn btn-secondary btn-lg balloon-btn' href={link}>
          {btnText}
        </a>
      </div>
    </div>
  );
}

export default Balloon;
