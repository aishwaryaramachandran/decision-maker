$(function() {

  
  function createPoll(poll) {
    //generate html5 element with css
    const html = `<label for="email">Enter your Email:</label>
      <input type="text" name="email" placeholder="your.email@email.com"><br>
      <label for="text">Enter a Title:</label>
      <input type="text" name="title" placeholder="Title"><br>
      <label for="text">Describe your Conundrum</label>
      <textarea type="text" name="description" placeholder="What's the deal?"></textarea><br>
      <label for="text">Option A:</label>
      <input type="text" name="option-a" placeholder="Option A"><br>
      <label for="text">Option B:</label>
      <input type="text" name="option-b" placeholder="Option B"><br>
      <label for="text">Option C:</label>
      <input type="text" name="option-c" placeholder="Option C"><br>
      <label for="text">Option D:</label>
      <input type="text" name="option-d" placeholder="Option D"><br>
      <input type="submit" value="Submit">`;
      return html;
  }

  function generatePolls() {
    //get the data and call renderTweets Function
    $.ajax({
      method: 'GET',
      url: '/',
      dataType: 'json'
    }).done(function (poll) {
      createPoll(poll);
    });
  }

  generatePolls();
  



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