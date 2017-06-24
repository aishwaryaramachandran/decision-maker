//Routes for Polls
const express = require('express');
const pollFunctions = require("library/myPoll-queries.js");

module.exports = (knex) => {
  const router = express.Router();

  const {} = pollFunctions(knex);

  // Generates Code for adminCode and shareCode
  function generateRandomString() {
    let result = '';
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 6; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }

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

    // createMyPoll(newpoll)
    // .then( () => {
    //   res.status(201).send()
    // })
    // .catch((err) => {
    //   res.status(400).send("error")
    // })


    // Kinex function to insert newPoll
  console.log(urls);
  console.log(newPoll);

  //erase when un-commenting promise
  res.status(201).send()

  });

  // Returns URL
  app.get("/create", (req, res) => {
    console.log(urls);
    res.status(200).json(urls);
    return;
  });

  // Gets poll results for admin
  app.get("/:id", (res, req) => {
    const admin = req.params.id;
    // Need knex function that uses :id(adminCode) to retrieve relevant data
    res.status(200).send("success");
    return;
  });
