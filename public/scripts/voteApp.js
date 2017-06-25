$(function() {
  
  function submitSuccess()  {
    //show the text
      $('<span/>', {
        text: "Thank you for voting!"
      }).appendTo('#voteSection')
  }
  
  $('#voteForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/vote/:id',
      data: $(this).serialize()
    }).done(function () {
      $('#voteForm').slideUp();
      submitSuccess();
      });
  });
  $('#reset').on('click', function(event) {
    //refresh the page
    console.log("chirs")
    $.ajax({
      method: 'GET',
      url: '/vote/:id',
      dataType: 'json'
    }).done(function () {
      $(this).val('');
      console.log($(this));
    })
  
  });
});

//  function makeTemplate() {
//     //ajax get
//     console.log("chris")
//     $.ajax({
//       method: 'GET',
//       url: '/vote/:id',
//       dataType: "json"
//     }).done(function (options) {
//       console.log("chris2", options);
//       makeRankingAndOptions(options);
//     }).catch(err => {
//       console.log("err", err);
//     });
//   }
//   makeTemplate()