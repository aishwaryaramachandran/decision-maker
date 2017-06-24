"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Generates Code for adminCode and shareCode
function generateRandomString() {
  let result = '';
  let chars = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 6; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Staging area for URLS
const urls = {
  myUrl: "",
  voteUrl: ""
};
// Create new Conundrum (Need to check for errors)
app.post("/create", (req, res) =>{
  const admin = generateRandomString();
  const share = generateRandomString();
  urls.myUrl = `http://localhost:8080/mypoll/${admin}`;
  urls.voteUrl = `http://localhost:8080/mypoll/${share}`;
  const newPoll = {
    email: req.body.email,
    title: req.body.title,
    description: req.body.description,
    options: [req.body.optionA,
              req.body.optionB,
              req.body.optionC,
              req.body.optionD
              ],
    adminCode: admin,
    shareCode: share
  };

  // Kinex function to insert newPoll
console.log(urls);
console.log(newPoll);
  res.status(200).send("success")
  return;
});

// Returns URL
app.get("/create", (req, res) => {
  console.log(urls);
  res.status(200).json(urls);
  return;
});

// Gets poll results for admin
app.get("/mypoll/:id", (res, req) => {
  const admin = req.params.id;
  // Need knex function that uses :id(adminCode) to retrieve relevant data
  res.status(200).send("success");
  return;
});

// Posts submitted vote data to database
app.post("/vote/:id", (req, res) => {
  const newVote = {
    shareID: req.params.id,
    name: req.body.name,
    rankA: req.body.rankA,
    rankB: req.body.rankB,
    rankC: req.body.rankC,
    rankD: req.body.rankD
  };

  //Need knex function that uses :id(shareCode) to post data to correct table/row
  //order: `${req.body.optionA}${req.body.optionB}${req.body.optionC}${req.body.optionD}`
  res.status(200).send("success");
  return;
})

// Gets vote page for voter
app.get("/vote/:id", (req, res) => {
  voter = req.params.id;
  // Need knex function that uses :id(shareCode) to retrieve relevant data
  res.status(200).send("success");
  return;
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

