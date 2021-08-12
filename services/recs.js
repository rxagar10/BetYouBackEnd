const recsModel = require("../models/recs");

function submitRec(db, { friendsList, recData }, callback) {
  recsModel.getRecColumns(db, (columnsRec) => {

    const finalRecData = columnsRec.map(col => {
      if (recData.hasOwnProperty(col.Field)) {
        return { [col.Field]: recData[col.Field] }
      } else {
        return { [col.Field]: null}
      }
    })

    friendsList.forEach(friend => {
      finalRecData[1] = { sentTo: friend[0].username };
      recsModel.insertRec(db, { recData: finalRecData }, insertedResp => {
        callback({ message: "success" })
      })
    })
  })
}

function displayHomeRec(db, {username}, callback) {
  recsModel.receivedRecs(db, {username}, (receivedResp) => {
    displayHelper(receivedResp, result => {
      callback({
        recsFeed: result
      })
    })
  })
}

function displaySentRec(db, {username}, callback) {
  recsModel.sentRecs(db, {username}, (sentResp) => {
    displayHelper(sentResp, result => {
      callback({
        myRecs: result
      })
    })
  })
}

function displayHelper(recsList, callback) {
  const recData = recsList.map(rec => {
    const newRec = {}
    for (const key in rec) {
      if (rec.hasOwnProperty(key)) {
        if (rec[key] !== null) {
          newRec[key] = rec[key]
        }
      }
    }
    return newRec
  })
  callback(recData)
}

module.exports = {
  submitRec,
  displayHomeRec,
  displaySentRec,
}