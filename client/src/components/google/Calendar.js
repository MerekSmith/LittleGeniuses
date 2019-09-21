import React from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

import "../../css/main.scss"; // webpack must be configured to do this

class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        defaultView='dayGridMonth'
        header={{
          left: "prev,next, today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,listWeek, listYear"
        }}
        plugins={[
          dayGridPlugin,
          listPlugin,
          timeGridPlugin,
          googleCalendarPlugin
        ]}
        weekends={false}
        googleCalendarApiKey='AIzaSyA_UMSFWJbiTaMScNMbNvTk7I5ti4EuXHE'
        eventSources={[
          {
            googleCalendarId: "littlegeniusesmidvale@gmail.com",
            className: "learning-center"
          },
          {
            googleCalendarId:
              "tpn9gjmigr7ustjhe95r8gprrc@group.calendar.google.com",
            className: "summer-non-graders"
          },
          {
            googleCalendarId:
              "gvgse8kpjgbr5ekg8lvaqioof8@group.calendar.google.com",
            className: "summer-graders"
          }
        ]}
        eventClick={arg => {
          // prevents the redirect to google calendar from clicking an event.
          arg.jsEvent.preventDefault();
        }}
      />
    );
  }
}

export default Calendar;
