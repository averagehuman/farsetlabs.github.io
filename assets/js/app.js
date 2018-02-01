/*
(function() {
  var captions = $('.carousel-caption'), caption;
  if (captions && captions.length && captions.length > 0) {
    $('.orbit-figure').each(function(idx) {
      if (idx < captions.length) {
        caption = captions[idx];
      } else {
        caption = captions[captions.length-1];
      }
      console.log(caption);
      $(this).append('<div class="orbit-caption"><div class="row">' + $(caption).html() + '</div></div>');
    });
  }
        
})();
*/
$(document).foundation();
