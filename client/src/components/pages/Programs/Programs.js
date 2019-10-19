import React, { Component } from "react";
import { connect } from "react-redux";
import ScrollableAnchor from "react-scrollable-anchor";
import { Row, Col, Image } from "react-bootstrap";
import {
  getPrograms,
  addProgram,
  deleteProgram,
  updateProgram,
  programSuccessAlertClose
} from "../../../actions/programsActions";

import Program from "../Programs/Program";
import TryUs from "../../common/TryUs";
import Contact from "../../common/Contact";
import Loader from "../../common/Loader";
import SuccessAlert from "../../common/SuccessAlert";

import girlWithBear from "../../../img/Programs/girl with bear.jpg";

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
  }

  setscreenWidth = () => {
    if (window.innerWidth > 765) {
      this.setState({ screenWidth: true });
    } else {
      this.setState({ screenWidth: false });
    }
  };

  render() {
    const {
      programs,
      originURL,
      programSuccessOpen,
      programSuccessMessage
    } = this.props.programs;
    const { isAuthenticated } = this.props.auth;
    const {
      getPrograms,
      addProgram,
      deleteProgram,
      updateProgram,
      programSuccessAlertClose
    } = this.props;

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
        <div className='programs'>
          {programs ? (
            programs.map(
              ({ imagePath, header, description, textColor, _id }, index) => {
                const isLastProgram = index + 1 === programs.length;
                return (
                  <Program
                    programIndex={index}
                    screenWidth={this.state.screenWidth}
                    image={originURL + imagePath}
                    header={header}
                    description={description}
                    textColor={textColor}
                    key={index}
                    mongoId={_id}
                    isLastProgram={isLastProgram}
                    getPrograms={getPrograms}
                    addProgram={addProgram}
                    deleteProgram={deleteProgram}
                    updateProgram={updateProgram}
                    isAuthenticated={isAuthenticated}
                  />
                );
              }
            )
          ) : (
            <Loader />
          )}
        </div>
        <ScrollableAnchor id={"contact"}>
          <div>
            <Contact />
          </div>
        </ScrollableAnchor>
        {/* Success alert, only shows when program is added, updated, or deleted */}
        <SuccessAlert
          successOpen={programSuccessOpen}
          handleSuccessClose={programSuccessAlertClose}
          message={programSuccessMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  programs: state.programs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getPrograms,
    addProgram,
    deleteProgram,
    updateProgram,
    programSuccessAlertClose
  }
)(Programs);
