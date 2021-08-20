const tmdbApi = require("../api/tmdbApi");
const deezerApi = require("../api/deezerApi");
const booksApi = require("../api/booksApi");
const gamesApi = require("../api/gamesApi");
const docuMenuApi = require("../api/docuMenuApi")

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
    case "Game":
      gamesApi.getAccessKey(accessKey => {
        const accessToken = accessKey.access_token;

        gamesApi.getGamesInfo({ id, accessToken }, infoResp => {

          gamesApi.getGamesData({ type: "covers", id: infoResp[0].cover, accessToken}, imageResult => {
            const image = "https:" + imageResult[0].url;
            gamesApi.getGamesData({ type: "genres", id: infoResp[0].genres[0], accessToken}, genreResult => {
              const genre = genreResult[0].name;

              const game = {
                image, // is id
                year: new Date(infoResp[0].first_release_date * 1000).getFullYear(),
                genre, //is id
                overview: infoResp[0].summary,
                share: infoResp[0].url,
              }

              callback(game)
            })

            })
          })





      })
      break;
    case "Restaurant":
      docuMenuApi.getRestaurantInfo({id}, infoResp => {
        console.log(infoResp)
        callback({
          share: infoResp.result.restaurant_website,
          priceRange: infoResp.result.price_range,
          genre: infoResp.result.cuisines[0],
          overview: infoResp.result.address.formatted
        })
      })
      break;
  }
}

module.exports = getRecInfo;