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

module.exports = {
  submitRec,
}