$( function() {

  function makeRankingAndOptions(options) {
  //subject change
  //check the options and change the options.length
    const number = 0;
    for(let i = 0; i < options.length; i++) {
      template(options);
    }
  }
  //generate orderlist and optionlist
  function template(options) {
    //generate orderlist and optionlist
    const rankList = `<li class="ranking-target"><input type="hidden" name="rank[${number}]" value=""></li>`;
    number++
    $(ol).append(rankList);
    const optionList = '<li><div draggable="true" data-id="<%= options.id %>">${ options.text }</div></li>';
    $(ul).append(optionList);
  }
  //
  // $(() => $.ajax({
  //     method: 'GET',
  //     url: '/vote/:id',
  //     data: "json"
  //   }).done(function () {
  //     makeRankingAndOptions(options);
  //   })
  // );
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
    //refresh the page
      $('#voteForm').reset();
    })

});
