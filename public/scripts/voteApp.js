$(function() {    
    function submitSuccess()  {
      $('<span/>', {
        text: "Thank you for voting!"
      }).appendTo('#voteSection')
  }
  
    $('#voteForm').on('submit', function(event) {
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/vote',
      data: $(this).serialize()
    }).done(function () {
      $('#voteForm').slideUp();
      submitSuccess();
        });
    });

    $('#reset').on('reset', function(event) {
      $('#voteForm').reset();
    })
});