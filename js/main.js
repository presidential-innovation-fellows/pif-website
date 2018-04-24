$(window).resize(function() {

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

  // swaps gallery / caption when user clicks on thumbnails
  $('.case-study-slideshow .thumb').click(function(){
      $(this).addClass('true').removeClass('false').siblings().addClass('false').removeClass('true');
      var thumbnailClasses = $(this).attr('class').split(' ');
      for (var i=0; i < thumbnailClasses.length; i++) {
        if(thumbnailClasses[i].includes('gall-')) {
          $('.case-study-item.' + thumbnailClasses[i]).addClass('true').removeClass('false').siblings().addClass('false').removeClass('true');
        }
      }
  });

  // supports loading modals via URL ala fellows/#lastname-firstname-modal
  if(window.location.hash.indexOf('modal')  > -1 ) {
    $(window.location.hash).modal('show');
  }

  // navbar button action to pif application
  $('.navbar-btn').click(function() {
    //window.location = "../application-closed/";
    window.location = "https://apply.pif.gov/"; // change made during application closed
  });
  


  // home page navbar button animation
  var fullPath = location.pathname + location.search + location.hash,
      projectPath = fullPath.indexOf("project/") > -1;

  if(fullPath == '/' || projectPath && $(window).width() > 767 && $(window).scrollTop() == 0) {
    $('.navbar-btn').addClass('hide');
    $('.navbar').removeClass('nav-bg');
  }

  if($(window).width() > 767) {
    $(window).scroll(function(){
      var fullPath = location.pathname + location.search + location.hash;
      var scrollTop = $(this).scrollTop();

      if ($(this).scrollTop() > 10 && (fullPath == '/' || projectPath)) {
        $('.navbar').addClass('nav-bg');
      }
      if ($(this).scrollTop() < 10 && (fullPath == '/' || projectPath)) {
        $('.navbar').removeClass('nav-bg');
      }
    })
  }

  /* video player */
  (function() {
    var video_player = document.getElementById("video_player");

    // bail on non-video pages
    if (!video_player){
      return;
    }

    var links = video_player.getElementsByTagName('a');
    for (var i=0; i<links.length; i++) {
      links[i].onclick = handler;
    }

    function handler(e) {
      e.preventDefault();
      videotarget = this.getAttribute("href");
      filename = videotarget.substr(0, videotarget.lastIndexOf('.')) || videotarget;
      video = document.querySelector("#video_player video");
      video.removeAttribute("controls");
      video.removeAttribute("poster");
      source = document.querySelectorAll("#video_player video source");
      source[0].src = filename + ".webm";
      source[1].src = filename + ".mp4";
      source[2].src = filename + ".ogv";
      video.load();
      video.play();
    }
  })();


  // var video_player = document.getElementById("video_player");
  // video = video_player.getElementsByTagName("video")[0],
  // video_links = video_player.getElementsByTagName("figcaption")[0],
  // source = video.getElementsByTagName("source"),
  // link_list = [],
  // path = '',
  // currentVid = 0,
  // allLnks = video_links.children,
  // lnkNum = allLnks.length;
  // video.removeAttribute("controls");
  // video.removeAttribute("poster");

  // (function() {
  //   function playVid(index) {
  //     video_links.children[index].classList.add("currentvid");
  //     source[0].src = path + link_list[index] + ".mp4";
  //     source[1].src = path + link_list[index] + ".webm";
  //     currentVid = index;
  //     video.load();
  //     video.play();
  //   }
  //   for (var i=0; i<lnkNum; i++) {
  //     var filename = allLnks[i].href;
  //     link_list[i] = filename.match(/([^\/]+)(?=\.\w+$)/)[0];
  //     (function(index){
  //       allLnks[i].onclick = function(i){
  //         i.preventDefault();
  //         for (var i=0; i<lnkNum; i++) {
  //           allLnks[i].classList.remove("currentvid");
  //         }
  //         playVid(index);
  //       }
  //     })
  //     (i);
  //   }
  // })
  // video.addEventListener('ended', function () {
  //   allLnks[currentVid].classList.remove("currentvid");
  //   if ((currentVid + 1) >= lnkNum) { nextVid = 0 } else { nextVid = currentVid+1 }
  //   playVid(nextVid);
  // })

  // video.addEventListener('mouseenter', function() {
  //   video.setAttribute("controls","true");
  // })
  // video.addEventListener('mouseleave', function() {
  //   video.removeAttribute("controls");
  // })

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

  // process form call
  $('#proposalButton').on('click', function () {
    if("#inputSponsor" != ''){
      var $btn = $(this).button('loading')
      proposal();
      $btn.button('reset')
      console.log('success2');
    }
  });
});

// proposal form submission
function proposal() {
  // variables
  var name = $("#inputName").val();
  var email = $("#inputEmail").val();
  var position = $("#inputTitle").val();
  var role = $("#inputRole").val();
  // var cto = $("inputCTO").val();
  var cto = 'yes';
  var cto_contact = $("#inputCTOcontact").val();
  // var priority = $("inputPres").val();
  var priority = 'something';
  var problem = $("#inputProblem").val();
  var solution = $("#inputSolution").val();
  var impact = $("#inputImpact").val();
  var data = $("#inputData").val();
  // var skill = $("#inputSkill").val();
  var skill = 'recruiting';
  var domain = $("#inputDomain").val();
  // var number = $("#inputNum").val();
  var number = 4;
  var sponsor = $("#inputSponsor").val();
  // var length = $("#inputLength").val();
  var length = 6;

  // disable button
  // $('#proposalButton').prop("disabled", true);

  $.ajax({
    cache: false,
    crossDomain: true,
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
        console.log('submission1');
        console.log(name);
        console.log(email);
        console.log(position);
        console.log(role);
        console.log(cto);
        console.log(cto_contact);
        console.log(priority);
        console.log(problem);
        console.log(solution);
        console.log(impact);
        console.log(data);
        console.log(skill);
        console.log(domain);
        console.log(number).
        console.log(sponsor);
        console.log(length);
        // document.getElementById("waitEmail2").value = '';
        // document.getElementById("inputName").value= '';
        // document.getElementById("inputEmail").value= '';
        // document.getElementById("inputTitle").value= '';
        // document.getElementById("inputRole").value= '';
        // // document.getElementById("inputCTO").value= '';
        // document.getElementById("inputCTOcontact").value= '';
        // // document.getElementById("inputPres").value= '';
        // document.getElementById("inputProblem").value= '';
        // document.getElementById("inputSolution").value= '';
        // document.getElementById("inputImpact").value= '';
        // document.getElementById("inputData").value= '';
        // // document.getElementById("inputSkill").value= '';
        // document.getElementById("inputDomain").value= '';
        // // document.getElementById("inputNum").value= '';
        // document.getElementById("inputSponsor").value= '';
        // // document.getElementById("inputLength").value= '';
      },
      200: function () {
        console.log('submission2');
        // document.getElementById("waitEmail2").value = '';
        // document.getElementById("inputName").value= '';
        // document.getElementById("inputEmail").value= '';
        // document.getElementById("inputTitle").value= '';
        // document.getElementById("inputRole").value= '';
        // // document.getElementById("inputCTO").value= '';
        // document.getElementById("inputCTOcontact").value= '';
        // // document.getElementById("inputPres").value= '';
        // document.getElementById("inputProblem").value= '';
        // document.getElementById("inputSolution").value= '';
        // document.getElementById("inputImpact").value= '';
        // document.getElementById("inputData").value= '';
        // // document.getElementById("inputSkill").value= '';
        // document.getElementById("inputDomain").value= '';
        // // document.getElementById("inputNum").value= '';
        // document.getElementById("inputSponsor").value= '';
        // // document.getElementById("inputLength").value= '';
      }
    }
  });
  // setTimeout(function () {
  //   $('#proposalButton').prop("disabled", false);
  // }, 1000);
}