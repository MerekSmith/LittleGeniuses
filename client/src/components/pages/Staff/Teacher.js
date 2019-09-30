import React from "react";
import { Col, Image } from "react-bootstrap";

function Teacher(props) {
  const { image, name, bio } = props;
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      className='teacher-info'
      data-aos='zoom-in-up'
      data-aos-duration='1500'
    >
      <Image
        rounded
        src={image}
        alt='teacher picture'
        className='teacher-img'
      />
      <h3 className='teacher-name'>{name}</h3>
      <p className='teacher-bio'>{bio}</p>
    </Col>
  );
}

export default Teacher;
