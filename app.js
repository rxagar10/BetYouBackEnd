const express = require('express');
const config = require("./config");
const cors = require('cors');
const path = require('path');
const api = require("./api/routes");

async function startServer() {

  const app = express();

  app.listen(config.port, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server started`);
  });

  app.use(cors());
  app.use(express.json());

  app.use(express.static(path.join(__dirname, config.buildFolder)));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, config.buildHtml))
  })

  await api({ app });

}

startServer();