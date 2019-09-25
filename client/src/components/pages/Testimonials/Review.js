import React from "react";
import { Row, Col } from "react-bootstrap";

import Stars from "./Stars";

export default function Review(props) {
  const {
    text,
    profile_photo_url,
    author_name,
    relative_time_description,
    rating
  } = props.review;

  // This turns the rating into a percentage (ie 40%, 60%, 100%) which is used on the stars-inner class width which determines how many stars should be filled in.
  const starPercentage = rating * 0.2 * 100 + "%";

  return (
    <Row
      className='review-container justify-content-md-center'
      data-aos='fade-up'
    >
      <Col xs={6} sm={6} lg={1} className='reviewer-image-container'>
        <img
          src={profile_photo_url}
          className='reviewer-image'
          alt='profile-pic'
        ></img>
      </Col>
      <Col xs={6} sm={6} lg={2}>
        <Stars starPercentage={starPercentage} />
        {/* <div className='stars-outer'>
          <div className='stars-inner' style={{ width: starPercentage }}></div>
        </div> */}
        <div className='review-details'>{relative_time_description}</div>
        <div className='author-name'>{author_name}</div>
      </Col>
      <Col md={12} lg={9} fluid='true' className='review-text-container'>
        <i className='fas fa-quote-left quotes'></i>
        <p>{text}</p>
      </Col>
    </Row>
  );
}
