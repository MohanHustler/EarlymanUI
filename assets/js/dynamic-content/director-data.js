import MarketingWebsite from '../early-man-apis.js';
import { cursorOnHover, playVideoOnHover } from '../common.js';
import { startVideoBanner } from '../video-slider.js';

const { getDirector } = new MarketingWebsite();

let markup = '';
let videoMarkup = '';
let fullVideoMarkup = '';
let allVideoMarkup = '';
let profileMarkup = '';
const renderDirectorList = (directorList, index) => {
  markup =
    markup +
    `
  <li class="${markup === '' ? 'active' : ''}"
  data-url="${directorList.reel_video}"
  data-poster="${directorList.profile_pic}"
  id="videoList-${index}">
  <label>
    <span class="video-back-link-icon">
      <img src="assets/images/arrow_back.svg">
    </span>
    ${directorList.name}
    <span class="video-forward-link-icon">
      <span class="hr-span">
        <img src="assets/images/arrow_front.svg">
      </span>
    </span>
  </label>
</li>`;

  videoMarkup =
    videoMarkup +
    `
<div class="slide_1-video-container video-animated overlay-vid ${
      videoMarkup === '' ? 'active' : ''
    }">
  <video poster="${directorList.profile_pic}"
    muted={true} id="videoSlide${
      index + 1
    }" autoplay class="swipe-video hidden-opa">
    <source
      src="${directorList.reel_video}"
      id="videoSlideSource">
    </source>
  </video>
</div>
`;
};

const renderDirectorVideos = (directorVideo) => {
  const { DirectorVideos } = directorVideo;
  if (DirectorVideos.length) {
    fullVideoMarkup = `
    <div class="director-vc-lg-wrap">
      <div class="director-vc-lg hover-lg video-animated">
        <div class="d2-overlay-loader-mob">
        </div>
        <div class="director-vc-lg-video video-animated">
          <div class="d2-overlay-loader">
          </div>
          <video poster="${DirectorVideos[0].thumbnail_image}"
            muted={true} loop={true} class="lazy swipe-video-2 hidden-vid" autoplay={true}>
            <source
              src="${DirectorVideos[0].video}">
            </source>
          </video>
        </div>
      </div>
      <div class="director-vc-lg-info textslide onload-slide">
        <div class="text-animate-wrap on-scroll-hide">
          <label>${DirectorVideos[0].film_name} / ${DirectorVideos[0].brand_name}</label>
        </div>
      </div>
    </div>`;
  } else {
    // if there is no director details video
    fullVideoMarkup = `
    <div class="director-vc-lg-wrap">
      <div class="director-vc-lg">
        <div class="director-vc-lg-video">          
        </div>
      </div>      
    </div>`;
  }

  DirectorVideos &&
    DirectorVideos.forEach((videos) => {
      allVideoMarkup =
        allVideoMarkup +
        `
    <div class="vc-sm-wrap wow slideInUp" data-wow-duration="1s">
      <div class="vc-sm hover-sm hover-play">
        <div class="vc-sm-video-wrap">
          <video poster="${videos.thumbnail_image}"
            muted={true} loop={true} class="lazy">
            <source
              src="${videos.thumbnail_video}">
            </source>
          </video>
        </div>
      </div>
      <div class="vc-sm-info textslide wow slideInUp" data-wow-duration="1s">
        <div class="text-animate-wrap">
          <label>${videos.film_name} / ${videos.brand_name}</label>
        </div>
      </div>
    </div>
    `;
    });
};

const renderProfile = (director) => {
  profileMarkup = `<div class="directors-bottom-wrap web">
                    <div class="directors-bottom">
                      <div class="directors-bottom-content ">
                        <p>${director.bio}</p>                  
                      </div>
                      <div class="directors-bottom-img-section">
                        <div class="directors-bottom-img">
                          <div class="bio-overlay">
                          </div>
                          <img src="${director.profile_pic}" />
                        </div>
                      </div>
                    </div>
                  </div>`;
};

const closeActiveDirector = () => {
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
};

(async () => {
  const { data } = await getDirector();

  data.map((directorList, index) => renderDirectorList(directorList, index));

  document
    .querySelector('.video-list-options')
    .insertAdjacentHTML('beforeend', markup);

  document
    .querySelector('.video-wrap')
    .insertAdjacentHTML('beforeend', videoMarkup);

  $('.video-list-options li').on('click', function (e) {
    $('.vc-sm-content').empty();
    $('.director-vc-lg-content').empty();
    $('.directors-bottom-wrap').remove();
    $('#progressTrack').width('0%');

    let id = $(this)[0].id.split('-')[1];
    renderDirectorVideos(data[id]);

    document
      .querySelector('.director-vc-lg-content')
      .insertAdjacentHTML('beforeend', fullVideoMarkup);

    if (allVideoMarkup) {
      allVideoMarkup =
        allVideoMarkup +
        `<div class="load-videos">
        <label>
          show more +
        </label>
       </div>`;
    }

    document
      .querySelector('.vc-sm-content')
      .insertAdjacentHTML('beforeend', allVideoMarkup);

    renderProfile(data[id]);

    document
      .querySelector('.slide_2')
      .insertAdjacentHTML('beforeend', profileMarkup);

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

    fullVideoMarkup = '';
    allVideoMarkup = '';
    profileMarkup = '';
  });

  closeActiveDirector();

  if ($(window).width() > 767) {
    startVideoBanner();
  } else {
    $('.video-list-options #videoList-0').toggleClass('active');
  }
})();
