const usersModel = require("../models/users");

function loginService(db, {username, password}, callback) {
  usersModel.verifyUser(db, {username, password}, (verified) => {
    if (verified) {
      callback({ loginMessage: 'success' })
    } else {
      callback({ loginMessage: "Username or password is incorrect" })
    }
  })
}

module.exports = loginService