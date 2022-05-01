/////////////////////////////////////////////////////////////
////////////// Exploitation de l'API LastFM /////////////////
/////////////////////////////////////////////////////////////

LASTFM: process.env.LASTFM;

// We import all the libraries necessary to write our functions
const request = require('request');
const requests = require("requests");
var axios = require("axios").default;

// FUNCTION : extractIntent
const extractIntent = (nlp) => {
  // We extract the entity value if confidence>=0.8
  if (nlp['intents'][0]['confidence']) {
    return (nlp['intents'][0]['name']);
  }
  else {
    return null;
  }
}

// FUNCTION : extractEntity
const extractEntity = (nlp, entity) => {
  //extract entity value if confidence>=0.8
  //entity=movie name, release year ...
  let elt = nlp["entities"][entity];

  if (elt != null && nlp["entities"][entity][0]["confidence"] >= 0.5) {
    return (nlp.entities[entity][0]["value"]);
  }
  else {
    return null;
  }
}

// FUNCTION : getArtistData
// The user will type the name of the artist that he wants informations from
// Then the function will return the information related to this artist
const getArtistData = (searched_artist) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
        axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + searched_artist + '&api_key=6811b3e8e5b29850d368470649956fb0&format=json'
        ).then(function(response) {
          res = response.data.artist
          resolve(res);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};

// FUNCTION : getSongData
// The user will type the name and the artist of the song that he wants informations from
// Then the function will return the information related to this song
const getSongData = (searched_song, artist) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
        axios.get('https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6811b3e8e5b29850d368470649956fb0&artist=' + artist + '&track=' + searched_song + '&format=json'
        ).then(function(response) {
          res = response.data.track
          resolve(res);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};

// FUNCTION : getAlbumData
// The user will type the name and the artist of the song that he wants informations from
// Then the function will return the information related to this song
const getAlbumData = (searched_album, artist) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
        axios.get('https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=6811b3e8e5b29850d368470649956fb0&artist=' + artist + '&album=' + searched_album + '&format=json'
        ).then(function(response) {
          res = response.data.album;
          resolve(res);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};


// FUNCTION : getTopTracksData
// The user will type the name of the artist that he wants informations from
// Then the function will return the information related to this artist
const getTopTracksData = (number) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
        axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6811b3e8e5b29850d368470649956fb0&format=json'
        ).then(function(response) {
          var top_tracks = []
          res = response.data.tracks.track

          for (let i = 0; i < number; i++) {
            top_tracks.push(res[i].artist.name + " - " + res[i].name);
          }

          resolve(top_tracks);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};



module.exports = nlpData => {
  return new Promise(async function(resolve, reject) {
    let intent = extractIntent(nlpData);
    console.log("The intent is :", intent);

    if (intent == 'get_artist') {
      //searched_album_name = nom de l'album que l'on met dans messenger
      let searched_artist_name = extractEntity(nlpData, 'artist_name:artist_name');
      // Get data 
      try {
        let artist_data = await getArtistData(searched_artist_name);
        console.log(artist_data);
        resolve(artist_data);
      }
      catch (error) {
        reject(error);
      }

    }
    else if (intent == 'get_toptracks') {
      let searched_number = extractEntity(nlpData, 'number:number');
      // Get data
      try {
        if (searched_number == null) {
          searched_number = 4;
        }
        let toptracks_data = await getTopTracksData(searched_number);
        console.log(toptracks_data);
        resolve(toptracks_data);
      }
      catch (error) {
        reject(error);
      }

    }

    else if (intent == 'get_album') {
      let artist = extractEntity(nlpData, 'artist_name:artist_name');
      let album = extractEntity(nlpData, 'album_name:album_name');
      // Get data
      try {
        let album_data = await getAlbumData(album, artist);
        console.log(album_data);
        resolve(album_data);
      }
      catch (error) {
        reject(error);
      }

    }


    else if (intent == 'get_song') {
      let artist = extractEntity(nlpData, 'artist_name:artist_name');
      let title = extractEntity(nlpData, 'title:title');
      // Get data
      try {
        let song_data = await getSongData(title, artist);
        console.log(song_data);
        resolve(song_data);
      }
      catch (error) {
        reject(error);
      }

    }
    
    else {
      resolve({
        txt: "I’m not sure I understand you!"
      });
    }
  });
}

