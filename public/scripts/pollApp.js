$(function() {

    function toggleForm() {

    }



    function getResults() {
        $.ajax({
            url: '/create',
            method: 'GET'
        }).done()
    }


    $('#update').click(function(event) {
        event.preventDefault();
        $('#results').toggle('fast false', function(){
            
        })


    });






})