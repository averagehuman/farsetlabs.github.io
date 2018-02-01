
$(document).ready(function() {

  // Foundation initialisation
  $(document).foundation();

  // Flexslider - add captions dynamically
  (function() {
    var captions = $('.carousel-caption'), caption;
    if (captions && captions.length && captions.length > 0) {
      $('.flexslider .slides > li').each(function(idx) {
        if (idx < captions.length) {
          caption = captions[idx];
        } else {
          caption = captions[captions.length-1];
        }
        console.log(caption);
        $(this).append('<div class="flex-caption"><div class="row">' + $(caption).html() + '</div></div>');
      });
    }
          
  })();

  // Flexslider initialisation
  $('.flexslider').flexslider({
    animation: "fade",
    controlNav: false,
    directionNav: true,
    slideshowSpeed: 8000,
    animationSpeed: 800,
    touch: true
  });
});

