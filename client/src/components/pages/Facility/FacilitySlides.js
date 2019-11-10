import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import EditIcons from "../../common/EditProgramIcons";
import { relative } from "path";

const facilitySlides = [
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-2.jpg",
    alt: "image2",
    legendName: "Legend 2"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-3.jpg",
    alt: "image3",
    legendName: "Legend 3"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-4.jpg",
    alt: "image4",
    legendName: "Legend 4"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-5.jpg",
    alt: "image5",
    legendName: "Legend 5"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-6.jpg",
    alt: "image6",
    legendName: "Legend 6"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-7.jpg",
    alt: "image7",
    legendName: "Legend 7"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-8.jpg",
    alt: "image8",
    legendName: "Legend 8"
  },
  {
    image: "http://lorempixel.com/output/cats-q-c-640-480-9.jpg",
    alt: "image9",
    legendName: "Legend 9"
  }
];

function FacilitySlides() {
  return (
    <Carousel>
      <div style={{ position: relative, zIndex: 1 }}>
        <EditIcons
          program={{ mongoId: 1, description: [1, 2] }}
          isLastProgram={true}
          addProgram={() => null}
          updateProgram={() => null}
          // Once we make the edit icons for facility slides, add inline styling of right: "32px"
        />
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-1.jpg'
          alt='image1'
        />
        <p className='legend'>Legend 1</p>
      </div>
      <div>
        <EditIcons
          program={{ mongoId: 1, description: [1, 2] }}
          isLastProgram={true}
          addProgram={() => null}
          updateProgram={() => null}
        />
        <img
          src='http://lorempixel.com/output/cats-q-c-640-480-2.jpg'
          alt='image2'
        />
        <p className='legend'>Legend 3</p>
      </div>

      {/* Maps through hard coded images */}
      {/* {facilitySlides.map(({ image, alt, legendName }, index) => (
        <div key={index}>
          <img src={image} alt={alt} />
          <p className='legend'>{legendName}</p>
        </div>
      ))}} */}
    </Carousel>
  );
}

export default FacilitySlides;
