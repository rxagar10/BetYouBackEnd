const searchTitle = require("../services/searchTitle");
const getRecInfo = require("../services/getRecInfo");
const signUpService = require("../services/signUp");
const loginService = require("../services/login");
const friendsService = require("../services/friends")

module.exports = async function ({ app, db }) {
  app.post("/signup", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const params = { firstName, lastName, username, email, password };

    signUpService(db, params, (resp) => {
      res.send(resp)
    })
  })

  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    loginService(db, { username, password }, (resp) => {
      res.send(resp);
    })
  })

  app.post("/myAccount", (req, res) => {
    const username = req.body.username;

    res.send({
      email: "email@test.com",
      accountBalance: 1000,
      betsWon: 5,
      betsLost: 2,
      betsWitnessed: 8,
    })
  })

  app.post("/createRec", (req, res) => {
    const username = req.body.username;

    res.send({
      myFriends: ["Rishi", "Nate", "BetYou"]
    })
  })

  app.post("/submitRec", (req, res) => {
    const username = req.body.username;
    const friendBet = req.body.friendBet
    const witness = req.body.witness
    const betTitle = req.body.betTitle
    const terms = req.body.terms
    const amount = req.body.amount
    const friendAmount = req.body.friendAmount
    const settleDate = req.body.settleDate

    res.send({
      message: "success",
    })

  })

  app.post("/friends", (req, res) => {
    const username = req.body.username;

    friendsService.getFriendsPage(db, {username}, result => {
      res.send(result)
    })
  })

  app.post("/pendingStatus", (req, res) => {
    const username = req.body.username;
    const friendUsername = req.body.friendUsername;
    const status = req.body.status;

    friendsService.handleRequest(db, {username, friendUsername, status}, result => {
      res.send(result)
    })
  })

  app.post("/sendRequest", (req, res) => {
    const username = req.body.username;
    const friend = req.body.friend;

    friendsService.sendFriendRequest(db, {username, friend}, result => {
      res.send(result)
    })
  })

  app.post("/searchTitle", (req, res) => {
    const title = req.body.title;
    const recType = req.body.recType;

    searchTitle({ title: title, recType: recType }, (movieResp) => {
      res.send({ titlesList: movieResp});
    })
  })

  app.post("/home", (req, res) => {
    const username = req.body.username;

    res.send({
      recsFeed: [
        { title: "Title 1", from: "Nate", year: "2020", runtime: null, comments: "Great Movie"},
        { title: "Title 2", from: "Rishi", year: null, runtime: "120", comments: "Terrible Movie"},
      ]
    })
  })

  app.post("/getFromId", (req, res) => {
    const id = req.body.id;
    const recType = req.body.recType;

    getRecInfo({ id: id, recType: recType}, (infoResp) => {
      res.send({
        titleInfo: infoResp,
      })
    })

  })

  app.post("/myRecs", (req, res) => {
    const username = req.body.username;

    res.send({
      myRecs: [
        { title: "Title 1", to: "Nate", year: "2020", runtime: null, comments: "Great Movie"},
        { title: "Title 2", to: "Rishi", year: null, runtime: "120", comments: "Terrible Movie"},
      ]
    })
  })
}