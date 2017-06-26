$(function() {

  function submitSuccess()  {
    console.log("chris3")
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
    // var optTarget = $(this).find('option-target');
    // var rankTarget= $('.ranking-target').find('.option-target');
    // console.log(optTarget);
    // console.log(rankTarget);
    // if(rankTarget && optTarget) {
    //   alert('Please complete the form');
    //   return false;
    // }
    
    // if(optTarget) {
    //   alert('Please use all your options');
    //   return false;
    // }
    console.log("chris");
    $.ajax({
      method: 'POST',
      url: '/vote/:id',
      data: $(this).serialize()
    }).done(function () {
      console.log("chris2")
      $('#voteForm').slideUp();
      submitSuccess();
      });
  });
});
