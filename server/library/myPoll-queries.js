module.exports = (knex) => {
const obj = {};

  obj.createMyPoll = function (object){
  //POLL FUNCTION TO CREATE A DB ENTRY FOR A NEW POLL
  return knex('creators')
    .insert({email: object.email})
    .returning('id')
    .then(function (id) {
      return knex('polls')
        .insert({
          title: object.title,
          description: object.description,
          admin_code: object.adminCode,
          share_code: object.shareCode,
          creator_id: parseFloat(id)
        })
        .returning('id')
    })
    .then(function(id){
      return Promise.all(object.options.map((item) => {
          return knex('options')
            .insert({
              description: item,
              poll_id: parseFloat(id)
            })
      }))
    })
  }

  function optionVotes (option) {
    return knex('vote_options')
      .where("option_id", option.id);
  }

  function pollOptions (poll) {
    return knex('options')
      .where("poll_id", poll.id);
  }



obj.getMyPoll = function (code){
  // POLL FUNCTION TO RETREIVE DB DATA FOR A POLL THAT WAS CREATED (admin_code)
    return new Promise((resolve, reject) => {
      let data = { poll: null, options: [] };

     knex('polls')
        .where("admin_code", code)
        .then( (rows) => {
          if (!rows.length){
            throw new Error(`No poll found for admin code: ${code}`)
          }
          const poll = rows[0];

         data.poll = poll;

         pollOptions(poll).map((option, index) => {
             let optionData = {};
            optionData[`option${index}`] = option;
            optionData.vote_options = [];
            data.options[index] = optionData;
            optionVotes(option).map((option_vote) => {
              optionData.vote_options.push(option_vote);
            })
            .then(() => resolve(data))
            .catch(reject)
          })
          .catch(reject);
        })
        .catch(reject)
    })
  }
  return obj;
}