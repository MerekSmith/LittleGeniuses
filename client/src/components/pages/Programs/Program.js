import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";

function Program(props) {
  const {
    programIndex,
    screenWidth,
    image,
    header,
    description,
    programClass
  } = props;

  const leftImgProgram = (
    <ScrollableAnchor id={programClass}>
      <Row data-aos='fade-left' data-aos-duration='1500'>
        <Col md={6}>
          <Image rounded src={image} className='program-img' alt='program' />
        </Col>
        <Col md={6} className='program-text'>
          <h1 className={programClass}>{header}</h1>
          {description.map((part, index) => {
            return <p key={index}>{part}</p>;
          })}
        </Col>
      </Row>
    </ScrollableAnchor>
  );

  const rightImgProgram = (
    <ScrollableAnchor id={programClass}>
      <Row data-aos='fade-right' data-aos-duration='1500'>
        <Col md={6} className='program-text'>
          <h1 className={programClass}>{header}</h1>
          {description.map((part, index) => {
            return <p key={index}>{part}</p>;
          })}
        </Col>
        <Col md={6}>
          <Image rounded src={image} className='program-img' alt='program' />
        </Col>
      </Row>
    </ScrollableAnchor>
  );

  return (
    <div className='program-container'>
      {/* The program index will take in the index from the array of programs. If the index is even, it will get the img on the left. If odd, image will be on the right. */}
      {programIndex % 2 === 0 || !screenWidth
        ? leftImgProgram
        : rightImgProgram}
    </div>
  );
}

export default Program;
