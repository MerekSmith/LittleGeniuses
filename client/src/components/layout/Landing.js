import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Carousel } from "react-bootstrap";

import kids from "../../img/Carousel/kids.png";
import girl from "../../img/Carousel/girl.jpg";
import toy from "../../img/Carousel/toy.jpg";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className='landing'>
        <Carousel interval={4000} pauseOnHover={false}>
          <Carousel.Item>
            <img className='d-block w-150' src={kids} alt='Third slide' />

            <Carousel.Caption>
              <h1>We care about your kid's success.</h1>
              <p>
                Check out our exciting, educational programs developed
                specifically for each age group.
              </p>
              <Link to='/' className='btn btn-outline-light btn-lg caption-btn'>
                Programs
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className='dark-overlay'>
            <img className='d-block w-150' src={girl} alt='First slide' />
            <Carousel.Caption>
              <h1>
                Are you looking for childcare with a safe and secure
                environment?
              </h1>
              <p>
                We offer a safe atmosphere where your child can be cared for.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-150' src={toy} alt='Third slide' />

            <Carousel.Caption>
              <h1>We know fun.</h1>
              <p>
                Along with our stimulating daily activities, we have an exciting
                and fun summer program!
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-150' src={girl} alt='Fourth slide' />

            <Carousel.Caption>
              <h1>Contact us now to enroll</h1>
              <Link to='/' className='btn btn-outline-light btn-lg caption-btn'>
                Enroll Now
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
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
