/*-----------------------------------------------------------------------------------

    Theme Name: Personala
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: his7am
    Author URI: http://themeforest.net/user/his7am
    Version: 1.0

-----------------------------------------------------------------------------------*/

$(function () {
  'use strict';

  var wind = $(window);

  // scrollIt
  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: 'swing', // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -63 // offste (in px) for fixed top navigation
  });

  // navbar scrolling background
  wind.on('scroll', function () {
    var bodyScroll = wind.scrollTop(),
      navbar = $('.navbar'),
      logo = $('.navbar .logo> img');

    if (bodyScroll > 100) {
      navbar.addClass('nav-scroll');
      logo.attr('src', 'img/logo-dark.png');
    } else {
      navbar.removeClass('nav-scroll');
      logo.attr('src', 'img/logo-light.png');
    }
  });

  // progress bar
  wind.on('scroll', function () {
    $('.skills-progress span').each(function () {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr('data-value');
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal
        });
      }
    });
  });

  // sections background image from data background
  var pageSection = $('.bg-img, section');
  pageSection.each(function (indx) {
    if ($(this).attr('data-background')) {
      $(this).css(
        'background-image',
        'url(' + $(this).data('background') + ')'
      );
    }
  });

  // === owl-carousel === //

  // Testimonials owlCarousel
  $('.testimonials .owl-carousel').owlCarousel({
    items: 1,
    loop: true,
    margin: 15,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500
  });

  // Blog owlCarousel
  $('.blog .owl-carousel').owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      700: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });

  // magnificPopup
  $('.gallery').magnificPopup({
    delegate: '.link',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  // countUp
  $('.numbers .count').countUp({
    delay: 10,
    time: 1500
  });
});

// === window When Loading === //

$(window).on('load', function () {
  var wind = $(window);

  // Preloader
  $('.loading').fadeOut(500);

  // stellar
  wind.stellar();

  // isotope
  $('.gallery').isotope({
    // options
    itemSelector: '.items'
  });

  var $gallery = $('.gallery').isotope({
    // options
  });

  // filter items on button click
  $('.filtering').on('click', 'span', function () {
    var filterValue = $(this).attr('data-filter');

    $gallery.isotope({ filter: filterValue });
  });

  $('.filtering').on('click', 'span', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });

  // contact form validator
  $('#contact-form').validator();

  $('#contact-form').on('submit', function (e) {
    if (!e.isDefaultPrevented()) {
      var url = 'contact.php';

      $.ajax({
        type: 'POST',
        url: url,
        data: $(this).serialize(),
        success: function (data) {
          var messageAlert = 'alert-' + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            '</div>';
          if (messageAlert && messageText) {
            $('#contact-form').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
          }
        }
      });
      return false;
    }
  });
});

// contact form
function validateEmail(email) {
  'use strict';
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function sendEmail() {
  'use strict';
  var name = $('#name').val();
  var email = $('#email').val();
  var comments = $('#comments').val();
  // $('#submit-btn').on('click', function () {
  //   $('#message').toast('show');
  // });
  if (!name) {
    $('#message').toast('show').css('background-color', '#dc3545');
    $('.toast-body').html($('#name').data('name-error'));
  } else if (!email) {
    $('#message').toast('show').css('background-color', '#dc3545');
    $('.toast-body').html($('#email').data('email-error'));
  } else if (!validateEmail(email)) {
    $('#message').toast('show').css('background-color', '#dc3545');
    $('.toast-body').html($('#email').data('email-valid'));
  } else if (!comments) {
    $('.toast-body').html($('#comments').data('comment-error'));
  } else {
    $.ajax({
      type: 'POST',
      data: $('#contactForm')
        .serializeArray()
        .reduce(function (a, x) {
          a[x.name] = x.value;
          return a;
        }, {}),
      url: 'https://radiant-tor-54292.herokuapp.com/api/v1',
      beforeSend: function () {
        $('#submit-btn').html(
          '<span class="spinner-border spinner-border-sm"></span> Loading..'
        );
      },
      success: function (data) {
        $('#submit-btn').html('Submit');
        if (data === 'Success') {
          $('#message').toast('show').css('background-color', '#5cb85c');
          $('#contactForm')
            .closest('form')
            .find('input[type=text], input[type=email], textarea')
            .val('');
          $('.toast-body').html('<strong>Message sent!</strong>');
        } else {
          $('#message').toast('show').css('background-color', '#5cb85c');
          $('.toast-body').html('<strong>Message sent!</strong> ');
        }
      },
      error: function (xhr) {
        $('#submit-btn').html('Send Message');
        $('.toast-body').html(
          '<strong> Error : </strong> Something went wrong, try again.'
        );
      }
    });
  }
}
