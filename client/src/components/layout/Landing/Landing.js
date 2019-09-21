import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import ScrollableAnchor from "react-scrollable-anchor";

import CarouselSlides from "./CarouselSlides";
import Balloon from "../../common/Balloon";
import TryUs from "../../common/TryUs";
import Contact from "../../common/Contact";

import orangeBalloon from "../../../img/Round Balloons/balloon_round_orange.png";
import redBalloon from "../../../img/Round Balloons/balloon_round_red.png";
import greenBalloon from "../../../img/Round Balloons/balloon_round_green.png";
import purpleBalloon from "../../../img/Round Balloons/balloon_round_purple.png";
import dressup from "../../../img/Landing/dressup.jpg";

import dropIn from "../../../img/Landing/dropin.jpg";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className='landing'>
        <CarouselSlides />
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
              />
            </Col>
            <Col>
              <Balloon
                balloon={orangeBalloon}
                delay='300'
                btnText='2-Year Old Class'
              />
            </Col>
            <Col>
              <Balloon
                balloon={greenBalloon}
                delay='500'
                btnText='Preschool Class'
              />
            </Col>
            <Col>
              <Balloon
                balloon={purpleBalloon}
                delay='700'
                btnText='Special Programs'
              />
            </Col>
          </Row>
          <Row className='drop-in justify-content-md-center'>
            <Col md={5} className='drop-in-img-container'>
              <Image
                rounded
                src={dropIn}
                className='drop-in-img'
                alt='Drop In'
              />
            </Col>
            <Col md={5} className='drop-in-text'>
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
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
