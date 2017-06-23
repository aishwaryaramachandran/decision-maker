// const args = process.argv.slice(2);

const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: settings
});


function addCreator(data){
console.log(data);
knex.insert({
  'email': data[0]
}).into('creators').asCallback(function() {
    knex.destroy();
  });
}


addCreator();
//pass data from form to addCreator

knex('creator').where('email', args).asCallback((err, rows)=>{
  if(err) return console.log(err);
  rows.forEach();
  knex.destroy();
});