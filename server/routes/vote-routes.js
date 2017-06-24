// Routes for votes

const express = require('express');
const voteFunctions = require("library/vote-queries.js");

module.exports = (knex) => {
  const router = express.Router();

const {} = voteFunctions(knex);

  // Posts submitted vote data to database
  app.post("/:id", (req, res) => {
    const newVote = {
      shareCode: req.params.id,
      name: req.body.name,
      ranks: [req.body.rankA,
              req.body.rankB,
              req.body.rankC,
              req.body.rankD
              ]
    };

    //Need knex function that uses :id(shareCode) to post data to correct table/row
    //order: `${req.body.optionA}${req.body.optionB}${req.body.optionC}${req.body.optionD}`
    res.status(200).send("success");
    return;
  });

  // Gets vote page for voter
  app.get("/:id", (req, res) => {
    voter = req.params.id;
    // Need knex function that uses :id(shareCode) to retrieve relevant data
    res.status(200).send("success");
    return;
  });
