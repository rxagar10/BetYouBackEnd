const express = require('express');
const config = require("./config");
const cors = require('cors');
const path = require('path');
const api = require("./api/routes");
const mysql = require("mysql");

async function startServer() {

  const db = mysql.createPool({
    host: config.mysql.host,
    port: config.mysql.port,
    password: config.mysql.password,
    user: config.mysql.user,
    database: config.mysql.database,
  })

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

  await api({ app, db });

}

startServer();