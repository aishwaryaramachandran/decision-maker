$(function() {

  function submitSuccess()  {
    //show the text
      $('<span/>', {
        text: "Thank you for voting!"
      }).appendTo('#voteSection')
  }
  

  $('.voteDescription').on('click', function(evt) {
    console.log("hello")
    event.preventDefault();
  })

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
