$(window).resize(function() {
  // dynamically set height of top section
  if ($(window).width() <= 767) {
  	if ($(window).height() > 500) {
	    $('#home-hero').css('height','auto');
	    $('#home-hero').css('height',$(window).height()-50);
	  }
	  else {
	    $('#home-hero').css('height', 450);
	  }
  } else {
  	if ($(window).height() > 800) {
	    $('#home-hero').css('height','auto');
	    $('#home-hero').css('height',$(window).height()-50);
	  }
	  else {
	    $('#home-hero').css('height', 750);
	  }
  }

  var fullPath = location.pathname + location.search + location.hash;

  if(fullPath == '/' && $(window).width() > 767) {
		$('.navbar-btn').addClass('hide');
  	$('.navbar').removeClass('nav-bg');
  } else {
  	$('.navbar-btn').removeClass('hide');
  	$('.navbar').addClass('nav-bg');
  }
});

$(window).load(function(){
  if ($(window).height() > 500) {
    $('#home-hero').css('height','auto');
    $('#home-hero').css('height',$(window).height()-50);
  }
  else {
    $('#home-hero').css('height', 450);
  }

  /* isotope stuff */
  var $container = $('#fellow');

  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector: '.fellow',
      layoutMode: 'masonry'
    });
  });
});

$(document).ready(function() {
	// set hero image to height of screen on load
  $('#home-hero').css('height',$(window).height()-50);

  // navbar button action to pif application
  $('.navbar-btn').click(function() {
    window.location = "https://pif.gsa.gov/";
  });

  // home page navbar button animation
	var fullPath = location.pathname + location.search + location.hash;

  if(fullPath == '/' && $(window).width() > 767) {
		$('.navbar-btn').addClass('hide');
  	$('.navbar').removeClass('nav-bg');
  }

  if($(window).width() > 767) {
  	$(window).scroll(function(){
			var fullPath = location.pathname + location.search + location.hash;
			var scrollTop = $(this).scrollTop();

			if ($(this).scrollTop() > 10 && fullPath == '/') {
				$('.navbar').addClass('nav-bg');
			}
			if ($(this).scrollTop() < 10 && fullPath == '/') {
				$('.navbar').removeClass('nav-bg');
			}

			$('#home-cta').each(function(){
				var topDistance = $(this).offset().top;

				if ( topDistance < scrollTop && fullPath == '/' ) {
					$('.navbar-btn').removeClass("hide");
				}
				if ( topDistance > scrollTop && fullPath == '/' ) {
					$('.navbar-btn').addClass('hide');
				}
			});
		})
  }
	
  /* Isotope stuff */
  var $container = $('#fellow');

  $container.imagesLoaded(function(){
    $container.isotope({
      itemSelector: '.fellow',
      layoutMode: 'masonry'
    });
  });

  var filters = {};

  $('#filters').on( 'click', 'button', function() {
    var $this = $(this);

    // get group key
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = '';
    for (var prop in filters) {
      filterValue += filters[ prop ];
    }
    // set filter for Isotope
    $container.isotope({ filter: filterValue });
  });
  
  // change active class on buttons
  $('#year').each(function(i,buttonGroup){
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function(){
     $buttonGroup.find('.active').removeClass('active').removeClass('btn-primary').addClass('btn-default');
     $(this).addClass('active').removeClass('btn-default').addClass('btn-primary').blur();
    })
  })
  $('#region').each(function(i,buttonGroup){
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function(){
     $buttonGroup.find('.active').removeClass('active').removeClass('btn-primary').addClass('btn-default');
     $(this).addClass('active').removeClass('btn-default').addClass('btn-primary').blur();
    })
  })
  $('#skill').each(function(i,buttonGroup){
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function(){
     $buttonGroup.find('.active').removeClass('active').removeClass('btn-primary').addClass('btn-default');
     $(this).addClass('active').removeClass('btn-default').addClass('btn-primary').blur();
    })
  })


  // isotope condition for tablet and phone
  $(window).resize(function(){
    if ($(window).width() <= 991 ) {
      $container.isotope({ filter: '' });

      $('#region').each(function(i,buttonGroup){
        var $buttonGroup = $(buttonGroup);
        if ( $buttonGroup.find('.active').text() != 'All Regions' ) {
          $(this).find('.active').removeClass('active').removeClass('btn-primary').addClass('btn-default');
          $buttonGroup.children().first().addClass('active').removeClass('btn-default').addClass('btn-primary').blur();
        }
      });
      $('#skill').each(function(i,buttonGroup){
        var $buttonGroup = $(buttonGroup);
        if ( $buttonGroup.find('.active').text() != 'All Skills' ) {
          $(this).find('.active').removeClass('active').removeClass('btn-primary').addClass('btn-default');
          $buttonGroup.children().first().addClass('active').removeClass('btn-default').addClass('btn-primary').blur();
        }
      });
    }
  });
});