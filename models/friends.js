
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

module.exports = { addFriendsTable }