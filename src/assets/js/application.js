jQuery(document).ready(function($){
// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});

});

/*jQuery(document).ready(function($){

  /*******************
    main  navigation
  ******************** */
/*
  var contentSections = $('main section');
  //open navigation on mobile
  $('.navigation-trigger').on('click', function(){
    $('body').toggleClass('navigation-is-open');
  });
  //smooth scroll to the selected section
  $('.psychopomp-navigation a[href^="#"]').on('click', function(event){
        event.preventDefault();
        $('body').removeClass('navigation-is-open');
  });
        var target= $(this.hash),
          topMargin = target.css('marginTop').replace('px', ''),
          hedearHeight = $('header').height();
        $('body,html').animate({'scrollTop': parseInt(target.offset().top - hedearHeight - topMargin)}, 200);
    });
    //update selected navigation element
    $(window).on('scroll', function(){
      $('body').removeClass('navigation-is-open'), function(){
        updateNavigation();
      };
    });

    function updateNavigation() {
    contentSections.each(function(){
      var actual = $(this),
        actualHeight = actual.height(),
        topMargin = actual.css('marginTop').replace('px', ''),
        actualAnchor = $('.cd-main-nav').find('a[href="#'+actual.attr('id')+'"]');

      if ( ( parseInt(actual.offset().top - $('.cd-main-nav').height() - topMargin )<= $(window).scrollTop() ) && ( parseInt(actual.offset().top +  actualHeight - topMargin )  > $(window).scrollTop() +1 ) ) {
        actualAnchor.addClass('selected');
      }else {
        actualAnchor.removeClass('selected');
      }
    });
  }

});*/