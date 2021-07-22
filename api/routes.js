

module.exports = async function({ app }) {
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
}