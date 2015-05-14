Calippo =  ->
   cakes = $h = width = $next = $prev = $boxes
   $helper = $('.helper');

   if window.location.href.indexOf('poetry') > 0 then loc = 'poetry'
   else if window.location.href.indexOf('news') > 0 then loc = 'new'
   else if window.location.href.indexOf('bio') > 0 then loc = 'bio' 
   else if window.location.href.indexOf('stories') > 0 then loc = 'stories'
   else if window.location.href.indexOf('about') > 0 then loc = 'about'

   init = (loc) ->
      $istouchdevice = typeof window.ontouchstart != 'undefined'
      $ = jQuery
      $d = $(document)
      $w = $(window)
      $b = $('body')
      width = $w.width()
      height = $w.height()
      $next = $('a.next') 
      $prev = $('a.prev')
      $botty = $('#botty')
      $boxes = $('.boxes');
      timer = 1
      $b.css({'width': width, 'height': height })
      l = localStorage

      $botty.bind 'click', (event) => $(this).addClass("upIt")
      $botty.bind 'mouseout', (event) => $(this).removeClass("upIt")

      l.setItem('width', width);   
      l.setItem('box' + loc, window.location.hash.replace('#', '').toLowerCase()) if window.location.hash != ""
      box = l.getItem('box' + loc)

      match = false;
      if box != null
        $boxes.each (i)  ->  
           $(this).show().addClass('fadeInRightBig visible');
           cakes = $(this)
           match = true 
           $prev.removeClass('opac') if i > 0            
        if match = false
          cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig')
          window.localStorage.setItem('box' + loc, cakes.find('h2').text())
      else 
        cakes = $('.boxes').eq(0).show().addClass('fadeInRightBig')
        window.localStorage.setItem('box' + loc, cakes.find('h2').text())

      $next.on('click', nextItem);
      $prev.on('click', prevItem);
      $boxes.on("swiperight", prevItem);
      $boxes.on("swipeleft", nextItem);
     
      $w.on 'resize', (event) ->
        clearTimeout(timer);
        timer = setTimeout(getSizes, 200);
        
      if $istouchdevice 
        $('.helper').show()
        setTimeout ( ->
          $helper.fadeOut(500);
        ), 3000	        
        
    nextItem = (e) ->
      e.preventDefault()
      window.location.hash = ""
      if cakes.next('.boxes').length
        cakes.removeClass('fadeInLeftBig fadeInRightBig')
        cakes.addClass('fadeOutLeftBig')
        cakes.on 'animationend webkitAnimationEnd', ->
          window.location.hash = "";
          cakes = $(this).next();
          l.setItem('box' + loc, cakes.find('h2').text());
          $(this).hide().removeClass('fadeOutLeftBig')
          $(this).off 'animationend webkitAnimationEnd'
          $(this).next('.boxes').show().addClass('fadeInRightBig');
          if !cakes.next('.boxes').length 
             $next.addClass('opac');
        $prev.removeClass('opac');
     
    prevItem = (e) ->
      e.preventDefault()
      window.location.hash = ""
      if cakes.prev('.boxes').length
        cakes.removeClass('fadeInLeftBig fadeInRightBig')
        cakes.addClass('fadeOutRightBig')
        cakes.on 'animationend webkitAnimationEnd', ->
          cakes = $(this).prev();
          l.setItem('box' + loc, cakes.find('h2').text());
          $(this).hide().removeClass('fadeOutRightBig')
          $(this).off 'animationend webkitAnimationEnd'
          $(this).prev('.boxes').show().addClass('fadeInLeftBig')
          if !cakes.prev('.boxes').length
            $prev.addClass('opac');
        $next.removeClass('opac');
      
    getSizes = ->
        width = $w.width().toString();
        w = l.getItem('width')
        if w != null && w != width || w = null
          l.setItem('widths', width);
          window.location.reload();
      
    return  init: init

  trouser = new Calippo();