import React from "react";

const locationURLs = {
  midvale: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.492547020426!2d-111.86669250959105!3d40.615977751014924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd96614918f8b2441!2sLittle+Geniuses+Learning+Center!5e0!3m2!1sen!2sus!4v1565298372180!5m2!1sen!2sus',
  pleasantGrove: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12161.870006241052!2d-111.7352422!3d40.3541572!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb67d4334dd68d919!2sLittle%20Geniuses%20Learning%20Center!5e0!3m2!1sen!2sus!4v1621967626238!5m2!1sen!2sus'
}

function Map({ location }) {
  return (
    <div style={{ minHeight: "450px", height: "100%" }}>
      <iframe
        src={locationURLs[location]}
        style={{ width: "100%", height: "450px" }}
        className='map'
        title='map'
        allowFullScreen
      />
    </div>
  );
}

export default Map;
