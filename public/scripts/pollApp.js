$(function() {
    const emp = [];
    $('#list-group').children('#list-group-item').sort(function(a, b) {
        return $(b).val() - $(a).val();
    }).appendTo('#list-group');

});

