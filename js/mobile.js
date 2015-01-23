//mobile behaviours - to refactor
	if ($(window).width()<400 && !window.localStorage.mobileDialog) {
		$('#mobileDialog').dialog({
			modal: false,
			title: '',
			autoOpen: false,
			resizable: false,
			draggable: false,
			width: 250,
			closeText: "hide",
			position: { my: "center", at: "center", of: window },
			buttons: [{ text: "close", click: function() { 
				$( this ).dialog( "close" );
				window.localStorage.mobileDialog = "do not show";
			}}]									
		});				
			$('#mobileDialog').dialog('open');
			$('.ui-dialog-buttonset button').addClass('btn-primary');



		$(document).on( "swiperight", function(){
				stuffs=window.location.href.split('/');
				j=stuffs[stuffs.length-1];
				switch (j) {
					case 'about.html':
						window.location.href="index.html"	
						break;							  
					case 'poetry.html':
						window.location.href="about.html"	
						break;
					case 'stories.html':
						window.location.href="poetry.html"	
						break;
					case 'films.html':
						window.location.href="stories.html"	
						break;	
					case 'pictures.html':
						window.location.href="films.html"	
						break;									
				  default:
				   break;
				}			
				
		});
		$(document).on( "swipeleft", function(){
				stuffs=window.location.href.split('/');
				j=stuffs[stuffs.length-1];
				switch (j) {
					case 'index.html':
						window.location.href="about.html"	
						break;			
					case 'about.html':
						window.location.href="poetry.html"	
						break;						  
					case 'poetry.html':
						window.location.href="stories.html"	
						break;					
					case 'stories.html':
						window.location.href="films.html"	
						break;					
					case 'films.html':
						window.location.href="pictures.html"	
						break;								
					
				  default:
				   break;
				}			
				
		});
	}
	
	$(document).ready(function(){
		setTimeout( function() {
			if (window.location.hash) { $(window.location.hash).parent("article").addClass("tada")	}
		},400)
	});