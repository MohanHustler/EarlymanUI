export function cursorOnHover() {
  var hoverPlayLg = $('.hover-lg');
  var hoverPlaySm = $('.hover-sm');

  hoverPlayLg
    .mouseenter(function () {
      cursor.addClass('hover-lg-active');
    })
    .mouseleave(function () {
      cursor.removeClass('hover-lg-active');
    });

  hoverPlaySm
    .mouseenter(function () {
      cursor.addClass('hover-sm-active');
    })
    .mouseleave(function () {
      cursor.removeClass('hover-sm-active');
    });
}

export function playVideoOnHover() {
  // On hover play video
  var figure = $('.hover-play');
  var vid = figure.find('video');

  [].forEach.call(figure, function (item, index) {
    item.addEventListener('mouseover', hoverVideo.bind(item, index), false);
    item.addEventListener('mouseout', hideVideo.bind(item, index), false);
  });

  function hoverVideo(index, e) {
    vid[index].play();
  }

  function hideVideo(index, e) {
    vid[index].pause();
    vid[index].load();
  }
}
