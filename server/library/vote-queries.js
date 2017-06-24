//NOT FINISHED

module.exports = (knex) => {
  const voteQueries = {};

  voteQueries.postVote = function (obj) {

    return knex('vote')
      .insert({name: obj.name})
      .returning('id')
      .then( (id) => {
        return Promise.all(obj.ranks.map( function(value, index) {
          return knex('vote_options')
          .insert({rank: index + 1,
                   vote_id: ParseFloat(id),
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
        let data = { poll: null, options: null };
        knex('polls')
          .where("share_code", shareCode)
          .then( (rows) => {
            if (!rows.length){
              throw new Error(`No poll found for share code: ${shareCode}`)
            }
            const poll = rows[0];

            data.poll = poll;

            pollOptions(poll).map((option) => {
              let optionData = {option: option};
            })
            .then(()=> resolve(data))
            .catch(reject);
          })
          .catch(reject)
      })
    }
  return voteQueries;
}