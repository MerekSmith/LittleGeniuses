import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import kids from "../../../img/Carousel/kids.png";
import girl from "../../../img/Carousel/girl.jpg";
import toy from "../../../img/Carousel/toy.jpg";
import laughingKids from "../../../img/Testimonials/happy-kids.jpg";

function CarouselSlides() {
  return (
    <div className='carousel-container'>
      <Carousel interval={4000} pauseOnHover={false}>
        <Carousel.Item>
          <img className='d-block w-150' src={kids} alt='Third slide' />

          <Carousel.Caption>
            <div style={{ textAlign: "center" }}>
              <h1>LITTLE GENIUSES</h1>
              <h4>A nurturing and caring environment</h4>
              <p>
                Welcome to Little Geniuses Learning Center, a daycare in
                Midvale, Utah where the essence of a child is nurtured in our
                unconditionally loving, supporitive and safe environment in a
                bright, spacious and well equiped center.
              </p>
              <a href='#contact' className='btn btn-light btn-lg caption-btn'>
                Enroll Now!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-150' src={girl} alt='Third slide' />

          <Carousel.Caption>
            <h1>We care about your kid's success.</h1>
            <p>
              Check out our exciting, educational programs developed
              specifically for each age group.
            </p>
            <Link to='/programs' className='btn btn-light btn-lg caption-btn'>
              Programs
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='dark-overlay'>
          <img className='d-block w-150' src={laughingKids} alt='First slide' />
          <Carousel.Caption>
            <h1>
              Are you looking for childcare with a safe and secure environment?
            </h1>
            <p>We offer a safe atmosphere where your child can be cared for.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-150' src={toy} alt='Third slide' />

          <Carousel.Caption>
            <h1>We know fun.</h1>
            <p>
              Along with our stimulating daily activities, we have an exciting
              and fun summer program!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-150' src={kids} alt='Third slide' />

          <Carousel.Caption>
            <h1>We offer before and after school care.</h1>
            <Link
              to='/programs/#school'
              className='btn btn-light btn-lg caption-btn'
            >
              Learn More
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselSlides;
