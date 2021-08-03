const tmdbApi = require("../api/tmdbApi");

function getRecInfo({ id, recType }, callback) {
  if (recType === "Movie") {
    tmdbApi.getMovieInfo({ id: id }, (infoResp) => {
      callback(infoResp);
    })
  } else if (recType === "TVShow") {
    tmdbApi.getTvShowInfo({ id: id }, (infoResp) => {
      callback(infoResp)
    })
  }
}

module.exports = getRecInfo;