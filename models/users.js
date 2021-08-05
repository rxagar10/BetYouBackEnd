
function checkUserDNE(db, { username }, callback) {
  db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, result) => {
        if (err) throw err;
        callback(result.length === 0);
      }
  )
}

function addNewUser(db, {firstName, lastName, username, email, password}, callback) {
  db.query(
      "INSERT INTO users (username, password, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)",
      [username, password, firstName, lastName, email],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function verifyUser(db, { username, password }, callback) {
  db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (err, result) => {
        if (err) throw err;
        callback(result.length === 1);
      }
  )
}

function getAllUsers(db, callback) {
  db.query(
      "SELECT * FROM users",
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

module.exports = {
  checkUserDNE,
  addNewUser,
  verifyUser,
  getAllUsers,
}