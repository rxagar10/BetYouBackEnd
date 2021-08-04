const usersModel = require("../models/users");
const friendsModel = require("../models/friends");

function signUpService(db, { firstName, lastName, username, password, email }, callback) {

  usersModel.checkUserDNE(db, { username }, (userDNE) => {
    if (userDNE) {
      usersModel.addNewUser(db, { firstName, lastName, username, password, email }, (usersResp) => {
        friendsModel.addFriendsTable(db, { username }, (friendsResp) => {
          callback({ signupMessage: "success" })
        })
      })
    } else {
      callback({ signupMessage: "This username is taken." })
    }
  })
}

module.exports = signUpService;