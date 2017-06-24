//NOT FINISHED

module.exports = (knex) => {
  const voteQueries = {};

  voteQueries.postVote = function (obj) {

    return knex('vote')
      .insert({name: obj.name})
      returning('id')
      .then( (id) => {
        const optionId =
          knex.select('id')
          .from('polls')
          .where(share_code, shareCode)
        return Promise.all(obj.ranks.map( function(value) {
          return knex('vote_options')
          .insert({rank: value,
                   vote_id: id,
                   option_id: optionId
                  })
        }))
      })
    }

  return voteQueries;
}
