const axios = require("axios");
const config = require("../config");

function getAccessKey(callback) {
  axios.post("https://id.twitch.tv/oauth2/token?client_id=" + config.gamesClientId + "&client_secret=" + config.ganesSecretId + "&grant_type=client_credentials")
  .then(resp => {
    callback(resp.data);
  })
}

function getGamesSearched({title, accessToken}, callback) {
  const baseUrl = "https://api.igdb.com/v4/games/";

  axios({
    url: baseUrl,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': config.gamesClientId,
      'Authorization': 'Bearer ' + accessToken,
    },
    data: "search \"" + title + "\"; fields name;",
  })
  .then(resp => {
    callback(resp.data);
  })
}

function getGamesInfo({ id, accessToken }, callback) {
  const baseUrl = "https://api.igdb.com/v4/games/";

  axios({
    url: baseUrl,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': config.gamesClientId,
      'Authorization': 'Bearer ' + accessToken,
    },
    data: "fields *; where id = " + id + ";",
  })
  .then(resp => {
    callback(resp.data);
  })
}

function getGamesData({ type, id, accessToken }, callback) {
  const baseUrl = "https://api.igdb.com/v4/" + type + "/";

  axios({
    url: baseUrl,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Client-ID': config.gamesClientId,
      'Authorization': 'Bearer ' + accessToken,
    },
    data: "fields *; where id = " + id + ";",
  })
  .then(resp => {
    callback(resp.data);
  })
}

module.exports = {
  getAccessKey,
  getGamesSearched,
  getGamesInfo,
  getGamesData,
}