import React from "react";
import { Col, Image } from "react-bootstrap";

import EditTeacherIcons from "../../common/EditTeacherIcons";

function Teacher(props) {
  const {
    name,
    position,
    bio,
    image,
    imageUrl,
    order,
    mongoId,
    teacherIndex,
    isLastTeacher,
    isAuthenticated,
    getTeachers,
    addTeacher,
    deleteTeacher,
    updateTeacher
  } = props;
  return (
    <Col
      xs={12}
      sm={6}
      md={4}
      className='teacher-info'
      data-aos='zoom-in-up'
      data-aos-duration='1500'
    >
      <Image rounded src={imageUrl} alt={name} className='teacher-img' />
      <h2 className='teacher-name'>{name}</h2>
      <h5 className='teacher-position'>{position}</h5>
      {bio.map((bioLine, index) => {
        return (
          <p className='teacher-bio' key={index}>
            {bioLine}
          </p>
        );
      })}

      {isAuthenticated && (
        <EditTeacherIcons
          teacher={{
            name,
            position,
            bio,
            image,
            order,
            teacherIndex,
            mongoId
          }}
          isLastTeacher={isLastTeacher}
          // actions passed down from Teachers
          getTeachers={getTeachers}
          addTeacher={addTeacher}
          deleteTeacher={deleteTeacher}
          updateTeacher={updateTeacher}
        />
      )}
    </Col>
  );
}

export default Teacher;
