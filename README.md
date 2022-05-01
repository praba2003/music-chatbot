# Music Chatbot 

## Description
Our music chatbot has been designed to answer questions about songs, artists and albums. It also can recommand the user some musics. The objective is to inform users about music, to advise them, or to give the most listened music of the moment.
At first, we wanted to link a python file with the recommendation system and the node.js file with the chatbot, but we didn't suceed. So we finally decided to "translate" our python code in java script to add it in one node.js file.

## Informations about our chatbot
- Chatbot platform : Facebook
- Copy this link to access to our chatbot : https://m.me/111934974715226

## Recommender System
We can recommand an artist or a track to the user, he just have to put his favorite tracks and a grade for those track. We got the data from last.fm. Our api gives us a list of tags for each artist/track. For example, the list of tags of Praise god from Kanye West is Kanye West. We first give the score of 0 for each tag. Every time a user add a track ( or an artist ), we increase the score of its tag. The score for each track ( artist ) is the sum of the score of its tags. Finally, we return the track ( or artist ) with the highest score.

## Language Processing
We use a NLP technology that extracts the intents (the purpose) and entities (the important elements contained in the sentence) of a sentence. 
We trained our AI so it covers every query someone could ask in the chatbot. 
Please see below the intents and entities we use in our NLP.

### Intents and Entities
Description of our chatbot intents and entities

Intents  | Entities
------------- | -------------
Hello  | NONE
get_album  | artist_name, album_name
get_song  | artist_name, title
get_artist  | artist_name
get_toptracks  | number
get_error  | NONE
add_to_playlist  | artist_name, title, score
add_error  | NONE
recommand_a_song  | NONE
Exit  | NONE
Help  | NONE

## Scenarios
Please see bellow all the possible scenarios in our chatbot.

### Scenario 1
User   | Music ChatBot
-------------- | -------------
Hello | Hello to you too! If you have any questions, type 'help'
Help | I am a chatbot specialized in musics and songs. You can ask me about a music (who is the artist, or the release date for example) or you can add a music to your playlist "Favourite"<3. When you'll have added at least five favourite musics, I will be able to recommend you new musics !\nStart by asking me a question or by adding a song to your playlist "Favourite".
Exit | Have a great day! <3

### Scenario 2
Here, the user wants to get informations about an artist
#### Scenario 2.1:
User   | Music ChatBot
-------------- | -------------
Tell me about the artist Michael Jackson |Here are some information about Michael Jackson: Michael Joseph Jackson  (August 29, 1958 Gary, Indiana—June 25, 2009 in Los Angeles, California), was an American singer, songwriter and dancer. [...] You can listen to some songs with the link below: https://www.last.fm/music/Michael+Jackson
#### Scenario 2.2:
User   | Music ChatBot
-------------- | -------------
Tell me about Michael Jackson | The syntax you used is not precise enough ! Here are some information that will help you use this chatbot :) - To have some informations about an artist, you have to type:"Tell me about the artist Michael Jackson" - To have some informations about a song, you have to type:"Tell me about the song Enemy of imagine dragons" - To have some informations about an album, you have to type:"Tell me about the album Believe made by Cher"

### Scenario 3
Here, the user wants to get informations about a song
#### Scenario 3.1:
User   | Music ChatBot
-------------- | -------------
Tell me about the song Enemy of imagine dragons | The song Enemy (with JID) - from the series Arcane League of Legends was published the 28 Nov 2021, 12:12 . [...] For the band, “Enemy” marks their third collaboration with a rapper throughout their entire history, with JID joining the likes of Kendrick Lamar and Lil Wayne. <a href="http://www.last.fm/music/Imagine+Dragons/_/Enemy+(with+JID)+-+from+the+series+Arcane+League+of+Legends">Read more on Last.fm</a>.
#### Scenario 3.2:
User   | Music ChatBot
-------------- | -------------
Tell me about Enemy of imagine dragons | The syntax you used is not precise enough ! Here are some information that will help you use this chatbot :) - To have some informations about an artist, you have to type:"Tell me about the artist Michael Jackson" - To have some informations about a song, you have to type:"Tell me about the song Enemy of imagine dragons" - To have some informations about an album, you have to type:"Tell me about the album Believe made by Cher"

### Scenario 4
Here, the user wants to get informations about an album
#### Scenario 4.1:
User   | Music ChatBot
-------------- | -------------
Tell me about the album Believe made by Cher | Here are some informations about the album Believe made by Cher: Believe is the twenty-third studio album by American singer-actress Cher, released on November 10, 1998 by Warner Bros. Records. The RIAA certified it Quadruple Platinum on December 23, 1999, recognizing four million shipments in the United States; Worldwide, the album has sold more than 20 million copies, making it the biggest-selling album of her career. In 1999 the album received three Grammy Awards nominations including "Record of the Year", "Best Pop Album" and winning "Best Dance Recording" for the single "Believe". It was released by Warner Bros. Records at the end of 1998. The album was executive produced by Rob <a href="https://www.last.fm/music/Cher/Believe">Read more on Last.fm</a>. You can listen to some of the songs of this album using this link: https://www.last.fm/music/Cher/Believe
#### Scenario 4.2:
User   | Music ChatBot
-------------- | -------------
Tell me about Believe made by Cher | The syntax you used is not precise enough ! Here are some information that will help you use this chatbot :) - To have some informations about an artist, you have to type:"Tell me about the artist Michael Jackson" - To have some informations about a song, you have to type:"Tell me about the song Enemy of imagine dragons" - To have some informations about an album, you have to type:"Tell me about the album Believe made by Cher"

### Scenario 5
Here, the user wants to get the five tracks that are the most listenned
#### Scenario 5.1:
User   | Music ChatBot
-------------- | -------------
Give the 5 top tracks | Here are the 5 top tracks: Doja Cat - Woman, Olivia Rodrigo - good 4 u, Doja Cat - Kiss Me More (feat. SZA), Doja Cat - Need To Know, Glass Animals - Heat Waves

#### Scenario 5.2:
Here, the user wants to get the three tracks that are the most listenned but with a different syntax

User   | Music ChatBot
-------------- | -------------
Give three top tracks | Here are the 3 top tracks: Doja Cat - Woman, Doja Cat - Kiss Me More (feat. SZA), Olivia Rodrigo - good 4 u
#### Scenario 5.3:
Here, the user wants to get the tracks that are the most listenned without giving any specified number

User   | Music ChatBot
-------------- | -------------
Give top tracks | Here are the 4 top tracks: Doja Cat - Woman, Doja Cat - Kiss Me More (feat. SZA), Olivia Rodrigo - good 4 u, Glass Animals - Heat Waves

### Scenario 6
Here, the user wants to add a music to his playlist
#### Scenario 6.1:
User   | Music ChatBot
-------------- | -------------
add Michael Jackson - Thriller - 10 | Congratulations! Your song was successfully add to your playlist! <3 Your playlist contains now: Michael Jackson - Thriller
#### Scenario 6.2:
User   | Music ChatBot
-------------- | -------------
add Michael Jackson | To add a music to your favourites, you must write this way: "add TITLE - AUTHOR"

### Scenario 7
Here, the user wants to get some recommendations
#### Scenario 7.1:
The user wants some songs recommendation without adding any songs to his playlist

User   | Music ChatBot
-------------- | -------------
recommand | You have to add at least one song to your playlist to have recommandations. Use the following syntax to add a music : "add title - author - grade" example : "add Enemies - Imagine Dragons - 8" To add a music to your favourites, you must write this way: "add TITLE - AUTHOR"

#### Scenario 7.2:
User   | Music ChatBot
-------------- | -------------
add Michael Jackson - Thriller - 8 | Congratulations! Your song was successfully add to your playlist! ❤ Your playlist contains now: Michael Jackson - thriller - 8
add Dua Lipa - Physical - 6 | Congratulations! Your song was successfully add to your playlist! ❤ Your playlist contains now: Michael Jackson - thriller - 8, Dua Lipa - Physical - 6
recommand | Here are the tracks you may love ❤ : Michael Jackson - Beat It, Michael Jackson - Wanna Be Startin' Somethin', Rockwell - Somebody's Watching Me, Whitney Houston - I Wanna Dance with Somebody (Who Loves Me), a-ha - Take on Me

THANK YOU !
