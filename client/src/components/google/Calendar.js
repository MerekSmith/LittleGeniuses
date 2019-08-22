import React from "react";

function Calendar() {
  return (
    <div>
      <iframe
        src='https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FDenver&amp;src=dHBuOWdqbWlncjd1c3RqaGU5NXI4Z3BycmNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=Z3Znc2U4a3BqZ2JyNWVrZzhsdmFxaW9vZjhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%237986CB&amp;color=%23F6BF26&amp;color=%230B8043&amp;title=Events%20at%20Little%20Geniuses&amp;showTabs=1&amp;showNav=1&amp;showDate=1&amp;showCalendars=1&amp;showTz=1'
        className='calendar'
        title='calendar'
      />
    </div>
  );
}

export default Calendar;
