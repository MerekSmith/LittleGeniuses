import React, { Component } from "react";
import CalendarComp from "../google/Calendar";

class Events extends Component {
  render() {
    return (
      <div className='events-container'>
        <h1 className='page-header'>Upcoming Events</h1>
        <div className='calendar-container'>
          <CalendarComp />
        </div>
      </div>
    );
  }
}

export default Events;
