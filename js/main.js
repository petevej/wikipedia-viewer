var $key = $('#key');                   // cache input field to DOM
var $search = $('#search');             // cache form to DOM
var $results = $('#results');           // cache results to DOM

$(document).ready(function() {          // upon page fully loaded
  $search.on('submit', function(e){     // upon search form being submitted
    e.preventDefault();                 // prevents the form from being submitted by default
    var searchTerm = $('input:text').val(); // cache text value of input form to DOM
    if(searchTerm.length === 0 || searchTerm.match(/^\s+$/)) {        // if nothing is entered or all white space then alert and exit
      alert('Please enter some valid keywords!');
      return;
    }
    // AJAX query for reaching wikipedia
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?";
    $.ajax({
      type: 'GET',
      url: url,                   // url for jsonp connection
      timeout: 2000,              // 2 second timeout
      dataType: 'json',           // can use json since callback is specified in url
      beforeSend: function() {
        $search.append('<div id="load">Searching...</div>');
      },
      complete: function() {
        $('#load').remove();
      },
      success: function(data) {
        var $listGroupItem = $('.list-group-item');    // cache results list to DOM
        var $listGroup = $('div.list-group');          // cache list group to DOM
        $listGroup.remove();                           // clear list group
        $listGroupItem.remove();                       // clear items
        $results.prepend('<div class="list-group">' +
                          '<h4>Top 10 Wikipedia Search Results for <em>' + searchTerm + '</em>:</h4>');
        // loop through and append top 10 results
        for(var i = 0; i < 10; i++) {
            $results.append('<a href="' + data[3][i] + '"target="_blank" class="list-group-item list-group-item-action"><strong>' + data[1][i] + '</strong><br>' + data[2][i] + '<br></a>').hide().delay(i * 100).fadeIn();
        }
        $results.append('</div>');
      },
      fail: function() {
        alert('Please check connection and try again!');
      }

    });
  });
});
