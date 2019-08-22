import React, { Component } from "react";
import Teacher from "./Teacher";
import { Row } from "react-bootstrap";

import teacher1 from "../../../img/teachers/teacher1.jpg";
import teacher2 from "../../../img/teachers/teacher2.jpg";
import teacher3 from "../../../img/teachers/teacher3.jpg";

const teachers = [
  { image: teacher2, name: "Gloria", bio: "Gloria is awesome!" },
  { image: teacher2, name: "Dana", bio: "Dana is awesome too!" },
  {
    image: teacher1,
    name: "Teacher",
    bio:
      "This is a placeholder for a teacher bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a purus vitae leo condimentum iaculis et id neque. Nullam sodales nisi at lorem venenatis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien."
  },
  {
    image: teacher2,
    name: "Teacher",
    bio:
      "This is a placeholder for a teacher bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a purus vitae leo condimentum iaculis et id neque. Nullam sodales nisi at lorem venenatis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien."
  },
  {
    image: teacher3,
    name: "Teacher",
    bio:
      "This is a placeholder for a teacher bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a purus vitae leo condimentum iaculis et id neque. Nullam sodales nisi at lorem venenatis varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin interdum ultricies sapien."
  }
];

class Teachers extends Component {
  render() {
    return (
      <div>
        <h1 className='teachers-heading'>Meet Our Teachers</h1>
        <Row className='teachers'>
          {teachers.map(({ image, name, bio }, index) => {
            return <Teacher image={image} name={name} bio={bio} key={index} />;
          })}
        </Row>
      </div>
    );
  }
}

export default Teachers;
