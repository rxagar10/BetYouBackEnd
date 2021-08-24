const tmdbApi = require("../api/tmdbApi");
const deezerApi = require("../api/deezerApi")
const booksApi = require("../api/booksApi");
const gamesApi = require("../api/gamesApi");
const docuMenuApi = require("../api/docuMenuApi")

function searchTitle({ title, recType, musicType, state }, callback) {
  const newTitle = title.split(' ').join('+');
  const imageUrlPath = "https://image.tmdb.org/t/p/original/";

  switch(recType) {
    case "Movie":
      const movies = [];

      tmdbApi.getMoviesSearched({ title: newTitle }, (moviesResp) => {
        moviesResp.map(movie => {
          movies.push({
            title: movie.original_title,
            year: movie.release_date.substring(0, 4),
            imagePath: imageUrlPath + movie.poster_path,
            id: movie.id,
          })
        })

        callback(movies)
      })
      break;
    case "TVShow":
      const shows = [];
      tmdbApi.getTvShowsSearched({ title: newTitle }, (tvResp) => {
        tvResp.map(show => {
          shows.push({
            title: show.name,
            year: show.first_air_date.substring(0, 4),
            imagePath: imageUrlPath + show.backdrop_path,
            id: show.id,
          })
        })

        callback(shows)
      })
      break;
    case "Music":
      const music = [];

      deezerApi.getMusicSearched({title: newTitle, musicType}, (musicResp) => {
        musicResp.data.map(item => {
          if(musicType === "artist") {
            music.push({
              title: item.name,
              id: item.id,
            })
          } else {
            music.push({
              title: item.title,
              id: item.id,
            })
          }
        })
        callback(music)
      })
      break;
    case "Book":
      const books = [];

      booksApi.getBookSearched({ title: newTitle }, booksResp => {

        booksResp.map(book => {
          books.push({
            title: book.volumeInfo.title,
            year: book.volumeInfo.authors[0],
            overview: book.volumeInfo.description,
            id: book.id,
          })
        })
        callback(books);
      })
      break;
    case "Games":
      gamesApi.getAccessKey(accessKey => {
        const accessToken = accessKey.access_token;

        gamesApi.getGamesSearched({ title, accessToken}, gamesResp => {
          callback(gamesResp.map(game => {
            return { title: game.name, id: game.id}
          }))
        })
      })
      break;
    case "Restaurant":
      docuMenuApi.getRestaurantSearch({title, state}, restResp => {
        callback(restResp.map(rest => {
          return {
            title: rest.restaurant_name,
            year: rest.address.city + ", " + rest.address.state,
            id: rest.restaurant_id
          }
        } ))
      })
  }

}

module.exports = searchTitle;