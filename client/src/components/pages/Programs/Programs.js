import React, { Component } from "react";
import { connect } from "react-redux";
import ScrollableAnchor from "react-scrollable-anchor";
import { Row, Col, Image } from "react-bootstrap";
import { getPrograms } from "../../../actions/programsActions";

import Program from "../Programs/Program";
import TryUs from "../../common/TryUs";
import Contact from "../../common/Contact";
import UploadForm from "../../common/UploadForm";
import Loader from "../../common/Loader";

import infant from "../../../img/Programs/program1.jpg";
import twoYear from "../../../img/Programs/program2.jpg";
import preschool from "../../../img/Programs/program3.jpg";
import special from "../../../img/Programs/program4.jpg";
import school from "../../../img/Programs/program5.jpg";
import girlWithBear from "../../../img/Programs/girl with bear.jpg";

// Description must be an array, even if just one part, to create line breaks when displayed.
const programsArray = [
  {
    image: infant,
    header: "Infant & Toddler Class",
    description: [
      "Your youngest learners need to feel safe and supported so  they can learn with their whole body and all of their senses. In a HighScope infant and toddler program, our teachers focus on developing supportive, trusting relationships with the children in their care. We create a rich environment that encourage very young children to explore and discover the world around them helping them to engage in experiences designed to support their optimal development in all domains."
    ],
    programClass: "infant"
  },
  {
    image: twoYear,
    header: "2-Year Old Class",
    description: [
      "Our Terrific TWO'S program is full of creativity and movement and is designed to meet the developmental needs of a growing two year old.",
      "The program provides challenging opportunities to advance children's skills as they transition into their third year of life.",
      "Group time, art, stories, music and movement, science, and a playground equipped with all the things growing two year olds love, helps give them the stimulation they need to develop and grow into a healthy and happy preschooler.",
      "NEW PROGRAM ( Bilingual dual language)."
    ],
    programClass: "twoYear"
  },
  {
    image: preschool,
    header: "Preschool Class",
    description: [
      "In a High = Scope program, teachers ignite children's interest in learning by creating an environment that encourages them to explore learning materials and interact with adults and peers. We focus on supporting early learners as they make decisions, build academic skills, develop socially and emotionally, and become part of a classroom community."
    ],
    programClass: "preschool"
  },
  {
    image: special,
    header: "Special Programs",
    description: [
      "We provide Drop-In care. We cater to parents who have flexible schedules and not always need care on a daily basis. We strive to cater to parents who have unique needs."
    ],
    programClass: "special"
  },
  {
    image: school,
    header: "Before and After School Care",
    description: [
      "We provide transportation to and from school in the Midvale area. During the school year we offer tutoring, Bilingual dual language and fun activities. We offer a awesome summer camp program loaded with fieldtrips and fun activities."
    ],
    programClass: "school"
  }
];

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth > 765
    };
  }
  // When the landing page component is loaded, the sizing event listener starts.
  componentDidMount() {
    window.addEventListener("resize", this.setscreenWidth);

    this.props.getPrograms();
    console.log("programs", this.props.programs);
  }

  setscreenWidth = () => {
    if (window.innerWidth > 765) {
      this.setState({ screenWidth: true });
    } else {
      this.setState({ screenWidth: false });
    }
  };

  render() {
    const { programs, originURL } = this.props.programs;

    return (
      <div className='programs-container'>
        <Row className='tryus-programs-row justify-content-md-center'>
          <Col md={5} className='tryus-programs-img-container'>
            <Image
              rounded
              src={girlWithBear}
              className='tryus-programs-img'
              alt='Try Us'
            />
          </Col>
          <Col md={4} className='tryus-programs'>
            <TryUs />
          </Col>
        </Row>
        <h1 className='page-header'>Our Programs</h1>
        {/* {this.props.programs.programs ? (
          <img
            src={
              "http://localhost:5000" +
              this.props.programs.programs[0].imagePath
            }
            alt='img'
          />
        ) : null} */}
        <div className='programs'>
          {programs ? (
            programs.map((program, index) => {
              const { imagePath, header, description, textColor } = program;
              return (
                <Program
                  programIndex={index}
                  screenWidth={this.state.screenWidth}
                  image={originURL + imagePath}
                  header={header}
                  description={description}
                  textColor={textColor}
                  key={index}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
        <br />
        <UploadForm getPrograms={this.props.getPrograms} />
        <br />
        <ScrollableAnchor id={"contact"}>
          <div>
            <Contact />
          </div>
        </ScrollableAnchor>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  programs: state.programs
});

export default connect(
  mapStateToProps,
  { getPrograms }
)(Programs);
