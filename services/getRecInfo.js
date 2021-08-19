const tmdbApi = require("../api/tmdbApi");
const deezerApi = require("../api/deezerApi");
const booksApi = require("../api/booksApi");

function getRecInfo({ id, recType, musicType}, callback) {

  switch(recType) {
    case "Movie":
      tmdbApi.getMovieInfo({ id }, (infoResp) => {
        callback(infoResp);
      })
      break;
    case "TVShow":
      tmdbApi.getTvShowInfo({id }, (infoResp) => {
        callback(infoResp)
      })
      break;
    case "Music":
      deezerApi.getMusicInfo({id, musicType}, infoResp => {
        console.log(infoResp)
        let musicInfo;
        switch (musicType) {
          case "artist":
            musicInfo = {
              id,
              title: infoResp.name,
              image: infoResp.picture_medium,
              numberOfAlbum: infoResp.nb_album,
            }
            break;
          case "album":
            musicInfo = {
              id,
              title: infoResp.title,
              image: infoResp.cover_medium,
              genre: infoResp.genres.data[0].name,
              numberOfTracks: infoResp.nb_tracks,
              year: infoResp.release_date.substring(0,4),
              explicit: infoResp.explicit_lyrics,
              artist: infoResp.artist.name,
            }
            break;
          case "track":
            musicInfo = {
              id,
              title: infoResp.title,
              image: infoResp.picture_medium,
              year: infoResp.release_date.substring(0,4),
              explicit: infoResp.explicit_lyrics,
              artist: infoResp.artist.name,
              album: infoResp.album.title,
              share: infoResp.share,
            }
            break;
        }
        callback(musicInfo)
      })
      break;
    case "Books":
      booksApi.getBooksInfo({ id }, infoResp => {
        callback(infoResp);
      })
      break;

  }
}

module.exports = getRecInfo;