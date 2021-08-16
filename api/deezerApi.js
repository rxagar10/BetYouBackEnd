const axios = require("axios");

function getMusicSearched({title, musicType}, callback) {

  const deezerSearch = "https://api.deezer.com/search/"

  axios.get(deezerSearch + musicType + "?q=" + title)
      .then(resp => {
        callback(resp.data)
      })
}

function getMusicInfo({id, musicType}, callback) {

  const deezerGetInfo = "https://api.deezer.com/"

  axios.get(deezerGetInfo + musicType + "/" + id)
  .then(resp => {
    callback(resp.data)
  })

}

module.exports = {
  getMusicSearched,
  getMusicInfo,
}

