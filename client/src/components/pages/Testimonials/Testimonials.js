import React, { Component } from "react";
import { connect } from "react-redux";
import { getReviews } from "../../../actions/reviewsActions";

import Review from "./Review";
import Stars from "./Stars";

class Testimonials extends Component {
  componentDidMount() {
    // This calls the redux action which makes an API call to the server which makes an API call to Google Places ID to get review data. Once completed, this is passed back into the redux state under reviews.
    if (!this.props.reviews.reviews) {
      this.props.getReviews();
    }
  }

  render() {
    const { reviews, rating, reviewCount } = this.props.reviews;
    // This turns the rating into a percentage (ie 40%, 60%, 100%) which is used on the stars-inner class width which determines how many stars should be filled in.
    const starPercentage = rating * 0.2 * 100 + "%";

    return (
      <div>
        <div className='parallax testimonials-bg'>
          <div className='testimonials-parallax-caption'>
            <h1 className='page-header'>Little Genius Reviews:</h1>
            <h2 className='second-header'>stories from our customers</h2>
            <div className='main-stars-container'>
              <Stars starPercentage={starPercentage} />
            </div>
            <h4>
              {rating} average from {reviewCount} ratings
            </h4>
          </div>
        </div>
        <div className='reviews-container'>
          <h1 className='page-header'>Testimonials</h1>
          {/* Only shows component if the reviews array has been filled from the API call. If not, it remains null. */}
          {reviews &&
            reviews.map((review, index) => {
              return <Review key={index} review={review} />;
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reviews: state.reviews
});

export default connect(
  mapStateToProps,
  { getReviews }
)(Testimonials);
