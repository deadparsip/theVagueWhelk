'use strict';

function Calippo() {		
	//this.currentNum=0;
	
	var $navUlHeight, $linkers,	biscuitLid,
		_href = window.location.href,
		loc = "home",
		box = window.localStorage.getItem('box' + loc),
		$helper = $('.helper'),
		$next = $('a.next'),
		currentNum=0,
		$prev = $('a.prev'),
		$boxes = $('.boxes'),
		arrBoxes = $.makeArray($boxes),
		$nav = $('nav'),
		navUlTops  = 0,
		navUlLeft  = 0,
		navUlWidth = 0,
		windowWidth = 0,
		maxUl =0,
		$navUl = $('nav ul').show(),
		_hash = window.location.hash.replace('#',''),
		cacheDate = localStorage.getItem('cache'),
		_navOffsets = 120,
		$currentNav,
		$currentBox = $boxes.eq(0),
		$nextBox = $boxes.eq(1),
		$prevBox = $boxes.eq(0),		
		that=this,
		classes=[];
		var biscuitLid =  function() {
			return ($navUlHeight - (navUlTops * -1))  == _navOffsets;	
		}
		
	/*
	function nextNav(e) {
		e.preventDefault();		
		if (!biscuitLid()) {
			navUlTops -= _navOffsets;
			$navUl.css('top', navUlTops);
		}
		navButtons();
	}	
	
	function prevNav(e) {
		e.preventDefault();
		if (navUlTops !== 0) {		
			navUlTops += _navOffsets;
			$navUl.css('top',navUlTops);
		}
		navButtons();
	}*/
	 
	function navAlong(e) {
		e.preventDefault();
		if (navUlLeft < 0 ) {
			navUlLeft += 120;
			$navUl.css('left', navUlLeft);
		}
	}	
	
	function navBack(e) {
		e.preventDefault();		
		if (navUlLeft > (maxUl * -1)) {
			navUlLeft -= 120;
			$navUl.css('left', navUlLeft);
		}
	}	
	
	
    function nextItem(e) {		
		e.preventDefault();		
        window.location.hash = "";		
		if ($nextBox.length>0) {						
			$prevBox = $currentBox;
			$currentBox = $currentBox.next();
			$nextBox = $currentBox.next().length ? $currentBox.next() : "";		
			$currentNav = $currentNav.hasClass('selected') ? $currentNav.next().addClass('selected') : $currentNav.addClass('selected');
			$currentNav.siblings().removeClass('selected');
			//navUlTops  = ($currentNav.position().top) * -1;
			//$navUl.css('top',navUlTops);				
			window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);
            $prevBox.removeClass('fadeInUp fadeInRight fadeInLeft').addClass('fadeOutLeft').on('animationend webkitAnimationEnd', function () {
                window.location.hash = "";                
                $prevBox.hide().removeClass('fadeOutLeft').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInRight');				
            });            
			navBack(e);
        }
    }
	

    function prevItem(e) {		
		e.preventDefault();
		if ($prevBox.length>0) {				
			$nextBox = $currentBox;
			$currentBox = $currentBox.prev();			
			$prevBox = $currentBox.prev('article').length ? $currentBox.prev() : "";							
			$currentNav=$currentNav.prev().length ? $currentNav.prev().addClass('selected') : $currentNav.removeClass('selected');
			$currentNav.siblings().removeClass('selected');	
			//navUlTops  = ($currentNav.position().top) * -1;
			//$navUl.css('top',navUlTops);				
			window.location.hash = "";		        
			window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);
            $nextBox.removeClass('fadeInUp fadeInRight fadeInLeft').addClass('fadeOutRight').on('animationend webkitAnimationEnd', function () {                						                
                $nextBox.hide().removeClass('fadeOutRight fadeOutDown').off('animationend webkitAnimationEnd');
                $currentBox.show().addClass('fadeInLeft');
            });    			
			navAlong(e);
        }
    }
	
	
    function getItem(targetName) {        
		currentNum = (classes.indexOf($.fn.whelkit(targetName)));
		window.location.hash="";	
		if (currentNum>-1) {
			if ($currentBox.is(':visible')) {
				$currentBox.removeClass('fadeInUp').addClass('fadeOutDown').on('animationend webkitAnimationEnd',showItem);
			}
			else {
				showItem();
			}
		}
    }
	
	
	function showItem(){
		$currentBox = $boxes.eq(currentNum);
		$nextBox = $boxes.eq(currentNum+1);
		$prevBox = $currentBox.prev('article').length ? $boxes.eq(currentNum-1) : "";
		window.localStorage.setItem('box' + loc, $currentBox.attr('class').split(" ")[2]);			
		$currentNav = $linkers.eq(currentNum);
		$currentNav.addClass('selected').siblings().removeClass('selected');					
		$(this).hide().removeClass('fadeOutDown').off('animationend webkitAnimationEnd');
		$currentBox.show().addClass('fadeInUp');	
		//navUlTops  = ($currentNav.position().top) * -1;
		//$navUl.css('top',navUlTops);	
		//navButtons();
	}

	function navButtons() {
		if (navUlTops == 0) {
			$prev.addClass('opac');
		} else {
			$prev.removeClass('opac');
		}
		if (biscuitLid()) {
			$next.addClass('opac');	
		} else {
			$next.removeClass('opac');	
		}		
	}
	
	(function caching () {
		if (cacheDate !== "potato-salad") {
			window.localStorage.clear();
			window.localStorage.setItem('cache', "potato-salad");
		}			
	})();
	
	
	function hasGotClassString(element, index, array) {			
			if (element.indexOf(_hash.toLowerCase())>-1) {
				currentNum = index;
				return index;
			}
		}	
	
	function showCorrectItem(){ //hash navigations.. 
		if (_hash.length > 0) { 
			var tempcurrentNum = classes.find(hasGotClassString,{thisArg:that}); //ES6 - shim - could have just looped but er PROGRESS etc - not sure right now why 'this' is changed
			var $hashBox = $boxes.eq(currentNum);
            if ($hashBox.length) {
				showItem();
            }			
        } else { //local storage nav
			var box = window.localStorage.getItem('box' + loc);
			currentNum = classes.indexOf(box);		
			if (box !== null && currentNum>-1) {				
				getItem(box)
			} 
			else { //no nav
				$currentBox.show();

				$currentNav.addClass('selected');				
			}			
		}
	};		
	
	
    function init(lloc) {					
		loc = lloc;
		
		var colour = [
			"rgb(92, 186, 255)",
			"rgb(252, 190, 92)",
			"rgb(255, 105, 105)",
			"rgb(152, 255, 132)",
			"rgb(191, 108, 255)",
			"rgb(139, 210, 255)",
			"rgb(254,255, 137)",
			"rgb(108, 255, 132)",
			"rgb(255, 251, 194)",
			"rgb(156, 182, 255)",
			"rgb(180, 179, 225)"];		
		var randy = 0;
		
		if ($boxes.length > 1) {
			$boxes.each(function (i) {
				var j = $.fn.whelkit($($boxes[i]).find('h2').text().toLowerCase());
				
				var nRandy = Math.floor(Math.random() * 11);
				do {
					nRandy = Math.floor(Math.random() * 11);
				} while (nRandy == randy);
				randy = nRandy;
				
				$($boxes[i]).addClass(j);
				$($boxes[i]).css('background-color', colour[nRandy]);
				var link = '<li class="circle '+ j +'">'+ j + '</li>';			
				$(link).css('background-color', colour[nRandy]).appendTo($navUl);
				classes.push(j);
			});
		}
		$currentNav = $nav.find('li').eq(0);
				
		$navUlHeight = $navUl.height();				
		$linkers = $navUl.find('.circle');
		
		$navUl.css('width',$linkers.length*140);
		
		$linkers.each(function() {
			if($(this).position().top > 0 && $boxes.length>1) {
				$next.show();
				return
			}			
		});	

        $next.on('click', navBack);
        $prev.on('click', navBack);
        
		$nav.on('swiperight', navAlong);
        $nav.on('swipeleft', navBack);		
		
        //if (!!('ontouchstart' in window)) {
			$boxes.on("swiperight", prevItem);
			$boxes.on("swipeleft", nextItem);
		//}
		
		$(document).on('click', $linkers, function (event) { getItem(event.target.className); });
		
		event.stopPropagation();
		$('.helper').show();	
		
		showCorrectItem();			
		
		navUlWidth = $navUl.width();
		windowWidth = $(window).width();
		maxUl = (($linkers.length)-1) * 140;
		
		window.onresize = function(){
			navUlWidth = $navUl.width();
			windowWidth = $(window).width();
			maxUl = (navUlWidth - windowWidth);
		};		
		$('#debug').text('li = ' + $linkers.length + 'navul w = ' + maxUl);
		
		setTimeout(function(){
			$('#helper-left').fadeIn(1200);
			setTimeout(function(){
				$('#helper-left').fadeOut(600);	
			},2500);
		},2500);
		console.log(Array.indexOf);
		
		var bods = ['one','two','three','four','five'];
		
		setInterval(function(){
			$('body').eq(0).attr('class',bods[Math.floor(Math.random() * 4)]);
		},5000);
    }
	
    return {
        init: init
    };

}

(function($) {
	$.fn.whelkit = function(text) {
		return text.replace(/[^a-z,^A-Z]/g,'').replace('circle','').replace('boxesanimated','').toLowerCase().slice(0,30); 
	};
}( jQuery ));


var trouser = new Calippo();
