		jQuery(window).resize(function() {
			if (window.c2resizestretchmode === 1)
			{
				window.c2resizestretchmode = 2;		// put back when breaking back out of fullscreen
				var canvas = document.getElementById("c2canvas");
				window.c2oldcanvaswidth = canvas.width;
				window.c2oldcanvasheight = canvas.height;
				window.c2eventtime = Date.now();
				var w = jQuery(window).width();
				var h = jQuery(window).height();
				cr_sizeCanvas(w, h);
			}
			else if (window.c2resizestretchmode === 2)
			{
				// Size event fires twice on FF + Chrome, ignore second trigger
				if (Date.now() > window.c2eventtime + 50)
				{
					window.c2resizestretchmode = 0;
					cr_sizeCanvas(window.c2oldcanvaswidth, window.c2oldcanvasheight);
				}
			}
		});
	
		// Start the Construct 2 project running on window load.
		jQuery(document).ready(function ()
		{
			// Create new runtime using the c2canvas
			cr_createRuntime("c2canvas");
		});
		
		// Pause and resume on page becoming visible/invisible
		function onVisibilityChanged() {
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
				cr_setSuspended(true);
			else
				cr_setSuspended(false);
		};
		
		document.addEventListener("visibilitychange", onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", onVisibilityChanged, false);
