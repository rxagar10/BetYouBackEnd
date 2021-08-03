const axios = require("axios");
const config = require("../config");

function getMoviesSearched({ title }, callback) {

  const tmdbSearchMovieByTitle = "https://api.themoviedb.org/3/search/movie?api_key=";

  axios.get(tmdbSearchMovieByTitle + config.tmdbApiKey + "&query=" + title)
  .then(resp => {
    callback(resp.data.results)
  })

}

function getMovieInfo({ id }, callback) {

  const tmdbSearchById = "https://api.themoviedb.org/3/movie/";

  axios.get(tmdbSearchById + id + "?api_key=" + config.tmdbApiKey)
  .then(resp => {
    const movieInfo = {
      title: resp.data.original_title,
      genre: resp.data.genres[0].name,
      overview: resp.data.overview,
      runtime: resp.data.runtime,
    }
    callback(movieInfo)
  })
}

function getTvShowsSearched({ title }, callback) {

  const tmdbSearchTvShowByTitle = "https://api.themoviedb.org/3/search/tv?api_key=";

  axios.get(tmdbSearchTvShowByTitle + config.tmdbApiKey + "&query=" + title)
  .then(resp => {
    callback(resp.data.results)
  })

}

function getTvShowInfo({ id }, callback) {

  const tmdbSearchById = "https://api.themoviedb.org/3/tv/";

  axios.get(tmdbSearchById + id + "?api_key=" + config.tmdbApiKey)
  .then(resp => {
    const movieInfo = {
      title: resp.data.name,
      genre: resp.data.genres[0].name,
      overview: resp.data.overview,
      runtime: resp.data.episode_run_time,
      numberOfEpisodes: resp.data.number_of_episodes,
      numberOfSeasons: resp.data.number_of_seasons,
    }
    callback(movieInfo)
  })

}


module.exports = { getMoviesSearched, getMovieInfo, getTvShowsSearched, getTvShowInfo }

