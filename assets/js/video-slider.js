function onVideoListHover(videos, index) {
  let videoContainer = document.querySelector('.video-slide .active');
  let currentVideo = $('.video-slide .active').find('video')[0];

  if ($(currentVideo).is('video')) {
    currentVideo.pause();
  }

  videoContainer.classList.toggle('active');

  var list = document.querySelectorAll('.video-list ul li label');
  for (var i = 0; i < list.length; i++) {
    list[i].classList.remove('active-label');
  }
  var listItem = document.querySelectorAll('.video-list ul li');
  for (var i = 0; i < listItem.length; i++) {
    listItem[i].classList.remove('active');
  }

  videos[index].classList.toggle('active');
  $(videos[index]).find('video')[0].preload = 'auto';
  $(videos[index]).find('video')[0].play();
}

function timeUpdateEvent(nextLoaded, nextVideo, index) {
  var videoTime = ($(this).currentTime / $(this).duration) * 100;

  if (videoTime >= 70 && nextLoaded === false) {
    nextVideo.preload = 'auto';
    nextVideo.load();
    nextLoaded = true;
  }

  $('.progress-track').attr('id', 'progressTrack-' + index + '');
  $('.progress-track').css('transition', '0.05s linear');
}

function listingPageAnimation() {
  $('.slide_1').toggleClass('left');
  $('.slide_2').toggleClass('right');
  $('.video-options-slide').toggleClass('right');
  $('.video-options-slide').toggleClass('left');
  $('.video-options-slide .video-list').toggleClass('hide');
  $('.video-options-slide .video-list-2').toggleClass('hide');
  // $(".slide_1").toggleClass("fixed");
}

function listingPageAnimation2() {
  $('.slide_1').toggleClass('left');
  $('.slide_2').toggleClass('right');
  $('.video-options-slide').toggleClass('right');
  $('.video-options-slide').toggleClass('left');
  setTimeout(function () {
    $('.video-options-slide .video-list').toggleClass('hide');
    $('.video-options-slide .video-list-2').toggleClass('hide');
  }, 1500);
  // $(".slide_1").toggleClass("fixed");
}

export function startVideoBanner() {
  var videos = $('.slide_1-video-container');
  var clicked = 0;

  var activeDirector = document.querySelector('.active-director label');

  $('.video-list-options li').on('click', function (e) {
    activeDirector.innerText = $(this)[0].innerText;
    listingPageAnimation();
    $('.slide_1-video-container.active').find('video')[0].pause();
    if ($(window).width() <= 991 && $(window).width() >= 768) {
      console.log('clicked ipad');
      $('.director-slider-wrapper').removeClass('fixed-overflow');
      setTimeout(function () {
        $('.d2-overlay-loader').addClass('active');
        $('.swipe-video').addClass('hidden-opa');
        $('.overlay-vid').removeClass('start');
        $('.overlay-vid').removeClass('hide-opa');
      }, 1500);
      setTimeout(function () {
        $('.d2-overlay-loader').animate({ opacity: 0 });
        $('.swipe-video-2').removeClass('hidden-vid');
      }, 2250);
    } else {
      console.log('clicked Desk');
      setTimeout(function () {
        $('.d2-overlay-loader').addClass('active');
        $('.swipe-video').addClass('hidden-opa');
        $('.overlay-vid').removeClass('start');
        $('.overlay-vid').removeClass('hide-opa');
        $('.director-slider-wrapper').removeClass('fixed-overflow');
      }, 750);
      setTimeout(function () {
        $('.d2-overlay-loader').animate({ opacity: 0 });
        $('.swipe-video-2').removeClass('hidden-vid');
      }, 1500);
    }
  });

  $('.active-director').on('click', function (e) {
    if ($(window).width() <= 991 && $(window).width() >= 768) {
      listingPageAnimation2();
      setTimeout(function () {
        $('.slide_1-video-container.active').find('video')[0].play();
        $('.directors-bottom-wrap.mob').addClass('hide');
        $('.video-options-slide').removeClass('active');
      }, 1500);

      $('.director-slider-wrapper').removeClass('fixed-overflow');
      setTimeout(function () {
        $('.overlay-vid').addClass('start');
        $('.swipe-video-2').addClass('hidden-vid');
        $('.d2-overlay-loader').removeClass('active');
        $('.d2-overlay-loader-mob').removeClass('active');
        $('.d2-overlay-loader').animate({ opacity: 1 });
        $('.d2-overlay-loader-mob').animate({ opacity: 1 });
      }, 1500);
      setTimeout(function () {
        $('.overlay-vid').addClass('hide-opa');
        $('.swipe-video').removeClass('hidden-opa');
      }, 2250);
    } else {
      listingPageAnimation();
      $('.slide_1-video-container.active').find('video')[0].play();
      $('.directors-bottom-wrap.mob').addClass('hide');
      $('.video-options-slide').removeClass('active');

      $('.director-slider-wrapper').addClass('fixed-overflow');
      setTimeout(function () {
        $('.overlay-vid').addClass('start');
        $('.swipe-video-2').addClass('hidden-vid');
        $('.d2-overlay-loader').removeClass('active');
        $('.d2-overlay-loader-mob').removeClass('active');
        $('.d2-overlay-loader').animate({ opacity: 1 });
        $('.d2-overlay-loader-mob').animate({ opacity: 1 });
      }, 750);
      setTimeout(function () {
        $('.overlay-vid').addClass('hide-opa');
        $('.swipe-video').removeClass('hidden-opa');
      }, 1500);
    }
  });

  videos.each(function (index) {
    var video = $(this).find('video'),
      nextVideo,
      videoBar;

    if (index !== videos.length - 1) {
      nextVideo = $(this).next('.slide_1-video-container').find('video');
    } else {
      nextVideo = videos.first().find('video');
    }

    if (index === 0) {
      video.parents('.slide_1-video-container').addClass('active');
      video[0].preload = 'auto';
      video[0].play();
    }

    document
      .querySelector(`#videoList-${index}`)
      .addEventListener('mouseenter', () => onVideoListHover(videos, index));

    var nextLoaded = false;

    $(video).on('timeupdate', () =>
      timeUpdateEvent(nextLoaded, nextVideo, index)
    );

    function updateProgressAuto(video) {
      var videoPercent = (video[0].currentTime / video[0].duration) * 100;
      var videoBar = $('#progressTrack-' + index + '');
      videoBar.css('width', videoPercent + '%');
    }
    function timeInterval() {
      updateProgressAuto(video);
    }
    var timer = setInterval(timeInterval, 100);

    video[0].onplay = function () {
      $('#videoList-' + index + '').addClass('active');
      $(`#videoList-${index} label`).addClass('active-label');
    };

    video[0].onended = function () {
      nextVideo.parents('.slide_1-video-container').addClass('active');
      video.parents('.slide_1-video-container').removeClass('active');
      nextVideo[0].play();
      $('.video-options-slide.right ul li').removeClass('active');
      $(`#videoList-${index} label`).removeClass('active-label');
    };
  });
}

if ($(window).width() > 767) {
  startVideoBanner();
} else {
  $('.video-list-options #videoList-0').toggleClass('active');

  var activeDirector = document.querySelector('.active-director label');

  $('.video-list-options li').on('click', function (e) {
    activeDirector.innerText = $(this)[0].innerText;
    listingPageAnimation();
    $('.slide_1-video-container.active').find('video')[0].pause();
    $('.director-slider-wrapper').removeClass('fixed-overflow');
    // $('.video-list-options li').removeClass('active');
    // $(this).toggleClass('active');
    setTimeout(function () {
      $('.director-slider-wrapper').css('position', 'relative');
    }, 750);
    console.log('clicked mob');
    setTimeout(function () {
      $('.d2-overlay-loader-mob').addClass('active');
      $('.swipe-video').addClass('hidden-opa');
      $('.overlay-vid').removeClass('start');
      $('.overlay-vid').removeClass('hide-opa');
    }, 750);
    setTimeout(function () {
      $('.d2-overlay-loader-mob').animate({ opacity: 0 });
      $('.swipe-video-2').removeClass('hidden-vid');
      $('.onload-slide .text-animate-wrap').removeClass('on-load-hide');
    }, 1500);
  });

  $('.active-director').on('click', function (e) {
    listingPageAnimation();
    $('.director-slider-wrapper').removeClass('fixed-overflow');
    $('.video-options-slide').removeClass('active');
    $('.slide_1-video-container.active').find('video')[0].play();
    $('.director-slider-wrapper').css('position', 'fixed');
    $('.bioplus').removeClass('hide');
    $('.bioclose').addClass('hide');
    $('.directors-bottom-wrap.mob').addClass('hide');
    $('.slide_2').removeClass('stop-move');
    $('body').removeClass('scroll-stop');
    console.log('clicked mob');
    setTimeout(function () {
      $('.overlay-vid').addClass('start');
      $('.swipe-video-2').addClass('hidden-vid');
      $('.d2-overlay-loader-mob').removeClass('active');
      $('.d2-overlay-loader-mob').animate({ opacity: 1 });
      $('.onload-slide .text-animate-wrap').addClass('on-load-hide');
    }, 750);
    setTimeout(function () {
      $('.overlay-vid').addClass('hide-opa');
      $('.swipe-video').removeClass('hidden-opa');
    }, 1500);
  });
}

if ($(window).width() <= 1024 && $(window).width() > 992) {
  $('.video-list-options li').on('click', function (e) {
    $('.slider-wrapper').addClass('height-overflow');
    $('.video-container').css('display', 'block');
    setTimeout(function () {
      $('.slider-wrapper').removeClass('height-overflow');
    }, 750);
    $('.director-slider-wrapper').removeClass('fixed-overflow');
    setTimeout(function () {
      $('.onload-slide .text-animate-wrap').removeClass('on-load-hide');
    }, 1000);
  });
  $('.active-director').on('click', function (e) {
    setTimeout(function () {
      $('.slider-wrapper').addClass('height-overflow');
      $('.video-container').css('display', 'none');
      $('.onload-slide .text-animate-wrap').addClass('on-load-hide');
    }, 750);
    $('.director-slider-wrapper').removeClass('fixed-overflow');
  });
}

if ($(window).width() <= 991 && $(window).width() >= 768) {
  $('.video-list-options li').on('click', function (e) {
    $('.slider-wrapper').addClass('height-overflow');
    setTimeout(function () {
      $('.slider-wrapper').removeClass('height-overflow');
    }, 750);
    setTimeout(function () {
      $('.onload-slide .text-animate-wrap').removeClass('on-load-hide');
    }, 1750);
  });
  $('.active-director').on('click', function (e) {
    setTimeout(function () {
      $('.slider-wrapper').addClass('height-overflow');
      $('.onload-slide .text-animate-wrap').addClass('on-load-hide');
    }, 750);
    $('.bioplus').removeClass('hide');
    $('.bioclose').addClass('hide');
    $('.directors-bottom-wrap.mob').addClass('hide');
    $('body').removeClass('scroll-stop');
  });
}
