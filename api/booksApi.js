const axios = require("axios");
const config = require("../config");

function getBookSearched( { title }, callback) {
  const booksSearchQuery = "https://www.googleapis.com/books/v1/volumes?q=";

  axios.get(booksSearchQuery + title + "&key=" + config.booksApiKey)
  .then(resp => {
    callback(resp.data.items);
  })
}

function getBooksInfo({ id }, callback) {
  const booksSearchVolume = "https://www.googleapis.com/books/v1/volumes/";

  axios.get(booksSearchVolume + id)
  .then(resp => {
    callback({
      title: resp.data.volumeInfo.title,
      artist: resp.data.volumeInfo.authors[0],
      year: resp.data.volumeInfo.publishedDate.substring(0, 4),
      pageCount: resp.data.volumeInfo.pageCount,
      genre: resp.data.volumeInfo.categories[0],
      image: resp.data.volumeInfo.imageLinks.thumbnail,
    })
  })
}

module.exports = {
  getBookSearched,
  getBooksInfo
}