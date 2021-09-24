// Hide Header on on scroll down
var didScroll;
var lastScrollTop = $(window).scrollTop();;
var delta = 5;
var navbarHeight = $('#header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
});

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    if ($(window).width() < 991 && $(window).width() > 767) {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
            $('#header').slideDown("fast");
            $('.video-options-slide.left').css("top", "120px");
            $(".content-options-slide.right").css("top", "120px");
        } else{
            if (st > lastScrollTop ){
                // Scroll UP
                $('#header').slideUp("fast");
                $(".content-options-slide.right").css("top", "0px");
                $('.video-options-slide.left').css("top", "0px");
            } else {
                // Scroll Down
                $('#header').slideDown("fast");
                $('.video-options-slide.left').css("top", "120px");
                $(".content-options-slide.right").css("top", "120px");
            }
        }
  }else if($(window).width() < 767){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
        $('#header').slideDown("fast");
        $('.video-options-slide.left').css("top", "87px");
        $(".content-options-slide.right").css("top", "87px");
    } else{
        if (st > lastScrollTop ){
            // Scroll UP
            $('#header').slideUp("fast");
            $(".content-options-slide.right").css("top", "0px");
            $('.video-options-slide.left').css("top", "0px");
        } else {
            // Scroll Down
            $('#header').slideDown("fast");
            $('.video-options-slide.left').css("top", "87px");
            $(".content-options-slide.right").css("top", "87px");
        }
    }
  }
    
    lastScrollTop = st;
}