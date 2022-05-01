const request = require('request');
const requests = require("requests");
var axios = require("axios").default;

const User = require('../user');
var playlist = []
const user = new User('testeur', playlist);


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

// FUNCTION (à utiliser si on réussit pas la recommandation)
const getSimilarSongs = () =>
{
  return new Promise((resolve, reject) => {
    try {
      let artist = user.playlist[0]['artist name']
      let track = user.playlist[0]['song name']
      let score = user.playlist[0]['score']

      for (let i = 0; i < user.playlist.length; i++)
      {
        if(user.playlist[i]['score'] > score)
        {
          artist = user.playlist[i]['artist name']
          track = user.playlist[i]['song name']
        }
      }
      
      const response =
     axios.get('http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=' + artist + '&track=' + track +'&api_key=6811b3e8e5b29850d368470649956fb0&format=json'
        ).then(function(response) 
        {
          res = response.data.similartracks.track
          var similar_tracks = []
          for (let i = 0; i < res.length; i++)
          {
            similar_tracks.push({
              'track name': res[i].name,
              'artist name': res[i].artist.name
            });
          }
          resolve(similar_tracks);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  })
};


/// FUNCTION : Permit to add songs to a playlist to later make predictions
const addData = (artist_name, song_name, score) => 
{
  return new Promise((resolve, reject) => {
    try 
    {
      user.playlist.push(
        {
          'artist name':artist_name, 
          'song name': song_name,
          'score': parseInt(score)
        });
      resolve(user.playlist);
    }
    catch (error) {
      reject(error);
    }
  });
}


// Get 1000 top tracks
//var top_tracks_name = []
const getTopTracksData = () => {
  return new Promise((resolve, reject) => {
    try {
      const response =
     axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6811b3e8e5b29850d368470649956fb0&format=json'
        ).then(function(response) {
          var top_tracks = []
          var top_tracks_name = []
          var top_tracks_artist = []
          
          res = response.data.tracks.track

          //for (let i = 0; i < 1000; i++) 
          for (let i = 0; i < 50; i++)
          {
            //top_tracks.push(res[i].artist.name + " - " + res[i].name);
            top_tracks.push(res[i])
            top_tracks_name.push(res[i]['name'])
            top_tracks_artist.push(res[i]['artist']['name'])
            //console.log(res[i]['artist']['name'])
            //console.log(res[i]['name'])
            //console.log(itop_tracks_name)
          }
          resolve(
            {
              'top tracks': top_tracks,
              'top tracks name': top_tracks_name,
              'top tracks artist': top_tracks_artist
            }
          );
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};


// Get the 1000 top artists
const getTopArtists = () => {
  return new Promise((resolve, reject) => {
    try {
      const response =
 axios.get('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e4500c1ce0552be866db968f22cbb5c&format=json&page='
        ).then(function(response) {
          var top_artists = []
          res = response.data.artists.artist

          for (let i = 0; i < 1000; i++) {
            top_artists.push(res[i]);
          }
          resolve(top_artists);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};


// Get the tags of an author or of an artist
const ArtistGetTags = (artist) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
        axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+artist+'&api_key=6e4500c1ce0552be866db968f22cbb5c&format=json'
        ).then(function(response) {
          var tags_artist = []
          res = response.data.artist.tags.tag

          for (let i = 0; i < res.length; i++) {
            tags_artist.push(res[i].name);
          }

          resolve(tags_artist);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};

// Get Tracks Tag
const getTracksTag = (artist, title) => {
  return new Promise((resolve, reject) => {
    try {
      const response =
 axios.get('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6e4500c1ce0552be866db968f22cbb5c&artist='+artist+'&track='+title+'&format=json'
        ).then(function(response) {
          var tracks_tags = []
          res = response.data.track.toptags.tag

          for (let i = 0; i < res.length; i++) 
          {
            tracks_tags.push(res[i].name)
          }
          resolve(tracks_tags);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};

const getAllTracksTag = (artist, title) => {
  return new Promise((resolve, reject) => {
    try {
      var tracks_tags = getTracksTag('Michael Jackson','thriller');
      const response = getTracksTag('Michael Jackson','Billie Jean').then(function(response) {

          res = response

          for (let i = 0; i < res.length; i++) 
          {
            tracks_tags.push(res[i])
          }
          resolve(tracks_tags);
        }
        );
    }
    catch (error) {
      reject(error);
    }
  });
};

module.exports = nlpData => {
  return new Promise (async function(resolve, reject) {
    let intent = extractIntent(nlpData);
    console.log("The intent is :", intent);
    if (intent == 'recommand_a_song') {
      try 
      {
        if(user.playlist.length != 0)
        {
          let similar_track = await getSimilarSongs();
          console.log(similar_track);
          let recommended_songs = 'Here are the tracks you may love <3 :\n';
        for (let i = 0; i < 5; i++) 
        {
          recommended_songs += similar_track[i]['artist name'] + ' - ' + similar_track[i]['track name'] + '\n'
        }
          resolve(recommended_songs);
        }
        else
        {
          let response = 'You have to add at least one song to your playlist to have recommandations. Use the following syntax to add a music :\n"add _title_ - _author_ - _grade_"\nexample : "add *Enemies* - *Imagine Dragons* - *8*"'
          console.log(response)
          resolve(response)
        }
      }
      catch (error) {
        reject(error);
      }
    } 

    else if (intent == 'add_to_playlist')
    {
      let artist = extractEntity(nlpData, 'artist_name:artist_name');
      let title = extractEntity(nlpData, 'title:title');
      let score = extractEntity(nlpData, 'score:score');
      try {
        let data = await addData(artist, title, score);
        console.log(data);
        resolve(data);
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
};