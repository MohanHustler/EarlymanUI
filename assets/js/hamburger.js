// Ham menu click event
$(".hamburger-menu-wrap").click(function () {
  $(this).toggleClass("active");
  $(".ham-close").toggleClass("active");

  // Ham menu click move page
  if ($(window).width() > 991) {
    if ($(this).hasClass("active")) {
      $(".page").addClass("moveaside");
      $(".video-options-slide.right").addClass("moveaside");
      $(".content-options-slide.right.scroll").addClass("moveaside");
    } else {
      $(".page").removeClass("moveaside");
      $(".video-options-slide.right").removeClass("moveaside");
      $(".content-options-slide.right.scroll").removeClass("moveaside");
    }
    $(".slide_1").addClass("scrollStop");
    $("body").toggleClass("scroll-page-stop");
  }
});

// On click outside ham menu close
$(document).click(function (event) {
  if (!$(event.target).closest(".hamburger-menu-wrap").length) {
    $(".hamburger-menu-wrap").removeClass("active");
    $(".ham-close").removeClass("active");
  }

  // Ham menu click move page
  if ($(window).width() > 991) {
    if ($(".hamburger-menu-wrap").hasClass("active")) {
      $(".page").addClass("moveaside");
      $(".video-options-slide.right").addClass("moveaside");
      $(".content-options-slide.right.scroll").addClass("moveaside");
      $("body").addClass("scroll-page-stop");
    } else {
      $(".page").removeClass("moveaside");
      $(".video-options-slide.right").removeClass("moveaside");
      $(".content-options-slide.right.scroll").removeClass("moveaside");
      $("body").removeClass("scroll-page-stop");
    }
  }
});

// On scroll close ham menu
window.addEventListener("scroll", function (e) {
  $("#ham-menu").removeClass("active");
});
