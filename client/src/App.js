import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { getReviews } from "./actions/reviewsActions";
import { getPrograms } from "./actions/programsActions";
import { getTeachers } from "./actions/teachersActions";
import { getCarouselSlides } from "./actions/carouselActions";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { configureAnchors } from "react-scrollable-anchor";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing/Landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Programs from "./components/pages/Programs/Programs";
import Events from "./components/pages/Events";
import Testimonials from "./components/pages/Testimonials/Testimonials";
import Staff from "./components/pages/Staff/Staff";
import Facility from "./components/pages/Facility/Facility";
import ContactUs from "./components/pages/ContactUs";
import NotFound from "./components/not-found/NotFound";

// CSS Imports
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";
import "animate.css";
import "./css/parallax.css";
import "./css/landing.css";
import "./css/navbar.css";
import "./css/events.css";
import "./css/tryus.css";
import "./css/programs.css";
import "./css/editIcons.css";
import "./css/staff.css";
import "./css/facility.css";
import "./css/testimonials.css";
import "./css/custom_calendar.css";

AOS.init();

// This calls the redux action which makes an API call to the server which makes an API call to Google Places ID to get review data. Once completed, this is passed back into the redux state under reviews.
store.dispatch(getCarouselSlides());
store.dispatch(getReviews());
store.dispatch(getPrograms());
store.dispatch(getTeachers());

configureAnchors({
  offset: -20,
  scrollDuration: 800,
  keepLastAnchorHash: false
});

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set iser and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <div className='container'>
                <Switch>
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/admin' component={Login} />
                  <Route exact path='/programs' component={Programs} />
                  <Route exact path='/events' component={Events} />
                  <Route exact path='/testimonials' component={Testimonials} />
                  <Route exact path='/staff' component={Staff} />
                  <Route exact path='/facility' component={Facility} />
                  <Route exact path='/contact' component={ContactUs} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
