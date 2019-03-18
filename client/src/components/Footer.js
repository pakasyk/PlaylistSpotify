import React from "react";

const Footer = ({ currentTrackData, isPlayingData }) => {
  if (currentTrackData.hasOwnProperty("id")) {
    let artists = "";
    if (currentTrackData.artists.length > 1) {
      artists = currentTrackData.artists.map(artist => `${artist.name} `);
    } else {
      artists = `${currentTrackData.artists[0].name} `;
    }
    return (
      <div className="footer">
        {isPlayingData ? <h4>Currently Playing</h4> : <h4>Paused</h4>}
        <h3>
          {artists}- {currentTrackData.name}
        </h3>
      </div>
    );
  } else {
    return (
      <div className="footer">
        <h4>Currently Not Playing</h4>
        <h3>Please select a track</h3>
      </div>
    );
  }
};

export default Footer;
