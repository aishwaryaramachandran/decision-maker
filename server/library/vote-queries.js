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

    voteQueries.getEmail = function(code){
      return new Promise((resolve, reject) => {
      const emailData = {};
      knex('polls')
      .where('share_code', code)
      .then( (rows) => {
          emailData = {
          email: rows[0].email,
          admin: rows[0].admin_code
        }
        .then(()=> resolve(emailData))
        .catch(reject);
    })
  });
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
            const poll = rows[0];
            data.poll = {
                          title: poll.title,
                          description: poll.description
                        };
            pollOptions(poll).map((option, index) => {
            let optionData = {
                              id: option.id,
                              description: option.description
                             };
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
