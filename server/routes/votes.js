"use strict";

const express = require('express');
const router  = express.Router();

//route to get vote page that uses :id(shareCode) to retrieve relevant data

 function getVotes(knex) => {
  router.get("/vote/id", (req, res) =>{
    knex('votes').returning('').


  });
  return router;
 }



 function postVotes(knex) => {
  router.post("/vote/id", (req, res) => {
    knex('votes')
      .returning("id")
      .insert("users")
      .then((results) => {
        knex('vote_options')
          insert(option_id: result.id)
    });
  });
  return router;
}




module.exports =



// //- Get POLL/:id
// - GET Options with Poll_id
// - Render Form with fields based on Options that were just GET'd
//(keep options_id as hidden fields so they can be used to create vote_options)
// POST form to create VOTE, THEN create vote_otions