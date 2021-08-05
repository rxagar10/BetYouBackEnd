
function addFriendsTable(db, { username }, callback) {
  db.query(
      "CREATE TABLE ?? ("
      + "username VARCHAR(30) NOT NULL PRIMARY KEY)",
      [username + "_friends"],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function getMyFriends(db, {username}, callback) {
  db.query(
      "SELECT * FROM ??",
      [username + "_friends"],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function getPendingSentTo(db, {username}, callback) {
  db.query(
      "SELECT * FROM friendRequests WHERE sentTo = ?",
      [username],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function addFriendRequest(db, {username, friendUsername}, callback) {
  db.query(
      "INSERT INTO friendRequests (sentFrom, sentTo) VALUES (?, ?)",
      [username, friendUsername],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function removeRequest(db, {username, friendUsername}, callback) {
  db.query(
      "DELETE FROM friendRequests WHERE sentFrom = ? AND sentTo = ?",
      [friendUsername, username],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function addFriend(db, {username, friendUsername}, callback) {
  db.query(
      "INSERT INTO ?? (username) VALUES (?)",
      [username + "_friends", friendUsername],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

module.exports = {
  addFriendsTable,
  getMyFriends,
  getPendingSentTo,
  addFriendRequest,
  removeRequest,
  addFriend,
}