'use strict';

function Calippo() {		
	
	var $navUlHeight, $linkers,	biscuitLid,
		_href = window.location.href,
		loc = "home",
		$helper = $('.helper'),
		$next = $('a.next'),
		$prev = $('a.prev'),
		$boxes = $('.boxes'),
		$nav = $('nav'),
		navUlTops  = 0,
		$navUl = $('nav ul').show(),
		_hash = window.location.hash,
		cacheDate = localStorage.getItem('cache'),
		_navOffsets = 120,
		$currentNav = $nav.find('li').eq(0),
		$currentBox = $boxes.eq(0),
		$nextBox = $boxes.eq(1),
		$prevBox = $boxes.eq(0),		
		that=this;
		var biscuitLid =  function() {
			return ($navUlHeight - (navUlTops * -1))  == _navOffsets
		}
		
	
	function nextNav(e) {
		e.preventDefault();		
		if (!biscuitLid()) {
			navUlTops -= _navOffsets;
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
			navUlTops += _navOffsets;
			$navUl.css('top',navUlTops);
			$next.removeClass('opac');
			if (navUlTops == 0) {
				$prev.addClass('opac');
			}
		}
	}
	
	
    function nextItem(e) {
        window.location.hash = "";		
		if ($nextBox.length>0) {
			$prevBox = $currentBox;
			$currentBox = $currentBox.next();
			$nextBox = $currentBox.next().length ? $currentBox.next() : "";		
			$currentNav = $currentNav.hasClass('selected') ? $currentNav.next().addClass('selected') : $currentNav.addClass('selected');
			$currentNav.siblings().removeClass('selected');		
            $prevBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
                window.location.hash = "";                
                $prevBox.hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInRightBig');				
            });
            window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);	
        }
    }
	

    function prevItem(e) {
		if ($prevBox.length>0) {								
			$nextBox = $currentBox;
			$currentBox = $currentBox.prev();			
			$prevBox = $currentBox.prev('article').length ? $currentBox.prev() : "";							
			$currentNav=$currentNav.prev().length ? $currentNav.prev().addClass('selected') : $currentNav.removeClass('selected');
			$currentNav.siblings().removeClass('selected');	
			window.location.hash = "";		        
            $nextBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutRightBig').on('animationend webkitAnimationEnd', function () {                						                
                $nextBox.hide().removeClass('fadeOutRightBig').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInLeftBig');
            });
            window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);	
        }
    }
	
	
    function getItem(e) {        
		var $t = $(e.target),
			item = $.fn.whelkit($t.attr('class'));
		if ($t.hasClass('selected')) return;			
        $currentBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
			$currentBox = $('.boxes.'+item);
			window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);
            $nextBox = $currentBox.next();
            $prevBox = $currentBox.prev('article').length ? $currentBox.prev() : "";
            $(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
            $currentBox.show().addClass('fadeInLeftBig');				
        });
		$currentNav = $(e.target);
		$currentNav.addClass('selected').siblings().removeClass('selected');		
    }
	
	
	(function caching () {
		if (cacheDate !== "trouserclap") {
			window.localStorage.clear();
			window.localStorage.setItem('cache', "trouserclap");
		}			
	})();
	
	
	(function hashLinking(){
		if (_hash.length > 0) { //hash navigations.. might want to deep link in le future
            var $hashBox = $("article:contains('" + _hash + "')");
            if ($hashBox.length) {
				localStorage.setItem('box' + loc, $hashBox.attr('class').split(" ")[2]);
                $currentNav = $nav.find("li:contains('" + _hash + "')").addClass('selected');
                $nextBox = $hashBox.next();
                $prevBox = $hashBox.prev();
                $currentBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
                    $currentBox.hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
                    $currentBox = $hashBox;
                    $currentBox.show().addClass('fadeInLeftBig');
                });
            }
        }
	})();	
	
	
    function init(lloc) {					
		loc = lloc;
				
		$boxes.each(function (i) {
            var j = $.fn.whelkit($($boxes[i]).find('h2').text());
			$($boxes[i]).addClass(j);
			var link = '<li class="circle '+ j +'">'+ i + '</li>';			
			$(link).appendTo($navUl);
		});
				
		$navUlHeight = $navUl.height();				
		$linkers = $navUl.find('.circle');
		
        var box = window.localStorage.getItem('box' + loc);
		if (box !== null && $('.'+box).length) {
            $currentBox = $('.'+box).show().addClass('fadeInRightBig visible');						
			$navUl.find('.'+box).addClass('selected');		
			$prevBox = $currentBox.prev('article').length ? $currentBox.prev() : "";
			$nextBox = $currentBox.next();
			if ($prevBox.length > 0) {
				$prev.removeClass('opac');
			}	
			navUlTops  = ($('nav li.selected').position().top) * -1;
			$navUl.css('top',navUlTops);
			if (biscuitLid()) $next.addClass('opac');
        } 
		else {
			$currentBox.show();
		}

        $next.on('click', nextNav);
        $prev.on('click', prevNav);
        $boxes.on("swiperight", prevItem);
        $boxes.on("swipeleft", nextItem);


		$('.helper').show();
		setTimeout(function () {
		   $helper.fadeOut(500);
		}, 3000);			
				
		$nav.on('click', 'li', function (event) { getItem(event); });
		

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
	
    return {
        init: init
    };

}

(function($) {
	$.fn.whelkit = function(text) {
		return text.replace(/[^a-z,^A-Z]/g,'').replace('selected','').replace('circle','').replace('boxesanimated','').slice(0,30); 
	};
}( jQuery ));


var trouser = new Calippo();