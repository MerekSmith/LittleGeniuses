import React from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import googleCalendarPlugin from "@fullcalendar/google-calendar";

import "../../css/main.scss"; // webpack must be configured to do this

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenWidth: window.innerWidth > 765
    };
  }

  // When the landing page component is loaded, the sizing event listener starts.
  componentDidMount() {
    window.addEventListener("resize", this.setscreenWidth);
  }

  setscreenWidth = () => {
    if (window.innerWidth > 765) {
      this.setState({ screenWidth: true });
    } else {
      this.setState({ screenWidth: false });
    }
  };

  render() {
    const calendarView = this.state.screenWidth ? "dayGridMonth" : "listWeek";
    const thing = '_nNc5DU1bVz_YQ';

    return (
      <div className='calendar'>
        <FullCalendar
          defaultView={calendarView}
          timeZone='MTC'
          header={{
            left: "prev,next, today",
            center: "title",
            right: "dayGridMonth,listMonth, listWeek, listYear"
          }}
          views={{
            dayGridMonth: { buttonText: "Month" },
            listMonth: { buttonText: "List" },
            listWeek: { buttonText: "Week List" },
            listYear: { buttonText: "Year List" }
          }}
          plugins={[
            dayGridPlugin,
            listPlugin,
            timeGridPlugin,
            googleCalendarPlugin
          ]}
          weekends={false}
          googleCalendarApiKey='AIzaSyCFtSUXcDGEJyNM16ymM'
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
      </div>
    );
  }
}

export default Calendar;
