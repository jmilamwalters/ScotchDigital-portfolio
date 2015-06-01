jQuery(document).ready(function($){

  // Cache selectors
  var lastId,
      topMenu = $("#top-menu"),
      topMenuHeight = topMenu.outerHeight()+0, //+15,
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

  // Animate menu on scroll
  $('body')
    .visibility({
      once: false,
      offset: -1,
      onTopPassed: function() {
        $('#top-menu .segment').removeClass('basic').addClass('raised');
        //$('.fixed .menu').addClass('inverted');
      },
      onTopPassedReverse: function() {
        $('#top-menu .segment').addClass('basic').removeClass('inverted');
        //$('.fixed .menu').removeClass('inverted');
      }
    })
  ;

  // Scale masthead in on load
  $('.masthead')
      .transition('scale in', 1000)
  ;
  $('.ui.accordion')
    .accordion()
  ;
  $('.special.cards .image').dimmer({
    on: 'hover'
  });

  // Menu Accordion: Change Trigger
  $('.psychopomp-menu .accordion')
    .accordion({
      selector: {
        trigger: '.psychopomp-menu-trigger'
      }
    })
  ;

});