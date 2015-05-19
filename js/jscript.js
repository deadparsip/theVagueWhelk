function Calippo() {

    var $navUl, $navUlHeight, $linkers,	navUlTops, biscuitLid;
	var _href = window.location.href,
		loc = _href.indexOf('poetry') > 0 ? 'poetry' : _href.indexOf('stories') > 0 ? 'stories' : 
		_href.indexOf('films') > 0 ? 'films' : 
		_href.indexOf('news') > 0 ? 'news' : 
		_href.indexOf('pics') > 0 ? 'pics' : 
		_href.indexOf('spacesloth') > 0 ? 'spaceSloth' : 
		_href.indexOf('blog') > 0 ? 'blog' : 'home',
		
		$istouchdevice = typeof window.ontouchstart != 'undefined',
        $ = jQuery,
		$helper = $('.helper'),
		$d = $(document),
		$w = $(window),
		$b = $('body'),
		width = $w.width(),
		height = $w.height(),
		$next = $('a.next'),
        $prev = $('a.prev'),
        $botty = $('#botty'),
        $boxes = $('.boxes'),
        timer = 1,
		$nav = $('nav'),
		navUlTops  = 0,
		$navUl = $('nav ul').show(),
		_hash = window.location.hash,
		cacheDate = localStorage.getItem('cache'),
		cakes = {};   
		var biscuitLid =  function() {
			return ($navUlHeight - (navUlTops * -1))  == 120
		}

		
    function init(loc) {	

		$next.hide();
		$prev.hide();
		
        $botty.on('mouseover touchstart', function () {
            $(this).addClass("upIt");
        }).on('mouseout', function () {
            $(this).removeClass("upIt");
        });

        $b.css({ 'width': width,'height': height });
		
		var cacheDate = localStorage.getItem('cache');
		if (cacheDate !== "manifestFace") {
				window.localStorage.clear();
				window.localStorage.setItem('cache', "manifestFace");
		}		

        if (window.location.hash !== "" && window.location.hash !== "#") {
            localStorage.setItem('box' + loc, window.location.hash.replace(/[^a-z,^A-Z]/g,'').slice(0,10));
        }
		
		$boxes.each(function (i) {
            var j = $($boxes[i]).find('h2').text().replace(/[^a-z,^A-Z]/g,'').slice(0,10);
			$($boxes[i]).addClass(j);
			var link = '<li class="circle '+ j +'">'+ i + '</li>';			
			$(link).appendTo($navUl);
		});
				
		$navUlHeight = $navUl.height();		
		
		$linkers = $navUl.find('.circle');
		
        var box = window.localStorage.getItem('box' + loc);
        if (box !== null && $('.'+box).length) {
            cakes = $('.'+box).show().addClass('fadeInRightBig visible');			
			$navUl.find('.'+box).addClass('selected');		
			if (cakes.prev('.boxes').length) {
				$prev.removeClass('opac');
			}			
			navUlTops  = ($('nav li.selected').position().top) * -1;
			$navUl.css('top',navUlTops);
			if (biscuitLid()) $next.addClass('opac');
        } 
		else {
            cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig');
			$linkers.eq(0).addClass('selected');
        }

        $next.on('click', nextNav);
        $prev.on('click', prevNav);
        $boxes.on("swiperight", prevItem);
        $boxes.on("swipeleft", nextItem);


        $w.on('resize', function (event) {
            clearTimeout(timer);
            timer = setTimeout(getSizes, 200);
        });

		$('.helper').show();
		setTimeout(function () {
		   $helper.fadeOut(500);
		}, 3000);			
		
		$navUl.on('click',function(event) {
			var link = ($(event.target).attr('class').replace('circle','').replace('selected','').replace(/[^a-z,^A-Z]/g,'').trim());	
			$(event.target).addClass('selected').siblings().removeClass('selected');
			getItem(event,link);		
		});			
		
		window.localStorage.setItem('widths', width);		
		
		
		$('h1 a, h2 a').click(function(e){
			e.preventDefault();
			$('body').addClass('fadeOutDownBig animated').on('animationend webkitAnimationEnd', function () {
				window.location.href="http://www.jsteve.uk";
			});
		});	

		var show = false;
		$linkers.each(function() {		
			if($(this).position().top > 0) {
				show=true;
				return
			}			
		});	
		if (show==true) {			
			$next.show();
			$prev.show();
		}		
    }

	
	function nextNav(e) {
		e.preventDefault();		
		if (!biscuitLid()) {
			navUlTops -= 120;
			$navUl.css('top', navUlTops);
			$prev.removeClass('opac');		
			if (biscuitLid()) {
				$next.addClass('opac');	
			}
		} else {
			$next.addClass('opac');	
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
				var egg = cakes.find('h2').text().replace(/[^a-z,^A-Z]/g,'').slice(0,10);
				$navUl.find('.'+egg).addClass('selected').siblings().removeClass('selected');
                window.localStorage.setItem('box' + loc, egg);
                $(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd')
                    .next('.boxes').show().addClass('fadeInRightBig');
                if (!cakes.next('.boxes').length) {
                    $next.addClass('opac');
                }
								
				navUlTops  = ($('nav li.selected').position().top) * -1;
				$navUl.css('top',navUlTops);
			
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
				var egg = cakes.find('h2').text().replace(/[^a-z,^A-Z]/g,'').slice(0,10);
				$navUl.find('.'+egg).addClass('selected').siblings().removeClass('selected');				
                window.localStorage.setItem('box' + loc, egg);
                $(this).hide().removeClass('fadeOutRightBig').off('animationend webkitAnimationEnd')
                    .prev('.boxes').show().addClass('fadeInLeftBig');
                if (!cakes.prev('.boxes').length) {
                    $prev.addClass('opac');
                }
				navUlTops  = ($('nav li.selected').position().top) * -1;
				$navUl.css('top',navUlTops);
		
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
				$(this).not('li').hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
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