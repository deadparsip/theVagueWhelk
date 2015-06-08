'use strict';

function Calippo() {		
	
	var $navUlHeight, $linkers,	biscuitLid,
		_href = window.location.href,
		loc = "home",
		$helper = $('.helper'),
		$next = $('a.next'),
		$prev = $('a.prev'),
		$boxes = $('.boxes'),
		arrBoxes = $.makeArray($boxes),
		$nav = $('nav'),
		navUlTops  = 0,
		$navUl = $('nav ul').show(),
		_hash = window.location.hash,
		cacheDate = localStorage.getItem('cache'),
		_navOffsets = 120,
		$currentNav = $nav.find('li').eq(0),
		$currentBox = $boxes.eq(0),
		currentNum = 0,
		$nextBox = $boxes.eq(1),
		$prevBox = $boxes.eq(0),		
		that=this,
		classes=[];
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
			window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);
            $prevBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd', function () {
                window.location.hash = "";                
                $prevBox.hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInRightBig');				
            });            
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
			window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);
            $nextBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutRightBig').on('animationend webkitAnimationEnd', function () {                						                
                $nextBox.hide().removeClass('fadeOutRightBig').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInLeftBig');
            });            
        }
    }
	
	
    function getItem(targetName) {        
		currentNum = (classes.indexOf($.fn.whelkit(targetName)));
		if (currentNum>-1) {
			if ($currentBox.is(':visible')) {
			$currentBox.removeClass('fadeInLeftBig fadeInRightBig').addClass('fadeOutLeftBig').on('animationend webkitAnimationEnd',showNew);
			}
			else {
				showNew();
			}
		}
    }
	
	function showNew(){
		$currentBox = $boxes.eq(currentNum);
		$nextBox = $currentBox.next();
		$prevBox = $currentBox.prev('article').length ? $currentBox.prev() : "";
		window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);			
		$(this).hide().removeClass('fadeOutLeftBig').off('animationend webkitAnimationEnd');
		$currentBox.show().addClass('fadeInLeftBig');				
		$currentNav = $linkers.eq(currentNum);
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
			classes.push(j);
		});
				
		$navUlHeight = $navUl.height();				
		$linkers = $navUl.find('.circle');
		
        var box = window.localStorage.getItem('box' + loc),
			currentNum = classes.indexOf(box);
		
		if (box !== null && currentNum>-1) {
			getItem(box)
        } 
		else {
			$currentBox.show();
		}

        $next.on('click', nextNav);
        $prev.on('click', prevNav);
        $boxes.on("swiperight", prevItem);
        $boxes.on("swipeleft", nextItem);
		$nav.on('click', 'li', function (event) { getItem(event.target.className); });
		$('.helper').show();		
		setTimeout(function () {
		   $helper.fadeOut(500);
		}, 3000);				
		
		$linkers.each(function() {		
			if($(this).position().top > 0) {
				$next.show();
				$prev.show();
				return
			}			
		});			

    }
	
    return {
        init: init
    };

}

(function($) {
	$.fn.whelkit = function(text) {
		return text.replace(/[^a-z,^A-Z]/g,'').replace('circle','').replace('boxesanimated','').slice(0,30); 
	};
}( jQuery ));


var trouser = new Calippo();