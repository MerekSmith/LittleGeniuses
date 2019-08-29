import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function FacilitySlides() {
  return (
    <Carousel autoPlay>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-1.jpg'
          alt='image1'
        />
        <p className='legend'>Legend 1</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-2.jpg'
          alt='image2'
        />
        <p className='legend'>Legend 2</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-3.jpg'
          alt='image3'
        />
        <p className='legend'>Legend 3</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-4.jpg'
          alt='image4'
        />
        <p className='legend'>Legend 4</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-5.jpg'
          alt='image5'
        />
        <p className='legend'>Legend 5</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-6.jpg'
          alt='image6'
        />
        <p className='legend'>Legend 6</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-7.jpg'
          alt='image7'
        />
        <p className='legend'>Legend 7</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-8.jpg'
          alt='image8'
        />
        <p className='legend'>Legend 8</p>
      </div>
      <div>
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-9.jpg'
          alt='image9'
        />
        <p className='legend'>Legend 9</p>
      </div>
    </Carousel>
  );
}

export default FacilitySlides;
