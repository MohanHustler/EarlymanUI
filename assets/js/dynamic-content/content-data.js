import MarketingWebsite from '../early-man-apis.js';
import { cursorOnHover, playVideoOnHover } from '../common.js';

const { getContent } = new MarketingWebsite();

let markup = '';
let contentMarkup = '';

const renderContent = (content) => {
  let type = content.name.toLowerCase();

  let id;

  if (type === 'documentaries') {
    id = 'documentary-film';
  } else if (type === 'shorts') {
    id = 'short-film';
  }
  markup =
    markup +
    `<li>
      <a class="${markup === '' ? 'active' : ''}" href="#${id}">      
      ${content.name}
      </a>
    </li>`;

  content.ContentVideos.forEach((videos) => {
    contentMarkup =
      contentMarkup +
      `<div class="vc-lg-wrap ${type} ${
        contentMarkup === '' ? 'topcard mg' : 'wow slideInUp'
      }" id="${id}" data-wow-duration="1s">
      <div class="vc-lg on-scroll-play hover-play hover-lg ${
        contentMarkup === '' ? 'video-animated-wrap' : ''
      }">
        <div class="vc-lg-video-wrap ${
          contentMarkup === '' ? 'video-animated' : ''
        }">
          <video poster="${videos.thumbnail_image}"
            muted={true} loop={true} class="lazy ${
              contentMarkup === '' ? 'swipe-video hidden-vid' : ''
            }"  ${contentMarkup === '' ? 'autoplay' : ''}>
            <source src="${videos.thumbnail_video}">
            </source>
          </video>
        </div>
      </div>
      <div class="vc-lg-info textslide ${
        contentMarkup === '' ? 'onload-slide' : 'wow slideInUp'
      }" data-wow-duration="1s">
        <div class="text-animate-wrap with-para ${
          contentMarkup === '' ? 'on-load-hide' : ''
        }">
          <label>${content.name}</label>
          <p>${videos.film_name} / DIRECTED BY ${videos.director_name}</p>
        </div>
      </div>
    </div>`;
  });
};

function onPageScroll() {
  var scrollPos = $(document).scrollTop();

  $('.video-list-options li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));

    if (refElement.position().top <= scrollPos + 200) {
      $('.video-list-options li a').removeClass('active');
      currLink.addClass('active');
    }
  });
}

(async () => {
  const { data } = await getContent();

  data.forEach((content) => renderContent(content));

  document
    .querySelector('.video-list-options')
    .insertAdjacentHTML('beforeend', markup);

  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $(document).off('scroll');

    $('a').each(function () {
      $(this).removeClass('active');
    });
    $(this).addClass('active');

    var target = this.hash,
      menu = target;
    target = $(target);

    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: target.position().top
        },
        1200,
        'swing',
        function () {
          window.location.hash = target.position().top;
          $(document).on('scroll', onPageScroll);
        }
      );
  });

  contentMarkup =
    `<div class="content-wrap-overlay hide"></div>` +
    contentMarkup +
    `<div class="load-videos">
        <label>
          show more +
        </label>
      </div>`;

  document
    .querySelector('.vc-sm-content')
    .insertAdjacentHTML('beforeend', contentMarkup);

  // Cursor changed to play when hove over the video
  cursorOnHover();

  // On hover play video
  playVideoOnHover();

  // initiate Player
  var player = videojs('my-player');

  // Video modal Hide and show
  $('.vc-lg').on('click', function (e) {
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
      player.play();
    }, 1250);
  });
})();
