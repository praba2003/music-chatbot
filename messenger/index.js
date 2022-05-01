'use strict';
const lastfm = require('../lastfm');
const recommend = require('../recommendation');
const recommendation = require('../recommendation');
var axios = require("axios").default;


// FUNCTION : extractIntent
const extractIntent = (nlp) => {
  // We extract the entity value if confidence>=0.8
  if (nlp["intents"][0]["confidence"] >= 0.8) {
    return (nlp["intents"][0]["name"]);
  }
  else {
    return null;
  }
}

async function handler(fb, msg) {
  await fb.action(msg.sender, 'typing_on');
  try{
    
    switch (extractIntent(msg.nlp)) {
      case 'Hello':
        await fb.txt(msg.sender, `*Hello to you too!* If you have any questions, type 'help'`);
        await fb.img(msg.sender, 'https://picsum.photos/300/200');
        break;

      case 'get_album':
        // return all the information about the album
        let data_album = await lastfm(msg.nlp);
        let msg_album = String('Here are some informations about the album ' + data_album.name + ' made by ' + data_album.artist + '\n' + data_album.wiki.summary + '\nYou can listen to some of the songs of this album using this link: ' + data_album.url);
        await fb.txt(msg.sender, msg_album);
        break;

      case 'get_song':
        let data_song = await lastfm(msg.nlp);
        // return all the information about the song
        let msg_song = String('The song ' + data_song.name + " was published the " + data_song.wiki.published+" ."+data_song.wiki.summary);
        await fb.txt(msg.sender, msg_song);
        break;

      case 'get_artist':
        let data_artist = await lastfm(msg.nlp);
        let message_artist = 'Here are some information about ' + data_artist.name + ':\n' + data_artist.bio.summary + '\n' + data_artist.name + ' has around ' + data_artist.stats.listeners + ' listeners and ' + data_artist.stats.playcount + ' playcounts !\nYou can listen to some songs with the link below: ' + data_artist.url;
        await fb.txt(msg.sender, message_artist);
        break;

      case 'add_to_playlist':
        let data_playlist = await recommendation(msg.nlp)
        let message_playlist = 'Congratulations! Your song was successfully add to your playlist! <3' + '\nYour playlist contains now:\n';
        for (let i = 0; i < data_playlist.length; i++) 
        {
          message_playlist += data_playlist[i]['artist name'] + ' - ' + data_playlist[i]['song name'] + ' - ' + data_playlist[i]['score'] + '\n'
        }
        await fb.txt(msg.sender, message_playlist);
        break;
        
      case 'get_toptracks':
        let data_toptracks = await lastfm(msg.nlp);
        let message_toptracks = 'Here are the ' + data_toptracks.length + ' top tracks:\n';
        for (let i = 0; i < data_toptracks.length; i++) {
          message_toptracks += data_toptracks[i] + '\n';
        }
        await fb.txt(msg.sender, message_toptracks);
        break;


      case 'get_error':
        await fb.txt(msg.sender, `You typed :_` + String(msg.nlp['text']) + `_.The syntax you used is not precise enough !\nHere are some information that will help you use this chatbot :)\n\n- To have some informations about an artist, you have to type:\n_"Tell me about the *artist* Michael Jackson"_\n\n- To have some informations about a song, you have to type:\n_"Tell me about the *song* Enemy of imagine dragons"_\n\n- To have some informations about an album, you have to type:\n_"Tell me about the *album* Believe made by Cher"_`);
        break;
      // METTRE DES EXEMPLES QUI EXISTENT VRAIEMENT DANS L'API

      case 'add_error':
        await fb.txt(msg.sender, `To add a music to your favourites, you must write this way:\n_"add TITLE - AUTHOR"_`);
        await fb.img(msg.sender, 'https://picsum.photos/400/200');
        break;;

      case 'recommand_a_song':
        let data_recommand_a_song = await recommendation(msg.nlp);
        await fb.txt(msg.sender, data_recommand_a_song);
        break;
        
      case 'Exit':
        await fb.txt(msg.sender, "Have a great day! <3");
        await fb.img(msg.sender, 'https://picsum.photos/300/300');
        break;

      case 'Help':
        await fb.txt(msg.sender, `I am a chatbot specialized in musics and songs. You can ask me about a music (who is the artist, or the release date for example) or you can add a music to your playlist "Favourite"<3. When you'll have added at least five favourite musics, I will be able to recommend you new musics !\nStart by asking me a question or by adding a song to your playlist "Favourite".`);
        await fb.img(msg.sender, 'https://picsum.photos/500/400');
        break;

      default:
        await fb.txt(msg.sender, "I don't know what you mean :(\nDon't hesitate to type 'help' if you have any problem");
    }
  } catch (e) {
    console.error("Error occurred", e);
    await fb.txt(msg.sender, "An internal error occurred.");
  }
};

module.exports = handler;