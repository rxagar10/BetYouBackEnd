const searchTitle = require("../services/searchTitle");
const getRecInfo = require("../services/getRecInfo");
const signUpService = require("../services/signUp");
const loginService = require("../services/login");
const friendsService = require("../services/friends")
const recsService = require("../services/recs");

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

    friendsService.getFriendsPage(db, { username }, (friendsResp) => {
      res.send({
        myFriends: friendsResp.myFriends,
      })
    })

  })

  app.post("/submitRec", (req, res) => {
    const friendsList = req.body.friendsList;
    const recData = req.body.recData;

    recsService.submitRec(db, { friendsList, recData}, result => {
      res.send(result);
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
    const musicType = req.body.musicType;
    const state = req.body.state;

    searchTitle({ title: title, recType: recType, musicType, state }, (movieResp) => {
      res.send({ titlesList: movieResp});
    })
  })

  app.post("/home", (req, res) => {
    const username = req.body.username;

    recsService.displayHomeRec(db, {username}, (result) => {
      res.send(result)
    })
  })

  app.post("/getFromId", (req, res) => {
    const id = req.body.id;
    const recType = req.body.recType;
    const musicType = req.body.musicType;

    getRecInfo({ id: id, recType: recType, musicType}, (infoResp) => {
      res.send({
        titleInfo: infoResp,
      })
    })

  })

  app.post("/myRecs", (req, res) => {
    const username = req.body.username;

    recsService.displaySentRec(db, {username}, result => {
      res.send(result)
    })

  })
}