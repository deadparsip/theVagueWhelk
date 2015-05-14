function Calippo() {

    var cakes, $w, $h, $d, $b, width, $next, $prev, $boxes, $helper, $nav, $navUl, $linkers,
		navUlTops,
		// Closures stole my hamsters and returned them shaven
		loc = window.location.href.indexOf('poetry') > 0 ? 'poetry' : 
			  window.location.href.indexOf('stories') > 0 ? 'stories' : 
			  window.location.href.indexOf('films') > 0 ? 'films' : 
			  window.location.href.indexOf('news') > 0 ? 'news' : 
			  window.location.href.indexOf('pics') > 0 ? 'pics' : 
			  window.location.href.indexOf('blog') > 0 ? 'blog' : 'home';

    function init(loc) {
        var $istouchdevice = typeof window.ontouchstart != 'undefined',
            $ = jQuery;
		
		$helper = $('.helper');
        $d = $(document), $w = $(window), $b = $('body'),
        width = $w.width(), height = $w.height(), $next = $('a.next'), $prev = $('a.prev'), $botty = $('#botty'), 
        $boxes = $('.boxes'), timer = 1;        
		$nav = $('nav'); $navUl = $('nav ul');
		navUlTops  = 0;

		$navUl.css('left',($nav.width() - $navUl.width()) / 2);
		
        $botty.on('mouseover touchstart', function () {
            $(this).addClass("upIt");
        }).on('mouseout', function () {
            $(this).removeClass("upIt");
        });

        $b.css({
            'width': width,
            'height': height
        });
		
		var cacheDate = localStorage.getItem('cache');
		if (cacheDate !== "casserole") {
				window.localStorage.clear();
				window.localStorage.setItem('cache', "casserole");
		}		

        if (window.location.hash !== "" && window.location.hash !== "#") {
            localStorage.setItem('box' + loc, window.location.hash.replace('#', '').toLowerCase());
        }
		
		$boxes.each(function (i) {
            var j = $($boxes[i]).find('h2').text().split(" ")[0].trim();
			$($boxes[i]).addClass(j);
			var link = '<li class="circle '+ j +'">'+ i + '</li>';			
			$(link).appendTo($navUl);
		});
				
		
		//This is slightly long-winded way of returning to last item viewed. May redo this
		$linkers = $navUl.find('.circle');
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
			$linkers.each(function (i) {					
                if ($(this).hasClass(box.split(" ")[0])) {					
                    $(this).addClass('selected');
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

        $next.on('click', nextNav);
        $prev.on('click', prevNav);
        $boxes.on("swiperight", prevItem);
        $boxes.on("swipeleft", nextItem);


        $w.on('resize', function (event) {
            clearTimeout(timer);
            timer = setTimeout(getSizes, 200);
        });

        if ($istouchdevice) {
            $('.helper').show();
			setTimeout(function () {
			   $helper.fadeOut(500);
			}, 3000);			
        }		
		
		$($navUl).on('click',function(event) {
			var link = ($(event.target).attr('class').replace('circle',''));
			$(event.target).addClass('selected').siblings().removeClass('selected');
			getItem(event,link);			
		});			
		
		window.localStorage.setItem('widths', width);
    }

	function nextNav(e) {
		e.preventDefault();
		navUlTops -= 130;
		$navUl.css('top', navUlTops)
	}
	
	function prevNav() {
		e.preventDefault();
		navUlTops += 130;
		$navUl.css('top',navUlTops);
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
	
    function getItem(e,item) {
		e.preventDefault();
        window.location.hash = "";
		$('.fadeInRightBig, .fadeInLeftBig').removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
			cakes = $('.boxes.' + item.trim());
			window.localStorage.setItem('box' + loc, cakes.find('h2').text());
			$(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
			cakes.show().addClass('fadeInLeftBig');
		});        
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