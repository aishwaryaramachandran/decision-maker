//NOT FINISHED

module.exports = (knex) => {
  const voteQueries = {};

  voteQueries.postVote = function (obj) {

    return knex('vote')
      .insert({name: obj.name})
      returning('id')
      .then( (id) => {
        return Promise.all(obj.ranks.map( function(value, index) {
          return knex('vote_options')
          .insert({rank: index + 1,
                   vote_id: id,
                   option_id: value
                  })
        }))
      })
    }



  return voteQueries;
}
