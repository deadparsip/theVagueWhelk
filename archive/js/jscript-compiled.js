var Calippo, trouser;

Calippo = function() {
  var $h, $helper, $next, $prev, cakes, getSizes, init, loc, nextItem, prevItem, width;
  cakes = $h = width = $next = $prev = $boxes =0;
  $helper = $('.helper');
  if (window.location.href.indexOf('poetry') > 0) {
    loc = 'poetry';
  } else if (window.location.href.indexOf('news') > 0) {
    loc = 'new';
  } else if (window.location.href.indexOf('bio') > 0) {
    loc = 'bio';
  } else if (window.location.href.indexOf('stories') > 0) {
    loc = 'stories';
  } else if (window.location.href.indexOf('about') > 0) {
    loc = 'about';
  }
  init = function(loc) {
    var $, $b, $botty, $boxes, $d, $istouchdevice, $w, box, height, l, match, timer;
    $istouchdevice = typeof window.ontouchstart !== 'undefined';
    $ = jQuery;
    $d = $(document);
    $w = $(window);
    $b = $('body');
    width = $w.width();
    height = $w.height();
    $next = $('a.next');
    $prev = $('a.prev');
    $botty = $('#botty');
    $boxes = $('.boxes');
    timer = 1;
    $b.css({
      'width': width,
      'height': height
    });
    l = localStorage;
    $botty.bind('click', (function(_this) {
      return function(event) {
        return $(_this).addClass("upIt");
      };
    })(this));
    $botty.bind('mouseout', (function(_this) {
      return function(event) {
        return $(_this).removeClass("upIt");
      };
    })(this));
    l.setItem('width', width);
    if (window.location.hash !== "") {
      l.setItem('box' + loc, window.location.hash.replace('#', '').toLowerCase());
    }
    box = l.getItem('box' + loc);
    match = false;
    if (box !== null) {
      $boxes.each(function(i) {
        $(this).show().addClass('fadeInRightBig visible');
        cakes = $(this);
        match = true;
        if (i > 0) {
          return $prev.removeClass('opac');
        }
      });
      if (match = false) {
        cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig');
        window.localStorage.setItem('box' + loc, cakes.find('h2').text());
      }
    } else {
      cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig');
      window.localStorage.setItem('box' + loc, cakes.find('h2').text());
    }
    $next.on('click', nextItem);
    $prev.on('click', prevItem);
    $boxes.on("swiperight", prevItem);
    $boxes.on("swipeleft", nextItem);
    $w.on('resize', function(event) {
      clearTimeout(timer);
      return timer = setTimeout(getSizes, 200);
    });
    if ($istouchdevice) {
      $('.helper').show();
      return setTimeout((function() {
        return $helper.fadeOut(500);
      }), 3000);
    }
  };
  nextItem = function(e) {
    e.preventDefault();
    window.location.hash = "";
    if (cakes.next('.boxes').length) {
      cakes.removeClass('fadeInLeftBig fadeInRightBig');
      cakes.addClass('fadeOutLeftBig');
      cakes.on('animationend webkitAnimationEnd', function() {
        window.location.hash = "";
        cakes = $(this).next();
        l.setItem('box' + loc, cakes.find('h2').text());
        $(this).hide().removeClass('fadeOutLeftBig');
        $(this).off('animationend webkitAnimationEnd');
        $(this).next('.boxes').show().addClass('fadeInRightBig');
        if (!cakes.next('.boxes').length) {
          return $next.addClass('opac');
        }
      });
      return $prev.removeClass('opac');
    }
  };
  prevItem = function(e) {
    e.preventDefault();
    window.location.hash = "";
    if (cakes.prev('.boxes').length) {
      cakes.removeClass('fadeInLeftBig fadeInRightBig');
      cakes.addClass('fadeOutRightBig');
      cakes.on('animationend webkitAnimationEnd', function() {
        cakes = $(this).prev();
        l.setItem('box' + loc, cakes.find('h2').text());
        $(this).hide().removeClass('fadeOutRightBig');
        $(this).off('animationend webkitAnimationEnd');
        $(this).prev('.boxes').show().addClass('fadeInLeftBig');
        if (!cakes.prev('.boxes').length) {
          return $prev.addClass('opac');
        }
      });
      return $next.removeClass('opac');
    }
  };
  getSizes = function() {
    var w;
    width = $w.width().toString();
    w = l.getItem('width');
    if (w !== null && w !== width || (w = null)) {
      l.setItem('widths', width);
      return window.location.reload();
    }
  };
  return {
    init: init
  };
};

trouser = new Calippo();