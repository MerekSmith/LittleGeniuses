import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

import EditCarouselIcons from "../../common/EditCarouselIcons";

import girlWithGlobe from "../../../img/Final_Stock_Pics/girlWithGlobe.jpeg";
import safeEnvironment from "../../../img/Final_Stock_Pics/safeEnvironment.jpeg";

function CarouselSlides(props) {
  const {
    carousel: { slides },
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
          <img
            className='d-block w-150'
            src={girlWithGlobe}
            alt='Third slide'
          />

          <Carousel.Caption>
            <div style={{ textAlign: "center" }} className='main-carousel-text'>
              <h2>LITTLE GENIUSES</h2>
              <h6>A nurturing and caring environment</h6>
              <p style={{ marginBottom: "0px" }}>
                Welcome to Little Geniuses Learning Center, a daycare in
                Midvale, Utah where the essence of a child is nurtured in our
                unconditionally loving, supporitive and safe environment in a
                bright, spacious and well equiped center.
              </p>
              <a
                href='#contact'
                className='btn btn-outline-light btn-lg caption-btn'
              >
                Enroll Now!
              </a>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        {/* This is where the custom database slides are inserted into the Carousel. */}
        {slides &&
          slides.map((slide, index) => {
            const { imageUrl, header, details, link, linkName } = slide;
            const isLastSlide = index + 1 === slides.length;

            // const blob = new Blob([image.data.data], {type: 'image/gif'});
            // let imageUrl = URL.createObjectURL(blob);

            // const base64Flag = `data:${slide.image.contentType};base64,`;
            // const imgString = helpers.arrayBufferToBase64(
            //   slide.image.data.data
            // );
            // const imageUrl = base64Flag + imgString;

            return (
              <Carousel.Item key={index}>
                <img
                  className='d-block w-150'
                  src={imageUrl}
                  alt='Carousel slide'
                />

                <Carousel.Caption>
                  <h1>{header}</h1>
                  {details && <p>{details}</p>}
                  {link && (
                    <Link
                      to={link}
                      className='btn btn-outline-light btn-lg caption-btn'
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
        <Carousel.Item className='dark-overlay'>
          <img
            className='d-block w-150'
            src={safeEnvironment}
            alt='First slide'
          />
          <Carousel.Caption>
            <h1>
              Are you looking for childcare with a safe and secure environment?
            </h1>
            <p>We offer a safe atmosphere where your child can be cared for.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselSlides;
