$(function() {

  function renderURLs(urlData) {
    //show the two links : admin, vote
    const $adminURL = $('<a>', {
      class: 'adminUrl',
      href: urlData.myUrl,
      text: 'Here is your new Poll!'
    })
    const $voteURL = $('<a>', {
      class: 'voterUrl',
      href: urlData.voteUrl,
      text: 'Give this link to your voters!'
    })
    const $adminButton = $('<button class="btn btn-primary btn-lg round">');
    const $voteButton =  $('<button class="btn btn-primary btn-lg round">');
    const $br = $('<br>');
    $adminButton.append($adminURL);
    $voteButton.append($voteURL);
    $('#links').append($adminButton).append($br).append($voteButton);
  };



  function getURL () {
    //GET ajax and return renderURls function
    $.ajax({
        url: '/mypoll/create',
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
      url: '/mypoll/create',
      data: $(this).serialize()
    }).done(function () {
      $('#conundrum-container').slideUp();
      getURL();
    });
  });
});