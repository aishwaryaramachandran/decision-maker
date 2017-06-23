exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('creators', function(table){
      table.increments('id').primary()
      table.string('email')
    }),

    knex.schema.createTable('polls', function(table){
      table.increments('id').primary()
      table.string('title')
      table.string('description')
      table.string('status')
      table.string('admin_code')
      table.string('share_code')
      table.integer('creator_id').unsigned()
      table.foreign('creator_id').references('creators.id');
    }),

    knex.schema.createTable('options', function(table){
      table.increments('id').primary()
      table.string('description')
      table.integer('poll_id').unsigned()
      table.foreign('poll_id').references('polls.id');
    }),

      knex.schema.createTable('vote_options', function(table){
      table.increments('id').primary()
      table.string('rank')
      table.integer('poll_id').unsigned()
      table.foreign('poll_id').references('polls.id');
      table.integer('option_id').unsigned()
      table.foreign('option_id').references('options.id');
    }),

      knex.schema.createTable('votes', function(table){
      table.increments('id').primary()
      table.string('name')
      table.integer('vote_option_id').unsigned()
      table.foreign('vote_option_id').references('vote_options.id');
    })

  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('votes'),
    knex.schema.dropTable('options'),
    knex.schema.dropTable('polls'),
    knex.schema.dropTable('creators'),
    knex.schema.dropTable('vote_options')
  ])
};

