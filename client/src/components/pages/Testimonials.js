import React, { Component } from "react";
import axios from "axios";

const apiKey = "AIzaSyDrJ2jYTcTV4CXCEDAOtshmpwuEZaKixo4";
const placeID = "ChIJC9CH0myJUocRQSSLj5EUZtk";
const fields = "reviews,rating,user_ratings_total";
const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeID}&language=en&fields=${fields}&key=${apiKey}`;

class Testimonials extends Component {
  constructor() {
    super();

    this.state = {
      reviews: null,
      rating: "",
      reviewCount: ""
    };
  }

  componentDidMount() {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.get(url, { crossDomain: true }).then(res => {
      const { reviews, rating, user_ratings_total } = res.data;

      this.setState({ reviews, rating, reviewCount: user_ratings_total });
      console.log("reviews got", res.data);
    });
  }

  render() {
    return (
      <div>
        <h1 className='page-header'>Testimonials</h1>
      </div>
    );
  }
}

export default Testimonials;
