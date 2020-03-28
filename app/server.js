//HEROKU CONFIG
const cool = require("cool-ascii-faces");
const path = require("path");
const PORT = process.env.PORT || 5000;
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, "/dist"))).listen(PORT, () => console.log(`Listening on ${PORT}`));