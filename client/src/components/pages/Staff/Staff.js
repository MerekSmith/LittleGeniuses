import React from "react";
import Teachers from "./Teachers";

function Staff() {
  return (
    <div>
      <div className='parallax staff-bg'>
        <div className='staff-parallax-caption'>
          <h1 className='page-header'>Our Staff</h1>
          <h4>
            At Little Geniuses our Teachers are warm, sensitive and responsive
          </h4>
          <p>
            Children feel welcomed, nurtured, and engaged. In our high-quality
            program, positive relationships are promoted and a child's
            contributions to the community are encouraged and valued.
          </p>
        </div>
      </div>
      <Teachers />
    </div>
  );
}

export default Staff;
