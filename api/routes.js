module.exports = async function ({app}) {
  app.post("/signup", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    res.send({
      signupMessage: "success",
    })
  })

  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    res.send({
      loginMessage: "success",
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

    res.send({
      myFriends: [
        {firstName: "Nate", lastName: "Kirschner", username: "natekirschner"},
        {firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal"},
      ],
      pendingFriends: [
        {firstName: "Joe", lastName: "Smith", username: "joesmith"},
        {firstName: "Jane", lastName: "Doe", username: "janedoe"},
      ],
      allUsers: [
        {firstName: "Joe", lastName: "Smith", username: "joesmith"},
        {firstName: "Jane", lastName: "Doe", username: "janedoe"},
        {firstName: "John", lastName: "Doe", username: "johndoe"},
      ],
    })
  })

  app.post("/pendingStatus", (req, res) => {
    const username = req.body.username;
    const friendUsername = req.body.friendUsername;
    const status = req.body.status;

    const myFriends = [
      {firstName: "Nate", lastName: "Kirschner", username: "natekirschner"},
      {firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal"},
    ]

    const pendingFriends = [
      {firstName: "Joe", lastName: "Smith", username: "joesmith"},
      {firstName: "Jane", lastName: "Doe", username: "janedoe"},
    ]

    if (status === "accept") {
      res.send({
        myFriends: [...myFriends,
          pendingFriends.find((friend) => friend.username === friendUsername)],
        pendingFriends: pendingFriends.filter(
            friend => friend.username !== friendUsername),
      })
    } else if (status === "decline") {
      res.send({
        myFriends: myFriends,
        pendingFriends: pendingFriends.filter(
            friend => friend.username !== friendUsername),
      })
    } else {
      res.send({errorMessage: "Error"})
    }
  })

  app.post("/sendRequest", (req, res) => {
    const username = req.body.username;
    const friend = req.body.friend;

    const allUsers = [
      {firstName: "Joe", lastName: "Smith", username: "joesmith"},
      {firstName: "Jane", lastName: "Doe", username: "janedoe"},
      {firstName: "John", lastName: "Doe", username: "johndoe"},
    ]

    res.send({
      allUsers: allUsers.filter(user => user.username !== friend.username)
    })
  })

  app.post("/searchTitle", (req, res) => {
    const title = req.body.title;

    res.send({
      titlesList: [
          {title: "title 1", year: 2020, overview: "awdioajwdoaijwdoa", runtime: 94},
          {title: "title2", year: 1990, overview: "hi", runtime: 10200}]
    })
  })
}