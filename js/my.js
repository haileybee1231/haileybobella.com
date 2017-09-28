$(document).ready(function() {
  $(function() {
    $('#Cassie-wrapper').click(function() {
      if ($('#Cassie').hasClass('off')) {
        $('#Cassie').fadeIn('slow');
        $('#Cassie').toggleClass('off');
      } else {
        $('#Cassie').fadeOut('slow');
        $('#Cassie').toggleClass('off');
      }
    });
  });

});
