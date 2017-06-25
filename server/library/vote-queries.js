//NOT FINISHED

module.exports = (knex) => {
  const voteQueries = {};

  voteQueries.postVote = function (obj) {

    return knex('votes')
      .insert({name: obj.name})
      .returning('id')
      .then( (id) => {
        return Promise.all(obj.ranks.map( function(value, index) {
          return knex('vote_options')
          .returning('id')
          .insert({rank: index + 1,
                   vote_id: parseFloat(id),
                   option_id: value
                  })
          }))
      })
    }

    function pollOptions (poll) {
    return knex('options')
      .where("poll_id", poll.id);
  }

  voteQueries.getVote = function (shareCode){
      return new Promise((resolve, reject) => {
        const data = { poll: {}, options: [] };
        knex('polls')
          .where("share_code", shareCode)
          .then( (rows) => {
            // if (!rows.length){
            //   throw new Error(`No poll found for share code: ${shareCode}`)
            // }
            const poll = rows[0];
            data.poll = poll;
            pollOptions(poll).map((option, index) => {
            let optionData = {};
            optionData.option = option;
            data.options[index] = optionData;
            })
            .then(()=> resolve(data))
            .catch(reject);
          })
          .catch(reject)
      })
    }
  return voteQueries;
}
