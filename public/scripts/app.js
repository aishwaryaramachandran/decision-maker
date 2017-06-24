$(function() {

  $(() => {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      for(user of users) {
        $("<div>").text(user.name).appendTo($("body"));
      }
    });
  });
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
  };

  function getURL () {
    //GET ajax and return renderURls function
    console.log("chris2")
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

