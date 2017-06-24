
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', function(table){
      table.dropColumn('status')
    })

    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  knex.schema.table('polls', function(table){
      table.addColumn('status')
    })
  ])
};
