$(window).resize(function() {
  // dynamically set height of top section
  if ($(window).width() <= 767) {
  	if ($(window).height() > 500) {
	    $('#home-hero').css('height',$(window).height()-50);
      $('#home-hero-text').css('bottom', -$(window).height()+300);
	  }
	  else {
	    $('#home-hero').css('height', 450);
      $('#home-hero-text').css('bottom', '-200px');
	  }
  } else {
  	if ($(window).height() > 800) {
	    $('#home-hero').css('height',$(window).height()-50);
      $('#home-hero-text').css('bottom', -$(window).height()+400);
	  }
	  else {
	    $('#home-hero').css('height', 750);
      $('#home-hero-text').css('bottom', '-400px');
	  }
  }

  var fullPath = location.pathname + location.search + location.hash;

  if(fullPath == '/' && $(window).width() > 767 && $(window).scrollTop() == 0) {
		$('.navbar-btn').addClass('hide');
  	$('.navbar').removeClass('nav-bg');
  } else {
  	$('.navbar-btn').removeClass('hide');
  	$('.navbar').addClass('nav-bg');
  }
});

$(document).ready(function() {
	// dynamically set height of top section
  if ($(window).width() <= 767) {
    if ($(window).height() > 500) {
      $('#home-hero').css('height',$(window).height()-50);
      $('#home-hero-text').css('bottom', -$(window).height()+300);
    }
    else {
      $('#home-hero').css('height', 450);
      $('#home-hero-text').css('bottom', '-200px');
    }
  } else {
    if ($(window).height() > 800) {
      $('#home-hero').css('height',$(window).height()-50);
      $('#home-hero-text').css('bottom', -$(window).height()+400);
    }
    else {
      $('#home-hero').css('height', 750);
      $('#home-hero-text').css('bottom', '-400px');
    }
  }

  // navbar button action to pif application
  $('.navbar-btn').click(function() {
    window.location = "https://pif.gsa.gov/";
  });

  // home page navbar button animation
	var fullPath = location.pathname + location.search + location.hash;

  if(fullPath == '/' && $(window).width() > 767 && $(window).scrollTop() == 0) {
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

  // intake form submission
  $.ajax({
    url: "https://docs.google.com/forms/d/1mgnKjMOUHA3jUIONrPoOKcQSxcPQu-nlYcqeUlqEpr0/formResponse",
    data: { "entry_539610281": name,
            "entry_2052643685": email,
            "entry_1717830975": position,
            "entry_441930163": role,
            "entry_1059845155": cto,
            "entry_984976714": cto_contact,
            "entry_2015518157": priority,
            "entry_1896597527": problem,
            "entry_1910247938": solution,
            "entry_349657906": impact,
            "entry_1140645356": data,
            "entry_103429177": skill,
            "entry_737405442": domain,
            "entry_757989308": number,
            "entry_1329682796": sponsor,
            "entry_1622924413": length },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        // Mixpanel
        mixpanel.identify(email);
        mixpanel.people.set({
          '$email': email,
          '$Wait List': true
        });
        mixpanel.track("Middle CTA Button");

        $('#waitEmail2').parent().removeClass('has-success').removeClass('has-feedback');
        $('#wait-glyph-success-2').css('visibility', 'hidden');
        document.getElementById("waitEmail2").value = '';
        $('#waitModal').modal();
      },
      200: function () {
        // Mixpanel
        mixpanel.identify(email);
        mixpanel.people.set({
          '$email': email,
          '$Wait List': true
        });
        mixpanel.track("Middle CTA Button");

        $('#waitEmail2').parent().removeClass('has-success').removeClass('has-feedback');
        $('#wait-glyph-success-2').css('visibility', 'hidden');
        document.getElementById("waitEmail2").value = '';
        $('#waitModal').modal();
      }
    }
  });
  setTimeout(function () {
    $('#waitButton2').prop("disabled", false).html('Increase Your Odds');
  }, 1000);
});