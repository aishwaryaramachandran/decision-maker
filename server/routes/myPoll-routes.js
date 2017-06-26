//Routes for Polls
"use strict";
const express = require('express');
const pollFunctions = require("../library/myPoll-queries.js");

module.exports = (knex) => {
  const router = express.Router();

  const {createMyPoll, getMyPoll} = pollFunctions(knex);

  // Generates Code for adminCode and shareCode
  function generateRandomString() {
    let result = '';
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 6; i > 0; --i) {
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
  }
  // Takes in each voters rankings for an option and the total number of options
  // Returns a score used to rank each option
  function score (ranks, options) {
    let finalScore = 0;
    ranks.forEach( (rank) => {
      let score = options - rank;
      finalScore += score
    })
  return finalScore;
  }

  // Staging area for URLS
  const urls = {
    myUrl: "",
    voteUrl: ""
  };
  // Create new Conundrum (Need to check for errors)
  router.post("/create", (req, res) => {
    const admin = generateRandomString();
    const share = generateRandomString();
    urls.myUrl = `http://localhost:8080/mypoll/${admin}`;
    urls.voteUrl = `http://localhost:8080/vote/${share}`;

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
    var api_key = 'key-e0b22302447902e45e7a531ed87e241c';
    var domain = 'sandbox35917ab6f63a495f95fa2f7cf334a6f1.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

    var data = {
    from: '<postmaster@sandbox35917ab6f63a495f95fa2f7cf334a6f1.mailgun.org>',
    to: newPoll.email,
    subject: req.body.title,
    text: newPoll.shareCode
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });

    const api_key = 'key-d24ef8147e3c25109525aedc022e0926';
    const domain = 'sandboxb3fa38b723314d6689d82d7263fbe595.mailgun.org';
    const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
    const data = {
          from: '<postmaster@sandboxb3fa38b723314d6689d82d7263fbe595.mailgun.org>',
          to: req.body.email,
          subject: req.body.title,
          text: urls.voteUrl
        };

    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });

    createMyPoll(newPoll)
    .then( () => {
      res.status(201).send()
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("error")
    })

  });


  // Returns URL
  router.get("/create", (req, res) => {
    res.status(200).json(urls);
  });

  // Gets poll results for admin
  router.get("/:id", (req, res) => {
    const admin = req.params.id;
    getMyPoll(admin)
    .then( (data) => {
      res.status(200).render("mypolls", {
        poll: data.poll,
        options: data.options.map( (value) => {
                   return { description: value.description,
                            score: score(value.rank, data.poll.totalOptions)
                          }
      })
    })

    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("error")
    })

  });

  return router;
}
