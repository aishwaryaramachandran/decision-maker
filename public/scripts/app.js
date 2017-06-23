$(function() {

  function renderURLs(urlData) {
    $('<a/>', {
    class: 'adminUrl',
    href: urlData.myUrl,
    text: 'Here is your new Poll!'
}).appendTo('body');
     $('<a/>', {
    class: 'voterUrl',
    href: urlData.voteUrl,
    text: 'Give this link to your voters!'
}).appendTo('body');
  function createVoteSection(poll) {
    const html = `<p class="voteTitle">Title : ${poll.title}</p>
      <p><strong>Description</strong></p>
      <p class="voteDescription">${poll.description}</p>
      <form id='voteForm' method="POST" action="/vote">
        <label for="email">Enter your Name: </label>
        <input type="text" name="voteName" placeholder="your.email@email.com" class="voteInput"><br>
        ${poll.options[0]} <input type="radio" name="voteOptionA" value="1" checked class=""><br>
        ${poll.options[1]} <input type="radio" name="voteOptionB" value="2"><br>
        ${poll.options[2]} <input type="radio" name="voteOptionC" value="other"><br>
        ${poll.options[3]} <input type="radio" name="voteOptionD" value="other"><br>
        <button type="submit" value="Submit">Submit</button>
        <button type="submit" value="Submit">Refresh</button>
      </form>`;
      return html;
  }

  function renderURLs(urlData) {
    //show two links URL
    //first link : for user // second link : for creator
    const $message = $('p');
    const $urlAddress = $('p');
    $message.text("you created the poll successfully :D");
    $urlAddress.prepend(urlData);
  }

  function getURL () {
    //GET ajax and return renderURls function
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
    //POST ajax, return GETURL and slideup event
    event.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/create',
      data: $(this).serialize()
    }).done(function () {
      $('#conundrum-container').slideUp();
      getURL();
    });
  });
});
