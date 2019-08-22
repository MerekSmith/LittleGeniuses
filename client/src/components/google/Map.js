import React from "react";

function Map() {
  return (
    <div style={{ minHeight: "450px" }}>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.492547020426!2d-111.86669250959105!3d40.615977751014924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd96614918f8b2441!2sLittle+Geniuses+Learning+Center!5e0!3m2!1sen!2sus!4v1565298372180!5m2!1sen!2sus'
        style={{ width: "100%", minHeight: "488px" }}
        className='map'
        title='map'
        allowFullScreen
      />
    </div>
  );
}

export default Map;
