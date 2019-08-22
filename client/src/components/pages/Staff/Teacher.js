import React from "react";
import { Col, Image } from "react-bootstrap";

function Teacher(props) {
  const { image, name, bio } = props;
  return (
    <Col xs={12} md={4} className='teacher-info'>
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
