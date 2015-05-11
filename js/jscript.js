function Calippo() {

    var cakes, $w, $h, $d, $b, width, $next, $prev, $boxes, $helper = $('.helper'); // Closures stole my hamsters and returned them shaven

    var loc = window.location.href.indexOf('poetry') > 0 ? 'poetry' : window.location.href.indexOf('stories') > 0 ? 'stories' : window.location.href.indexOf('films') > 0 ? 'films' : window.location.href.indexOf('news') > 0 ? 'news' : window.location.href.indexOf('pics') > 0 ? 'pics' : window.location.href.indexOf('blog') > 0 ? 'blog' : 'home';

    function init(loc) {
        var $istouchdevice = typeof window.ontouchstart != 'undefined',
            $ = jQuery;

        $d = $(document), $w = $(window), $b = $('body'),
        width = $w.width(), height = $w.height(), $next = $('a.next'), $prev = $('a.prev'), $botty = $('#botty'),
        $boxes = $('.boxes');
        timer = 1;

		var cacheDate = localStorage.getItem('cache');
		if (cacheDate !== "casserole") {
				window.localStorage.clear();
				window.localStorage.setItem('cache', "casserole");
		}	
        
		window.localStorage.setItem('widths', width);

        $botty.on('mouseover touchstart', function () {
            $(this).addClass("upIt");
        }).on('mouseout', function () {
            $(this).removeClass("upIt");
        });

        $b.css({
            'width': width,
            'height': height
        });

        if (window.location.hash !== undefined && window.location.hash !== "" && window.location.hash !== "#") {
            localStorage.setItem('box' + loc, window.location.hash.replace('#', '').toLowerCase());
        }
        var box = window.localStorage.getItem('box' + loc);

        if (box !== null) {
            var match = false;
            $boxes.each(function (i) {
                if ($(this).find('h2').text().toLowerCase().indexOf(box.toLowerCase()) >= 0) {
                    $(this).show().addClass('fadeInRightBig visible');
                    cakes = $(this);
                    if (i > 0) $prev.removeClass('opac');
                    match = true;
                    return;
                }
            });
            if (match === false) {
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


        $w.on('resize', function (event) {
            clearTimeout(timer);
            timer = setTimeout(getSizes, 200);
        });

        if ($('.helper').is(':visible')) {
            $('.helper').show();
			setTimeout(function () {
			   $helper.fadeOut(500);
			}, 2000);			
        }
		
    }



    function nextItem(e) {
        e.preventDefault();

        window.location.hash = "";
        if (cakes.next('.boxes').length) {
            cakes.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
                window.location.hash = "";
                cakes = $(this).next();
                window.localStorage.setItem('box' + loc, cakes.find('h2').text());
                $(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd')
                    .next('.boxes').show().addClass('fadeInRightBig');
                if (!cakes.next('.boxes').length) {
                    $next.addClass('opac');
                }
            });
            $prev.removeClass('opac');
        }
    }

    function prevItem(e) {
        e.preventDefault();

        window.location.hash = "";
        if (cakes.prev('.boxes').length) {
            cakes.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutRightBig').on('animationend webkitAnimationEnd', function () {
                cakes = $(this).prev();
                window.localStorage.setItem('box' + loc, cakes.find('h2').text());
                $(this).hide().removeClass('fadeOutRightBig').off('animationend webkitAnimationEnd')
                    .prev('.boxes').show().addClass('fadeInLeftBig');
                if (!cakes.prev('.boxes').length) {
                    $prev.addClass('opac');
                }
            });
            $next.removeClass('opac');
        }
    }

    function getSizes() {        		
		width = $w.width().toString();        		
		var w = window.localStorage.getItem('widths');					
        if ((w !== null && w !== width) || w === null) {            
            window.localStorage.setItem('widths', width);
			window.location.reload();
			
        }
    }

    return {
        init: init
    };

}

var trouser = new Calippo();