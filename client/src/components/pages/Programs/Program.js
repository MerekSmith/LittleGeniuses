import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";

import EditProgramIcons from "../../common/EditProgramIcons";

function Program(props) {
  const {
    programIndex,
    screenWidth,
    image,
    imageUrl,
    header,
    description,
    textColor,
    mongoId,
    isLastProgram,
    isAuthenticated,
    // Actions passed down from Programs component
    addProgram,
    getPrograms,
    deleteProgram,
    updateProgram
  } = props;

  // Pull the first part of the header and use as anchor for scrollingAnchor in Program component.
  const anchor = header.split(" ")[0];
  // This provides the order that the columns should appear in the program row. The program index will take in the index from the array of programs. If the index is even, it will get the img on the left. If odd, image will be on the right.
  let textOrder = 1;
  let imgOrder = 12;
  if (programIndex % 2 === 0 || !screenWidth) {
    textOrder = 12;
    imgOrder = 1;
  }
  const fadeType = screenWidth ? "fade-left" : "fade-up";

  return (
    <div className='program-container'>
      <ScrollableAnchor id={anchor}>
        <Row data-aos={fadeType} data-aos-duration='1500'>
          <Col md={{ order: imgOrder }}>
            <Image rounded src={imageUrl} className='program-img' alt='program' />
          </Col>
          <Col md={{ order: textOrder }} className='program-text'>
            <h1 style={{ color: textColor }}>{header}</h1>
            {description.map((descLine, index) => {
              return <p key={index}>{descLine}</p>;
            })}
          </Col>
          {/* Checks is user is authenticated, if so they can have access to view edit icons. */}
          {isAuthenticated && (
            <EditProgramIcons
              program={{
                header,
                description,
                textColor,
                image,
                programIndex,
                mongoId
              }}
              isLastProgram={isLastProgram}
              // actions passed down from Programs
              getPrograms={getPrograms}
              addProgram={addProgram}
              deleteProgram={deleteProgram}
              updateProgram={updateProgram}
            />
          )}
        </Row>
      </ScrollableAnchor>
    </div>
  );
}

export default Program;
