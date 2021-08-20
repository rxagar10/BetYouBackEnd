const axios = require("axios");
const config = require("../config");

function getRestaurantSearch({title, state}, callback) {

  let restSearchQuery = "https://api.documenu.com/v2/restaurants/search/fields?restaurant_name=" + title

  if(state !== "" || state !== null) {
    restSearchQuery += "&state=" + state
  }

  axios.get(restSearchQuery + "&exact=true&key=" + config.docuMenuApiKey)
  .then(resp => {
    callback(resp.data.data);
  })

}

function getRestaurantInfo({id}, callback) {

  const restInfoQuery = "https://api.documenu.com/v2/restaurant/"

  axios.get(restInfoQuery + id + "?key=" + config.docuMenuApiKey)
  .then(resp => {
    callback(resp.data)
  })
}

module.exports = {
  getRestaurantSearch,
  getRestaurantInfo,
}