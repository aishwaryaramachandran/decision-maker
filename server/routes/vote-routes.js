// Routes for votes
"use strict";

const express = require('express');
const voteFunctions = require("../library/vote-queries.js");

module.exports = (knex) => {
  const router = express.Router();

  const {postVote, getVote} = voteFunctions(knex);

  // Posts submitted vote data to database
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
