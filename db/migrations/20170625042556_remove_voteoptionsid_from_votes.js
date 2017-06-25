exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('votes', function(table){
      table.dropColumn('vote_option_id')
    })

    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('votes', function(table){
      table.integer('vote_option_id').unsigned()
      table.foreign('vote_option_id').references('vote_options.id');
    })
  ])
};
