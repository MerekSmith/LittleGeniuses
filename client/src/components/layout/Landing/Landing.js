import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCarouselSlides,
  addCarouselSlide,
  updateCarouselSlide,
  deleteCarouselSlide,
  carouselSuccessAlertClose
} from "../../../actions/carouselActions";
import { Row, Col, Image } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";

import CarouselSlides from "./CarouselSlides";
import Balloon from "../../common/Balloon";
import TryUs from "../../common/TryUs";
import Contact from "../../common/Contact";
import SuccessAlert from "../../common/SuccessAlert";
// import SuccessSnackbar from "../../common/SuccessSnackbar";

import orangeBalloon from "../../../img/Round Balloons/balloon_round_orange.png";
import redBalloon from "../../../img/Round Balloons/balloon_round_red.png";
import greenBalloon from "../../../img/Round Balloons/balloon_round_green.png";
import purpleBalloon from "../../../img/Round Balloons/balloon_round_purple.png";
import blueBalloon from "../../../img/Round Balloons/balloon_round_blue.png";
import dressup from "../../../img/Landing/dressup.jpg";

import dropIn from "../../../img/Landing/dropin.jpg";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const {
      carousel,
      getCarouselSlides,
      addCarouselSlide,
      updateCarouselSlide,
      deleteCarouselSlide,
      carouselSuccessAlertClose
    } = this.props;
    const { carouselSuccessOpen, carouselSuccessMessage } = carousel;
    const { isAuthenticated } = this.props.auth;

    return (
      <div className='landing'>
        <CarouselSlides
          carousel={carousel}
          getCarouselSlides={getCarouselSlides}
          addCarouselSlide={addCarouselSlide}
          updateCarouselSlide={updateCarouselSlide}
          deleteCarouselSlide={deleteCarouselSlide}
          isAuthenticated={isAuthenticated}
        />
        <div className='container'>
          <div className='content'>
            <h3>Every child is unique, like a finger print.</h3>
            <p>
              At Little Geniuses we encourage each child to leave their special
              mark. We cater to children 3 months to 12 years of age, with
              programs specially designed for infants, toddlers, preschool and
              school age We focus on the framework for Early Childhood settings;
              to enhance and enrich your child's early years, so that their
              individual personalities shine through.
            </p>
          </div>
          <Row className='program-balloons'>
            <Col>
              <Balloon
                balloon={redBalloon}
                delay='100'
                btnText='Infant & Toddler Class'
                link='/programs/#Infant'
              />
            </Col>
            <Col>
              <Balloon
                balloon={orangeBalloon}
                delay='300'
                btnText='2-Year Old Class'
                link='/programs/#2-Year'
              />
            </Col>
            <Col>
              <Balloon
                balloon={greenBalloon}
                delay='500'
                btnText='Preschool Class'
                link='/programs/#Preschool'
              />
            </Col>
            <Col>
              <Balloon
                balloon={purpleBalloon}
                delay='700'
                btnText='Special Programs'
                link='/programs/#Special'
              />
            </Col>
            <Col>
              <Balloon
                balloon={blueBalloon}
                delay='900'
                btnText='Before & After School'
                link='/programs/#Before'
              />
            </Col>
          </Row>
          <Row className='drop-in justify-content-md-center'>
            <Col lg={6} sm={10} className='drop-in-img-container'>
              <Image
                rounded
                src={dropIn}
                className='drop-in-img'
                alt='Drop In'
              />
            </Col>
            <Col lg={6} sm={10} className='drop-in-text'>
              <h1>DROP INS WELCOME</h1>
              <p>
                We cater to parents who have flexible schedules and do not
                always need care on a daily basis.&#10; We strive to cater to
                parents who have unique needs.
              </p>
            </Col>
          </Row>
          <Row className='color-text-box1 justify-content-md-center'>
            <Col md={6} className='text-container'>
              <h1>
                Beautiful place! Your kids will enjoy a fun learning environment
                with amazing professionals.
              </h1>
              <h5>-Juliana Marin</h5>
            </Col>
          </Row>
          <Row className='tryus-landing-container justify-content-md-center'>
            <Col md={4} className='tryus-landing-img-container'>
              <Image
                rounded
                src={dressup}
                className='tryus-landing-img'
                alt='Try Us'
              />
            </Col>
            <Col md={4} className='tryus-landing'>
              <TryUs />
            </Col>
          </Row>
          {/* TODO: Paralax picture then below Contact component */}
          <Row />
          <Row className='parallax landing-bg' />
          <ScrollableAnchor id={"contact"}>
            <div className='landing-contact'>
              <Contact />
            </div>
          </ScrollableAnchor>
        </div>
        <SuccessAlert
          successOpen={carouselSuccessOpen}
          handleSuccessClose={carouselSuccessAlertClose}
          message={carouselSuccessMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  carousel: state.carousel
});

export default connect(
  mapStateToProps,
  {
    getCarouselSlides,
    addCarouselSlide,
    updateCarouselSlide,
    deleteCarouselSlide,
    carouselSuccessAlertClose
  }
)(Landing);
