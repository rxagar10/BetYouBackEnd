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

  app.post("/createBet", (req, res) => {
    const username = req.body.username;

    res.send({
      myFriends: ["Rishi", "Nate", "BetYou"]
    })
  })

  app.post("/submitBet", (req, res) => {
    const username = req.body.username;
    const friendBet = req.body.friendBet
    const witness = req.body.witness
    const betTitle = req.body.betTitle
    const terms = req.body.terms
    const amount = req.body.amount
    const friendAmount = req.body.friendAmount
    const settleDate = req.body.settleDate

    res.send({
      betSubmitMessage: "success",
    })

  })

  app.post("/friends", (req, res) => {
    const username = req.body.username;

    res.send({
      myFriends: [
        { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
        { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" },
      ],
      pendingFriends: [
        { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        { firstName: "Jane", lastName: "Doe", username: "janedoe" },
      ],
      allUsers: [
        { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        { firstName: "John", lastName: "Doe", username: "johndoe"},
      ],
    })
  })

  app.post("/pendingStatus", (req, res) => {
    const username = req.body.username;
    const friendUsername = req.body.friendUsername;
    const status = req.body.status;

    const myFriends = [
      { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
      { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" },
    ]

    const pendingFriends = [
      { firstName: "Joe", lastName: "Smith", username: "joesmith" },
      { firstName: "Jane", lastName: "Doe", username: "janedoe" },
    ]

    if (status === "accept") {
      res.send({
        myFriends: [...myFriends, pendingFriends.find((friend) => friend.username === friendUsername)],
        pendingFriends: pendingFriends.filter(friend => friend.username !== friendUsername),
      })
    } else if (status === "decline") {
      res.send({
        myFriends: myFriends,
        pendingFriends: pendingFriends.filter(friend => friend.username !== friendUsername),
      })
    } else {
      res.send({ errorMessage: "Error" })
    }
  })

  app.post("/sendRequest", (req, res) => {
    const username = req.body.username;
    const friend = req.body.friend;

    const allUsers = [
      { firstName: "Joe", lastName: "Smith", username: "joesmith" },
      { firstName: "Jane", lastName: "Doe", username: "janedoe" },
      { firstName: "John", lastName: "Doe", username: "johndoe"},
    ]

    res.send({
      allUsers: allUsers.filter(user => user.username !== friend.username)
    })
  })

  app.post("/myBets", (req, res) => {
    const username = req.body.username;

    const currentBets = [
      {title: "Bet1",
        terms: "These are terms",
        betFriend: { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        amount: 5,
        friendAmount: 5,
        witness: [],
        settleDate: "07/31/2020",
        betId: 1
      },
      {title: "Bet2",
        terms: "These are terms 2",
        betFriend: { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        amount: 15,
        friendAmount: 10,
        witness: [
          { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
          { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" }
        ],
        settleDate: "08/31/2020",
        betId: 2
      }
    ]

    const pastBets = [
      {title: "Bet past1",
        terms: "These are terms",
        betFriend: { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        amount: 533,
        friendAmount: 533,
        witness: [],
        settleDate: "07/31/2020",
        betId: 5
      },
      {title: "bet past2",
        terms: "These are terms 2",
        betFriend: { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        amount: 1533,
        friendAmount: 1033,
        witness: [
          { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
          { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" }
        ],
        settleDate: "08/3/2020",
        betId: 4
      }
    ]

    const betRequests = [
      {title: "Bet request 1",
        terms: "These are terms",
        betFriend: { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        amount: 544,
        friendAmount: 544,
        witness: [],
        settleDate: "07/31/2020",
        betId: 10
      },
      {title: "Bet request 2",
        terms: "These are terms 2",
        betFriend: { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        amount: 15,
        friendAmount: 10,
        witness: [
          { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
          { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" }
        ],
        settleDate: "08/31/2020",
        betId: 11
      }
    ]

    res.send(
        {
          currentBets,
          pastBets,
          betRequests
        }
    )
  })

  app.post("/handleBetRequest", (req, res) => {
    const username = req.body.username
    const betId = req.body.betId
    const status = req.body.status

    const currentBets = [
      {title: "Bet1",
        terms: "These are terms",
        betFriend: { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        amount: 5,
        friendAmount: 5,
        witness: [],
        settleDate: "07/31/2020",
        betId: 1
      },
      {title: "Bet2",
        terms: "These are terms 2",
        betFriend: { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        amount: 15,
        friendAmount: 10,
        witness: [
          { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
          { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" }
        ],
        settleDate: "08/31/2020",
        betId: 2
      }
    ]

    const betRequests = [
      {title: "Bet request 1",
        terms: "These are terms",
        betFriend: { firstName: "Joe", lastName: "Smith", username: "joesmith" },
        amount: 544,
        friendAmount: 544,
        witness: [],
        settleDate: "07/31/2020",
        betId: 10
      },
      {title: "Bet request 2",
        terms: "These are terms 2",
        betFriend: { firstName: "Jane", lastName: "Doe", username: "janedoe" },
        amount: 15,
        friendAmount: 10,
        witness: [
          { firstName: "Nate", lastName: "Kirschner", username: "natekirschner" },
          { firstName: "Rishi", lastName: "Agarwal", username: "rishiagarwal" }
        ],
        settleDate: "08/31/2020",
        betId: 11
      }
    ]

    if(status === "accept") {
      res.send({
        currentBets: [...currentBets, betRequests.find((bet) => bet.betId === betId)],
        betRequests: betRequests.filter((bet) => bet.betId !== betId)
      })
    } else {
      res.send({
        currentBets,
        betRequests: betRequests.filter((bet) => bet.betId !== betId)
      })
    }
  })

}