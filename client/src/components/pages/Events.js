import React, { Component } from "react";
import Calendar from "../google/Calendar";
import { Row, Col } from "react-bootstrap";

class Events extends Component {
  render() {
    return (
      <div className='events-container'>
        <h1 className='page-header'>Upcoming Events</h1>
        <Row>
          <Col>
            <Calendar />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Events;
