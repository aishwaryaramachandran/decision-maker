
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('vote_options', function(table){
      table.dropColumn('poll_id')
      table.integer('vote_id').unsigned()
      table.foreign('vote_id').references('votes.id');
    })

    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('polls', function(table){
      table.integer('poll_id')
      table.dropColumn('vote_id')
    })
  ])
};
