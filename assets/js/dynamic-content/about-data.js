import MarketingWebsite from '../early-man-apis.js';
import { cursorOnHover, playVideoOnHover } from '../common.js';

const { getAbout } = new MarketingWebsite();

let markup = '';
let contentMarkup = '';
let productionMarkup = '';

let formatList = (str) => {
  let arr = str.split('_');
  arr = arr.map((item) => item.toUpperCase());
  return arr.join(' ');
};

const renderList = (item) => {
  markup =
    markup +
    `<li>
      <a href="#${item.split('_')[0]}" >
        <span class="video-back-link-icon">
          <img src="assets/images/arrow_back.svg">
        </span>                
      ${formatList(item)}
      </a>
    </li>`;
};

const renderContent = (content) => {
  contentMarkup = `
  <div class="screen_2 screen_res" id="awards">
    <div class="screen_header">
      <h5>awards</h5>
    </div>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.
    </p>
    <div class="logo_icon_wrap">
    ${content.awards
      .map(
        (award) =>
          `<div class="logo_icon">
          <div class="logo_icon_img">
            <img src="${award.image}" alt="Profile" />
          </div>
        </div>`
      )
      .join('')}
    </div>
  </div>`;

  contentMarkup =
    contentMarkup +
    `
  <div class="screen_3 screen_res" id="press">
    <div class="screen_header">
      <h5>press</h5>
    </div>
          <ul>
          ${content.press_releases
            .map(
              (press) =>
                `<li>
                <a target="_black" href="${press.link}">
                <label>${press.media_name}</label>
                <span>
                  ${press.title}
                  <span class="icon">
                    <img src="assets/images/diagonal-arrow.svg" />                    
                  </span>
                </span>
                </a>
              </li>`
            )
            .join('')}            
          </ul>
        </div>
  `;

  contentMarkup =
    contentMarkup +
    `
  <div class="screen_4 screen_res" id="production">
    <div class="screen_header">
      <h5>production services</h5>
    </div>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
      laborum.
    </p>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
      rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
      explicabo.
    </p>
    <a class="films_link">
      <label>
        SEE FILMS
        <span class="video-forward-link-icon">
          <span class="hr-span">
            <img src="./assets/images/arrow_front.svg">
          </span>
        </span>
      </label>              
    </a>
  </div>
  `;
};

const addContactList = () => {
  markup =
    markup +
    `<li>
      <a href="#contact">
        <span class="video-back-link-icon">
          <img src="assets/images/arrow_back.svg">
        </span>    
        CONTACT
      </a>
    </li>`;
};

const addContactDetails = () => {
  contentMarkup =
    contentMarkup +
    `
    <div class="screen_header">
        <h5>contact</h5>
    </div>
    <div class="screen_5 screen_res screen_last" id="contact">
      <div class="about_contact">
        <ul>
          <li>
            <label>EMAIL</label>
            <span>info@earlymanfilm.com</span>
          </li>
          <li>
            <label>CALL</label>
            <span>+91 22 2651 6274/75</span>
          </li>
        </ul>
      </div>
      <div class="about_address">
        <ul>
          <li>
            <label>VISIT</label>
            <span>101, Saturn </br>729 Palimala Road</br> Bandra (West)</br> Mumbai 400050</span>
            <a>
              <label>
                View in Google Maps
              </label>
              <span>
                <img src="assets/images/diagonal-arrow.svg" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>`;
};

const productionDetails = (service, index) => {
  productionMarkup =
    productionMarkup +
    `
    <div class="vc-sm-wrap wow production-resp ${
      productionMarkup === '' ? 'mg' : ''
    }" data-wow-duration="1s">
    ${
      productionMarkup === ''
        ? `<a class="screen_header production-header" href="${service.website}">
        <span class="video-back-link-icon">
          <img src="assets/images/arrow_back.svg" />
        </span>
        <h5>production services</h5>
        </a>`
        : ''
    }      
      <div class="vc-sm hover-sm hover-play">
        <div class="vc-sm-video-wrap">
          <video poster="${service.thumbnail_image}"
            muted={true} loop={true} class="lazy">
            <source
              src="${service.video}">
            </source>
          </video>
        </div>
      </div>
      <div class="vc-sm-info ${
        index === 0 ? 'onload-slide' : ''
      } textslide production-info wow slideInUp" data-wow-duration="1s">              
        <div class="text-animate-wrap with-para ${
          index === 0 ? 'on-load-hide' : ''
        }">
          <label>${service.type_of_content}</label>
          <p>
          ${service.name}
            <span>
              <img src="assets/images/diagonal-arrow.svg" />
            </span>
          </p>
        </div>
      </div>
    </div>`;
};

function onPageScroll() {
  var scrollPos = $(document).scrollTop();
  var st = window.pageYOffset || document.documentElement.scrollTop;

  $('.video-list-options li a').each(function () {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));
    if ($('.ab').hasClass('active')) {
      if (st > lastScrollTop) {
        if (
          refElement.position().top <= scrollPos + 350 &&
          refElement.position().top + refElement.height() > scrollPos + 350
        ) {
          $('.video-list-options li a').removeClass('active');
          currLink.addClass('active');
        }
      } else {
        if (
          refElement.position().top <= scrollPos - 200 &&
          refElement.position().top + refElement.height() > scrollPos - 200
        ) {
          $('.video-list-options li a').removeClass('active');
          currLink.addClass('active');
        }
      }
    }
  });
}

const handelClick = () => {
  //smoothscroll section
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
    var prevElemHeight = $(target[0].previousElementSibling).height();
    var topHeight = document.querySelector('.content-options-slide').offsetTop;

    if (!prevElemHeight) {
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
    } else {
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - topHeight
          },
          1200,
          'swing',
          function () {
            window.location.hash = target.offset().top - topHeight;
            $(document).on('scroll', onPageScroll);
          }
        );
    }
  });
};

const seeFlimsClick = () => {
  $('html, body')
    .stop()
    .animate(
      {
        scrollTop: 0
      },
      0,
      'swing',
      function () {
        window.location.hash = 0;
        $(document).on('scroll', onPageScroll);
      }
    );
  $('.ab').css('opacity', '0');
  $('.ab').removeClass('active');
  $('.content-options-slide.tab-hide')
    .removeClass('active')
    .removeClass('scroll');
  $('.product-page .pd').addClass('active');
  $('.icon').addClass('active');
  $('.about-header').removeClass('active');
  $('.prod-header').addClass('active');

  if ($(window).width() <= 991 && $(window).width() > 767) {
    $('.hamburger-menu-wrap').removeClass('about');
  }

  setTimeout(function () {
    $('.onload-slide .text-animate-wrap').removeClass('on-load-hide');
  }, 1000);
};

(async () => {
  const { data } = await getAbout();

  const listItems = Object.keys(data);

  listItems.forEach((list) => renderList(list));

  renderContent(data);

  addContactList();

  document
    .querySelector('.video-list-options')
    .insertAdjacentHTML('beforeend', markup);

  handelClick();
  addContactDetails();

  document
    .querySelector('.screen')
    .insertAdjacentHTML('beforeend', contentMarkup);

  $('.films_link').on('click', function (e) {
    seeFlimsClick();

    data.production_services.map((service, index) =>
      productionDetails(service, index)
    );

    document
      .querySelector('.vc-sm-content')
      .insertAdjacentHTML('beforeend', productionMarkup);

    // Cursor changed to play when hove over the video
    cursorOnHover();

    // On hover play video
    playVideoOnHover();

    // initiate Player
    var player = videojs('my-player');

    // Video modal Hide and show
    $('.vc-sm').on('click', function (e) {
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

    $('.tab-hide ul li').on('click', function (e) {
      if (!$('.ab').hasClass('active')) {
        setTimeout(function () {
          $('.ab').css('opacity', '1');
        }, 750);
        $('.onload-slide .text-animate-wrap').addClass('on-load-hide');
        $('.ab').addClass('active');
        $('.content-options-slide.tab-hide')
          .addClass('active')
          .addClass('scroll');
        $('.product-page .pd').removeClass('active');
        $('.icon').removeClass('active');
        $('.about-header').addClass('active');
        $('.prod-header').removeClass('active');

        var target = $(this)[0].children[0].hash;
        target = $(target);
        $('html, body')
          .stop()
          .animate(
            {
              scrollTop: target.position().top
            },
            0,
            'swing',
            function () {
              window.location.hash = target.position().top;
              $(document).on('scroll', onPageScroll);
            }
          );
      }
    });
  });

  var topHeight = document.querySelector('.content-options-slide').offsetTop;
  topHeight = topHeight + 50;
  $('#contact').css('height', '100vh').css('height', `-=${topHeight}px`);
})();
