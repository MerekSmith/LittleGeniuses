import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import logo from "../../img/logo.jpg";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth > 500 ? true : false
    };
  }

  // When the Navbar component is loaded, the sizing event listener starts.
  componentDidMount() {
    window.addEventListener("resize", this.setscreenWidth);
  }

  // Listen event for screen resizing. This then updates the state screenWidth variable. If the screen width goes below 500px, the game collection table is removed as it does not properly respond to a phone in portrait mode and messes up the page to include a section of white on the right. With this dynamic approach, the table will now show up if someone is able to switch to a larger format, such as moving their phone/tablet to landscape.
  setscreenWidth = () => {
    if (window.innerWidth > 500) {
      this.setState({ screenWidth: true });
    } else {
      this.setState({ screenWidth: false });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { screenWidth } = this.state;

    const contactInfo = (
      <ul className='ml-auto'>
        <li className='navbar-text'>littlegeniusesmidvale@gmail.com</li>
        <li className='navbar-text'>385-275-7233</li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-light'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            <img src={logo} className='nav-logo' alt='Little Geniuses Logo' />
          </Link>
          {!screenWidth ? contactInfo : null}
          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/programs'>
                  Programs
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/events'>
                  Events
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/testimonials'>
                  Testimonials
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/staff'>
                  Staff
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/facility'>
                  Our Facility
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/contact'>
                  Contact Us
                </Link>
              </li>
              {isAuthenticated && (
                <React.Fragment>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/admin'>
                      Admin
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <div
                      className='nav-link'
                      style={{ cursor: "pointer" }}
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </div>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
          {screenWidth ? contactInfo : null}
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon' />
          </button>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
