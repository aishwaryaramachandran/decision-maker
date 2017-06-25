exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table){
      table.string('email')
      table.dropForeign('creator_id')
      table.dropColumn('creator_id')
    })

    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('polls', function(table){
      table.integer('creator_id').unsigned()
      table.foreign('creator_id').references('creators.id')
      table.dropColumn('email')
    })
  ])
};
