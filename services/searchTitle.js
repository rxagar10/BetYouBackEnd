const tmdbApi = require("../api/tmdbApi");

function searchTitle({ title, recType }, callback) {
  const newTitle = title.split(' ').join('+');
  const imageUrlPath = "https://image.tmdb.org/t/p/original/";

  if (recType === "Movie") {

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
  } if (recType === "TVShow") {
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
  }
}

module.exports = searchTitle;