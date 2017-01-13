$(document).ready(function() {
  var $key = $('#key');
  var $submit = $('#submit');
  $submit.on('click', function(){
    var keyval = $key.value;
    alert(keyval);
  });
});
