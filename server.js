const express = require("express");
const request = require("request");
const app = express();


app.get("/api", (req, res) => {
  request.post(
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic NTA3ZTJmZTdmNmYzNGZiNWFjZWMyZDc4YjU1NjRlZDY6Njc1MWMyZjgwYzA0NDkyNDlhM2UyYzAyNjZhOWFiNTU="
      },
      url:
        "https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=AQCiKfpkHSeE4KB6C7nRKjgy-sfw6rqiKPVjcL0Jjs4RrQFvotd9lz6eriqxD-_LFHUl3pSzCVJkkaJURza_lO2H5xJdWBT54dGaWzM1OUgyIjRX13Yg6nE0nfM0grvqoRaDdQ"
    },
    (error, response, body) => {
      if (error) {
        return console.dir(error);
      }
      console.dir("Successfully Got Access Token");
    }
  ).pipe(res);
});

const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
