import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import EditCarouselIcons from "../../common/EditCarouselIcons";

import kids from "../../../img/Carousel/kids.png";
import girl from "../../../img/Carousel/girl.jpg";
import toy from "../../../img/Carousel/toy.jpg";
import teaching from "../../../img/Carousel/teaching.jpg";
import reading from "../../../img/Carousel/reading.jpg";

function CarouselSlides(props) {
  const { slides, originURL } = props.carousel;
  const {
    getCarouselSlides,
    addCarouselSlide,
    updateCarouselSlide,
    deleteCarouselSlide,
    isAuthenticated
  } = props;
  const pause = isAuthenticated;

  return (
    <div className='carousel-container'>
      <Carousel interval={4000} pauseOnHover={pause}>
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
          <img className='d-block w-150' src={teaching} alt='Third slide' />

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
          <img className='d-block w-150' src={girl} alt='First slide' />
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
          <img className='d-block w-150' src={reading} alt='Third slide' />

          <Carousel.Caption>
            <h1>We offer before and after school care.</h1>
            <Link
              to='/programs/#Before%20and%20After%20School%20Care'
              className='btn btn-light btn-lg caption-btn'
            >
              Learn More
            </Link>
          </Carousel.Caption>
        </Carousel.Item>

        {slides &&
          slides.map((slide, index) => {
            const { imagePath, header, details, link, linkName } = slide;
            const isLastSlide = index + 1 === slides.length;
            return (
              <Carousel.Item key={index}>
                <img
                  className='d-block w-150'
                  src={imagePath}
                  alt='Carousel slide'
                />

                <Carousel.Caption>
                  <h1>{header}</h1>
                  {details && <p>{details}</p>}
                  {link && (
                    <Link
                      to={link}
                      className='btn btn-light btn-lg caption-btn'
                    >
                      {linkName}
                    </Link>
                  )}
                </Carousel.Caption>
                {isAuthenticated && (
                  <EditCarouselIcons
                    slide={slide}
                    slideIndex={index}
                    isLastSlide={isLastSlide}
                    getCarouselSlides={getCarouselSlides}
                    addCarouselSlide={addCarouselSlide}
                    updateCarouselSlide={updateCarouselSlide}
                    deleteCarouselSlide={deleteCarouselSlide}
                  />
                )}
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
}

export default CarouselSlides;
