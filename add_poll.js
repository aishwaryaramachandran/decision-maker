const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: settings
});


var data = {
  poll: {
    title: 'title',
    description: 'wordswords',
    status: 'Open',
    admin_code: 'UAH3740',
    share_code: 'UAH3740',
    option_1_id:
  },
  creator: {
    email: 'chris@mal.com'
  },
  options1: {
    desc: 'option 1 descriptions'
  }
}


function addPoll(object){
  console.log(object);
  knex.insert({
    'title': object.title,
    'description': object.description,
    'status': object.status,
    'admin_code':object.admin_code,
    'share_code':object.share_code
  }).into('polls').asCallback(function(err, results) {
    knex.destroy();
  });
}

function addOptions(object, callback){
  var allInserts = [];
  for (let i = 0; i < object.options.length; i++){
    allInserts.push({
    description: object.options[i]
  });
  }
  knex.insert(allInserts).into('options').asCallback(function(){
    knex.destroy();
  });
  callback(object);
}
function addVoteOptions(object){
  var allInserts = [];
  for (let i = 0; i < object.rank.length; i++){
    allInserts.push({
    rank: object.rank[i]
  });
  }
  knex.insert(allInserts).into('vote_options').asCallback(function(){
    knex.destroy();
  });
}

addPoll(data);
addOptions(data, addVoteOptions);




// function createCreator(object, callback) {
//  // Returns [1]
//   knex('creator')
//   .returning('id')
//   .insert({email: object.email});

//   // do the DB insert, and do so in a way that lets us find out what ID the creator got
//   // pass that ID to the callback!
//   callback(null, 2);    // this callback's second param has to be the unique 'id'
//   // console.log(id);
// }

// function createPoll(pollConfig, callback) {
//   // create the poll, and get its ID, like we did with the creator
//   // make the allOptions array, pass it to another insert
//   // when all that finishes, call the callback, pass it the pollID

//   callback(null, 777);    // this line is bullshit

// }

// createCreator(data, (err, data) => {
//   if (err) {
//     console.log("my life is misery", err);
//   } else {
//     console.log("all is cheery and bright, our new creator has ID: ", data)
//   }
// })


// function makeAllTheThings(creatorEmail, pollConfig) {

//   createCreator(creatorEmail, (err, creatorId) => {
//     var pollConfig.creator_id = creatorId;
//     createPoll(pollConfig, (err, pollId) => {
//       console.log("poll created, with ID:", pollId);
//       knex.destroy();
//     })
//   })

// }