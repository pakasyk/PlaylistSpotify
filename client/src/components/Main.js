import React from "react";

const Main = ({ tracksData, onSelectTrack, currentTrackData, isPlayingData, pause, adjustVolume }) => {
  if (tracksData.length) {
    let artists = "";
    let trackList = tracksData.map((track, index) => {
      /* If more than one artist */
      if (track.artists.length > 1) {
        artists = track.artists.map(artist => `${artist.name} `);
      } else {
        artists = `${track.artists[0].name} `;
      }
      let minutes = Math.floor(track.duration_ms/60000) > 9 ? Math.floor(track.duration_ms/60000) : "0"+Math.floor(track.duration_ms/60000);
      let seconds = Math.floor(track.duration_ms%60000/1000) > 9 ? Math.floor(track.duration_ms%60000/1000) : "0"+Math.floor(track.duration_ms%60000/1000);
      if (currentTrackData.id === track.id) {
        return (
        <li key={track.id} className="selected">
        <div className="minus" onClick={()=>adjustVolume("sub")} />
        <div className="image">
        <div className="overlay" onClick={()=>pause(track)}>{isPlayingData ? <div className="pause"><span>&#9644;</span><span>&#9644;</span></div> : <span>&#9654;</span>}</div>
        <img src={currentTrackData.album.images[1].url} alt="album"/>
        </div>
        <div className="plus" onClick={()=>adjustVolume("add")} />
        </li>
        )}else {      
      return (
        <li key={track.id} onClick={() => onSelectTrack(index)} className="track">
        
          <div className="trackName">
          
          <span style={{fontSize: 0.8+"em", marginRight: 1+"em"}}>&#9654;</span>{artists}- {track.name}
          </div>
          <div className="duration">[{minutes}:{seconds}]</div>
        </li>
      )}
    });

    return (
      <div className="main">
        <ul>{trackList}</ul>
      </div>
    );
  } else {
    return <div className="main">Loading...</div>;
  }
};

export default Main;
