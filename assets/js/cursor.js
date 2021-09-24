// Cursor js
if ($(window).width() > 991) {
  var cursor = $('.cursor');

  $(window).mousemove(function (e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2
    });
  });

  $(window)
    .mouseleave(function () {
      cursor.css({
        opacity: '0'
      });
    })
    .mouseenter(function () {
      cursor.css({
        opacity: '1'
      });
    });
}
