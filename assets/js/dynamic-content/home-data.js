import MarketingWebsite from '../early-man-apis.js';
import { cursorOnHover } from '../common.js';

const { getHome } = new MarketingWebsite();

let markup = '';
let portfolioMarkup = '';
const renderReelVideo = (reelVideo) => {
  markup = `<div class="video-banner">
    <div class="vc-lg-video-wrap video-animated">
      <div class="overlay-loader"></div>
      <video poster="${reelVideo.thumbnail_image}" muted={true} loop={true} autoplay={true}
        class="swipe-video hidden-vid">
        <source src="${reelVideo.video}">
        </source>
      </video>
    </div>
  </div>`;

  return markup;
};

const renderPortfolio = (portfolioVideo, index) => {
  portfolioMarkup =
    portfolioMarkup +
    `<div class="vc-lg-wrap wow slideInUp" data-wow-duration="1s">
  <div class="vc-lg on-scroll-play hover-lg full-play-video">
    <div class="vc-lg-video-wrap" data-index="${index}">
      <video poster="${
        portfolioVideo.thumbnail_image
      }" muted={true} loop={true} class="on-scroll-play-video" id="vd-1">
        <source src="${portfolioVideo.thumbnail_video}">
        </source>
      </video>
    </div>
  </div>
  <div class="vc-lg-info textslide wow slideInUp" data-wow-duration="1s">
    <div class="text-animate-wrap">
    ${
      portfolioVideo.category === 'Ad Film'
        ? `<label>${portfolioVideo.film_name} / ${portfolioVideo.brand_name}</label>`
        : `<label>${portfolioVideo.film_name} / ${portfolioVideo.type_of_content}</label>`
    }      
    </div>
  </div>
</div>`;

  return portfolioMarkup;
};

const videoModal = (player) => {
  // Double Click Full screen Mode False
  player.ready(function () {
    player.tech_.off('dblclick');
  });

  // close video modal by pressing close
  $('.video-modal-close a').on('click', function (e) {
    $('.video-modal').removeClass('active');
    $('body').removeClass('scroll-page-stop');
    $('.video-modal-credits a span').removeClass('active');
    $('.video-modal-content').removeClass('moveaside');
    $('.video-modal-credits-details').removeClass('active');
    $('.modal-overlay-loader').removeClass('active');
    $('.modal-overlay-loader').animate({ opacity: 1 });
    $('.video-js').addClass('hidden-vid');
    player.pause();
    player.load();
  });

  // open credits in video modal by pressing credits
  $('.video-modal-credits a').on('click', function (e) {
    $('.video-modal-credits a span').toggleClass('active');
    $('.video-modal-content').toggleClass('moveaside');
    $('.video-modal-credits-details').toggleClass('active');
    if ($(this).hasClass('active')) {
      player.play();
      $(this).removeClass('active');
    } else {
      player.pause();
      $(this).addClass('active');
    }
  });

  // close credits in video modal by pressing on credits list
  $('.video-modal-credits-details').on('click', function (e) {
    $('.video-modal-credits a span').toggleClass('active');
    $('.video-modal-content').toggleClass('moveaside');
    $('.video-modal-credits-details').toggleClass('active');
    if ($('.video-modal-credits a').hasClass('active')) {
      player.play();
      $('.video-modal-credits a').removeClass('active');
    } else {
      player.pause();
      $('.video-modal-credits a').addClass('active');
    }
  });

  // Onload
  $(window).load(function () {
    $('.page-wrapper').css('visibility', 'visible');
    $('.header-menu.page-loader').css('visibility', 'visible');
    $('.header-menu.page-loader ul li').addClass('loaded');
    $('.page-loader .ham-menu a').css('visibility', 'visible');
    $('.overlay-loader').addClass('active');
    setTimeout(function () {
      $('.overlay-loader').animate({ opacity: 0 });
      $('.swipe-video').removeClass('hidden-vid');
    }, 750);
    setTimeout(function () {
      $('body').removeClass('scroll-page-stop');
      $('.hamburger-menu-wrap.page-loader').css({ visibility: 'visible' });
      $('.page-loader .hamburger-menu-list .ham-menu').addClass('loaded');
    }, 500);
    $('#logo').attr('src', './assets/images/early_man_logo.svg');
    $('#logo').addClass('loaded');
    $('.vc-lg-content').removeClass('hide');
  });
};

(async () => {
  const {
    data: { show_reel, portfolio_video }
  } = await getHome();

  renderReelVideo(show_reel);

  document
    .querySelector('.video-banner-wrapper')
    .insertAdjacentHTML('beforeend', markup);

  portfolio_video.forEach((portfolio, index) =>
    renderPortfolio(portfolio, index)
  );

  document
    .querySelector('.vc-lg-content')
    .insertAdjacentHTML('beforeend', portfolioMarkup);

  // Cursor changed to play when hove over the video
  cursorOnHover();

  //  Video On scroll play
  $(window).on('scroll resize', function () {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var totalHeight = scroll + windowHeight;

    function playVideo() {
      var figure = $('.on-scroll-play.active');
      var vid = figure.find('video');
      vid.trigger('play');
    }

    function pauseVideo() {
      var onScrollVideo = $('.on-scroll-play');
      var inActiveVideo = onScrollVideo.find('video');
      inActiveVideo.trigger('pause');
      // inActiveVideo.trigger('load');
    }

    $('.vc-lg-wrap').each(function () {
      if (
        $(this).offset() !== undefined &&
        $(this).next().offset() !== undefined
      ) {
        if (
          totalHeight >= $(this).offset().top &&
          totalHeight <= $(this).next().offset().top
        ) {
          $('.on-scroll-play').removeClass('active');
          $(this).find('.on-scroll-play').addClass('active');
          pauseVideo();
          playVideo();
          return; //break the loop
        }
      }

      $('.vc-lg-wrap').each(function () {
        if ($(this).next().offset() !== undefined) {
          if (totalHeight < $(this).next().offset().top - 100) {
            $(this).find('.text-animate-wrap').addClass('on-scroll-hide');
          } else {
            $(this).find('.text-animate-wrap').removeClass('on-scroll-hide');
          }
        }
      });
    });
  });

  // Video modal Hide and show
  $('.full-play-video').on('click', function (e) {
    $('.video-modal-content').empty();
    let currentVideoIndex = $(this)
      .find('.vc-lg-video-wrap')
      .attr('data-index');

    const videoUrl = portfolio_video[currentVideoIndex].video;

    let videoModalMarkup = `<div class="video-modal-source">
                              <div class="modal-overlay-loader"></div>
                                <video id="my-player" class="video-js hidden-vid" controls preload="auto" data-setup='{}'>
                                  <source src="${videoUrl}" type="video/mp4">
                                  </source>
                                  <source src="${videoUrl}" type="video/webm">
                                  </source>
                                  <source src="${videoUrl}" type="video/ogg">
                                  </source>
                                </video>
                                <a class="video-nav-btn prev-btn">Prev</a>
                                <a class="video-nav-btn next-btn">Next</a>
                                <div class="video-modal-credits-mob hide">
                                  <a> credits <span>x</span> </a>
                                </div>
                              </div>
                            </div>`;

    document
      .querySelector('.video-modal-content')
      .insertAdjacentHTML('beforeend', videoModalMarkup);

    // initiate Player
    var player = videojs('my-player');

    $('.video-modal').addClass('active');
    $('body').addClass('scroll-page-stop');

    setTimeout(function () {
      $('.modal-overlay-loader').addClass('active');
    }, 500);
    setTimeout(function () {
      $('.modal-overlay-loader').animate({ opacity: 0 });
      $('.video-js').removeClass('hidden-vid');
    }, 1250);
    setTimeout(function () {
      console.log('player.play() called: ', player);
      player.play();
    }, 1250);

    videoModal(player);
  });
})();
