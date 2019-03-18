import React, { Component } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./App.scss";

export class App extends Component {
  state = {
    tracks: [],
    currently_playing: {},
    playing: false,
    audio: null
  };

  getTracks = access_token => {
    fetch(
      "https://api.spotify.com/v1/playlists/37i9dQZF1DX7F6T2n2fegs/tracks?offset=0&limit=100",
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        })
      }
    )
      .then(res => {
        if (res.status === 401) {
          return this.getAccessToken();
        } else if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then(data => {
        let tracks = data.items
          .filter(item => item.track.preview_url !== null)
          .map(item => item.track);
        return this.setState({ tracks });
      })

      .catch(err => console.log(err));
  };

  getAccessToken = () => {
    /* Getting access_token from backend */
    fetch("./api")
      .then(res => res.json())
      .then(data => {
        this.setState({ access_token: data.access_token });
        return this.getTracks(data.access_token);
      })
      .catch(err => console.log(err));
  };

  componentDidMount = () => {
    this.getAccessToken();
  };

  playTrack = track => {
    let audio = new Audio(track.preview_url);
    if (
      !this.state.playing &&
      track.preview_url !== this.state.currently_playing.preview_url
    ) {
      audio.play();
      audio.loop = true;
      this.setState({ playing: true, audio });
    } else if (
      !this.state.playing &&
      track.preview_url === this.state.currently_playing.preview_url
    ) {
      this.state.audio.play();
      this.setState({ playing: true });
    } else {
      if (track.preview_url === this.state.currently_playing.preview_url) {
        this.state.audio.pause();
        this.setState({ playing: false });
      } else {
        this.state.audio.pause();
        audio.play();
        audio.loop = true;
        this.setState({
          playing: true,
          audio
        });
      }
    }
  };

  onSelectTrack = index => {
    this.playTrack(this.state.tracks[index]);
    return this.setState({ currently_playing: this.state.tracks[index] });
  };

  adjustVolume = term => {
    let audio = this.state.audio;
    if (term === "add") {
      if (audio.volume >= 0 && audio.volume < 1) {
        audio.volume += 0.1;
        this.setState({ audio });
      }
    } else {
      if (audio.volume > 0.1 && audio.volume <= 1) {
        audio.volume -= 0.1;
        this.setState({ audio });
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Main
          tracksData={this.state.tracks}
          onSelectTrack={this.onSelectTrack}
          currentTrackData={this.state.currently_playing}
          isPlayingData={this.state.playing}
          pause={this.playTrack}
          adjustVolume={this.adjustVolume}
        />
        <Footer currentTrackData={this.state.currently_playing} isPlayingData={this.state.playing} />
      </div>
    );
  }
}

export default App;
