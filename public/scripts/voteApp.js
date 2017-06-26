$(function() {

  function submitSuccess()  {
    //show the text
      $('<span/>', {
        text: "Thank you for voting!"
      }).appendTo('#voteSection')
  }
  
  $('.voteDescription').on('click', function(evt) {
    event.preventDefault();
  })

  $('#reset').on('click', function(evt) {
    location.reload();
  });
  
  $('#voteForm').on('submit', function(event) {
    event.preventDefault();
    $('#voteSection').height(400);
    $.ajax({
      method: 'POST',
      url: '/vote/:id',
      data: $(this).serialize()
    }).done(function () {
      $('#voteForm').slideUp();
      submitSuccess();
      });
  });
});
