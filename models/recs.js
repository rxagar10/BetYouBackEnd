
function getRecColumns(db, callback) {
  db.query(
      "SHOW COLUMNS FROM recs",
      [],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function insertRec(db, {recData}, callback) {
  let columnStr = "";
  let valStr = "";

  recData
  .filter((col, index) => Object.keys(recData[index])[0] !== "id")
  .forEach((col, index) => {
    columnStr += Object.keys(recData[index])[0];
    valStr += "?";
    if (index !== recData.length - 2) {
      columnStr += ", ";
      valStr += ", ";
    }
  });

  const mysqlStr = "INSERT INTO recs (" + columnStr + ") VALUES (" + valStr + ")";
  const recValues = recData
  .filter((col, index) => Object.keys(recData[index])[0] !== "id")
  .map((col, index) => Object.values(recData[index])[0]);

  db.query(
      mysqlStr,
      recValues,
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function receivedRecs(db, {username}, callback) {
  db.query(
      "SELECT * FROM recs WHERE sentTo = ?",
      [username],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

function sentRecs(db, {username}, callback) {
  db.query(
      "SELECT * FROM recs WHERE sentFrom = ?",
      [username],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
  )
}

module.exports = {
  getRecColumns,
  insertRec,
  receivedRecs,
  sentRecs,
}