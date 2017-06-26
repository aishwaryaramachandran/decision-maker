// Routes for votes
"use strict";

const express = require('express');
const voteFunctions = require("../library/vote-queries.js");
// const api_key =  require("../../config.js");
module.exports = (knex) => {
  const router = express.Router();

  const {postVote, getVote, getEmail} = voteFunctions(knex);

  // Posts submitted vote data to database
  const urls = {
    myUrl: "",
    voteUrl: ""
  };
  router.post("/:id", (req, res) => {
    const newVote = {
      shareCode: req.params.id,
      name: req.body.voteName,
      ranks: [req.body.rankings1,
              req.body.rankings2,
              req.body.rankings3,
              req.body.rankings4
              ]

    };

    postVote(newVote)
    .then( () => {

      res.status(201).send()
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("error")
    })

  //   getEmail(newVote.shareCode)
  //   .then(()=>{
  //    const admin = getEmail(newVote.shareCode).admin
  //   const domain = 'sandboxb3fa38b723314d6689d82d7263fbe595.mailgun.org';
  //   const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
  //   const data = {
  //         from: '<postmaster@sandboxb3fa38b723314d6689d82d7263fbe595.mailgun.org>',
  //         to: getEmail.email,
  //         subject: "Someone Just Voted on Your Poll!",
  //         text: `Check out your results at http://localhost:8080/mypoll/${admin}`
  //       };

  //   mailgun.messages().send(data, function (error, body) {
  //     console.log(body);
  //   });
  // })
  //   .catch((err) => {
  //     console.log(err)
  //     res.status(400).send("error")
  //   })

  });

  // Gets vote page for voter
  router.get("/:id", (req, res) => {
    const voter = req.params.id;
    getVote(voter)
    .then( (data) => {
      res.status(200).render("vote", data);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error")
    })
  });
  return router;
}
