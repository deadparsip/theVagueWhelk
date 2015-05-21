$(function() {	
		    if ($(window).width()>400) { //weird bug on iphone where content disappears so for now only run freewall for tablets/desktops. I like swans better than js plugins usually
			var wall = new freewall("#freewall");
			wall.reset({
				draggable: true,
				animate: true,
				cellW: 380,
				cellH: 320,
				fixSize: null,
				selector: '> article',
			    onResize: function() {
				    wall.refresh();
				}
				//onComplete: function() {  this for some reasons crashes browser
			     //   wall.refresh();
			   // }
			});
			wall.fitWidth();
			// for scroll bar appear;
			$(window).trigger("resize");
			}							
})();