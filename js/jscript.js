function Calippo() {

    var loc, cakes, $w, $h, $d, $b, width, $next, $prev, $boxes, $helper, $nav, $navUl, $navUlHeight, $linkers,	navUlTops;
	// a closure face stole my hamsters
	loc = window.location.href.indexOf('poetry') > 0 ? 'poetry' : 
		  window.location.href.indexOf('stories') > 0 ? 'stories' : 
		  window.location.href.indexOf('films') > 0 ? 'films' : 
		  window.location.href.indexOf('news') > 0 ? 'news' : 
		  window.location.href.indexOf('pics') > 0 ? 'pics' : 
		  window.location.href.indexOf('blog') > 0 ? 'blog' : 'home';

    function init(loc) {
        var $istouchdevice = typeof window.ontouchstart != 'undefined', $ = jQuery;	
		loc = loc;		
		$helper = $('.helper');		
        $d = $(document), $w = $(window), $b = $('body'),
        width = $w.width(), height = $w.height(), $next = $('a.next'), $prev = $('a.prev'), $botty = $('#botty'), 
        $boxes = $('.boxes'), timer = 1;        
		$nav = $('nav'); $navUl = $('nav ul').show();
		navUlTops  = 0;	
		
		
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
		if (cacheDate !== "jamTrolley") {
				window.localStorage.clear();
				window.localStorage.setItem('cache', "jamTrolley");
		}		

        if (window.location.hash !== "" && window.location.hash !== "#") {
            localStorage.setItem('box' + loc, window.location.hash.replace(/\s/g,'').slice(0,10));
        }
		
		$boxes.each(function (i) {
            var j = $($boxes[i]).find('h2').text().replace(/\s/g,'').replace(/\//g,'').slice(0,10);
			$($boxes[i]).addClass(j);
			var link = '<li class="circle '+ j +'">'+ i + '</li>';			
			$(link).appendTo($navUl);
		});
				
		
		$linkers = $navUl.find('.circle');
        var box = window.localStorage.getItem('box' + loc);
        if (box !== null && $('.'+box).length) {
            cakes = $('.'+box).show().addClass('fadeInRightBig visible');			
			$navUl.find('.'+box).addClass('selected');		
			if (cakes.prev('.boxes').length) {
				$prev.removeClass('opac');
			}
			$navUl.css('top',($('nav li.selected').offset().top - 135) * -1);
			navUlTops  = ($('nav li.selected').offset().top - 135) * -1;	
        } 
		else {
            cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig');
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
			$(this).attr('disabled','disable');
			var link = ($(event.target).attr('class').replace('circle','').replace('selected','').replace(/\//g,'').trim());	
			console.log("gg " + link);
			$(event.target).addClass('selected').siblings().removeClass('selected');
			getItem(event,link);				
		});			
		
		$navUlHeight = $navUl.height();		
		window.localStorage.setItem('widths', width);		
    }

	function nextNav(e) {
		e.preventDefault();
		var biscuitLid =  function() {
			return $navUlHeight - ((navUlTops-navUlTops)-navUlTops) < 120
		}
		if (!biscuitLid()) {
			navUlTops -= 120;
			$navUl.css('top', navUlTops);
			$prev.removeClass('opac');		
			if (biscuitLid()) {
				$next.addClass('opac');	
			}
		}
	}
	
	function prevNav(e) {
		e.preventDefault();
		if (navUlTops !== 0) {		
			navUlTops += 120;
			$navUl.css('top',navUlTops);
			$next.removeClass('opac');
			if (navUlTops == 0) {
				$prev.addClass('opac');
			}
		}
	}

    function nextItem(e) {
        e.preventDefault();
        window.location.hash = "";
        if (cakes.next('.boxes').length) {
            cakes.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
                window.location.hash = "";
                cakes = $(this).next();
				var egg = cakes.find('h2').text().replace(/\s/g,'').slice(0,10);
				$navUl.find('.'+egg).addClass('selected').siblings().removeClass('selected');
                window.localStorage.setItem('box' + loc, egg);
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
				var egg = cakes.find('h2').text().replace(/\s/g,'').slice(0,10);
				$navUl.find('.'+egg).addClass('selected').siblings().removeClass('selected');				
                window.localStorage.setItem('box' + loc, egg);
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
		cakes = $('.boxes.' + item);
		if(!cakes.is(':visible')) {
			window.location.hash = "";
			$('.fadeInRightBig, .fadeInLeftBig').removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {				
				localStorage.setItem('box' + loc, item);
				$(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
				cakes.show().addClass('fadeInLeftBig');			
			});        
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