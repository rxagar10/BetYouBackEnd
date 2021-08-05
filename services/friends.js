
const friendsModel = require("../models/friends")
const usersModel = require("../models/users")

function getFriendsPage(db, {username}, callback) {
  friendsModel.getMyFriends(db, {username}, myFriends => {
    friendsModel.getPendingSentTo(db, {username}, pendingFriends => {
      usersModel.getAllUsers(db, allUsers => {

        const allUsersObj = allUsers.map(user => {
          return {
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
          }
        })
        const myFriendsObj = myFriends.map(friend => {
          return allUsersObj.find(user => user.username === friend.username)
        })
        const pendingSentToObj = pendingFriends.map(friend => {
          return allUsersObj.find(user => user.username === friend.sentFrom)
        })
        console.log(myFriendsObj)
        console.log(pendingSentToObj)
        console.log(allUsersObj)
        callback({
          myFriends: myFriendsObj,
          pendingFriends: pendingSentToObj,
          allUsers: allUsersObj,
        })
      })
    })
  })
}

function sendFriendRequest(db, {username, friend}, callback) {
  friendsModel.addFriendRequest(db, {username, friendUsername: friend.username}, () => {
    getFriendsPage(db, {username}, result => {
      callback(result)
    })
  })
}

function handleRequest(db, {username, friendUsername, status}, callback) {
  friendsModel.removeRequest(db, {username, friendUsername}, () => {
    if (status === "accept") {
      friendsModel.addFriend(db, {username, friendUsername}, () => {
        friendsModel.addFriend(db, {username: friendUsername, friendUsername: username}, () => {})
      })
    } else if (status === "decline") {
    }
    getFriendsPage(db, {username}, result => {
      callback(result)
    })
  })
}

module.exports = {
  getFriendsPage,
  sendFriendRequest,
  handleRequest,
}