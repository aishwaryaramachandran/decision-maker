$(function() {

  
  // function generatePolls() {
  //   //get the data and call renderTweets Function
  //   $.ajax({
  //     method: 'GET',
  //     url: '/',
  //     dataType: 'json'
  //   }).done(function (poll) {
  //     createPoll(poll);
  //   });
  // }
  function renderURLs(urlData) {
    const $message = $('p');
    const urlAddress = $('p');
    $message.text("you created the poll successfully :D");
    urlAddress.prepend(urlData);
  }

  function getURL () {
    $.ajax({
        url: '/create',
        method: 'GET',
        dataType: 'json'
    }).done(function(response) {
      renderURLs(response);
    }).catch(function(err) {
      console.log('Error message: ', err);
    });
  }
 
  $('#newPoll').on('submit', function(event) {
    event.preventDefault();
    console.log("chris")
    $.ajax({
      method: 'POST',
      url: '/create',
      data: $(this).serialize()
    }).done(function () {
      $('#conundrum-container').slideUp();
      getURL();
    })
  })
});




// $('.tweet-compose').on('click', function(event){
//     $('.new-tweet').slideToggle();
//     $('textarea').focus();

//   })





// //Load Form Data
// //Return URL





// function loadPoll(){
//     $.ajax({
//       url: '/polls',
//       type: 'GET',
//       dataType: 'json',
//       success: function (data) {
//         renderPoll(data);
//       }
//     });
//   }

// loadPoll();