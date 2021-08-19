const tmdbApi = require("../api/tmdbApi");
const deezerApi = require("../api/deezerApi")
const booksApi = require("../api/booksApi");

function searchTitle({ title, recType, musicType }, callback) {
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
    case "Books":
      const books = [];

      booksApi.getBookSearched({ title: newTitle }, booksResp => {

        booksResp.map(book => {
          books.push({
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            overview: book.volumeInfo.description,
            id: book.id,
          })
        })
        callback(books);
      })
      break;
  }

}

module.exports = searchTitle;