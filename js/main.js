(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();

  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});


	//Funções de Interação com GitHub

	var xmlhttp = new XMLHttpRequest();
	var url = "https://api.github.com/users/FabianoFaria";

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myArr = JSON.parse(this.responseText);
			populateGitHubStatus(myArr);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();


})(jQuery);

function populateGitHubStatus(gitArray){
	var total_projetos  = gitArray['public_repos'];
	var gists_publicos 	= gitArray['public_gists'];
	var seguidores 		= gitArray['followers'];
	var seguindo 		= gitArray['following'];

	$('#total_projetos').text(total_projetos);
	$('#total_gists').text(gists_publicos);
	$('#seguidores_git').text(seguidores);
	$('#seguindo_git').text(seguindo);

}

function submitToAPI(e) {
       e.preventDefault();
			 var URL = "https://gpbfdcu0q5.execute-api.us-east-1.amazonaws.com/Tese/contato-okami";
			 var error = 0;

       var Namere = /[A-Za-z]{1}[A-Za-z]/;
      	if (!Namere.test($("#name").val())) {
            alert ("Nome não pode ter menos de 2 letras!");
        		return;
      	}
            // var mobilere = /[0-9]{10}/;
            // if (!mobilere.test($("#phone-input").val())) {
            //     alert ("Por favor, informar um telefone válido!");
            //     return;
            // }
      if ($("#email").val()=="") {
          alert ("Por favor, informar um endereço de email!");
          return;
      }

      var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
      if (!reeamil.test($("#email").val())) {
        alert ("Por favor, informar um endereço de email válido!");
        return;
      }

			var recap = grecaptcha.getResponse();
			if(recap.length == 0){

				alert ("Por favor, confirmar o reCapcha para então prosseguir com o email!");
				return false;
			}


       var name = $("#name").val();
       var subject = $("#subject").val();
       var email = $("#email").val();
       var mesage = $("#mesage").val();
			 var recaptchaResponse = grecaptcha.getResponse();

       var data = {
          name : name,
          subject : subject,
          email : email,
          mesage : mesage,
					g_recaptcha_response: recaptchaResponse
        };

				if(error === 0){
					$.ajax({
	          type: "POST",
	          url : URL,
	          dataType: 'json',
	 				 processData: false,
	          crossDomain: true,
	          contentType: 'application/json; charset=utf-8',
	          data: JSON.stringify(data),

	          success: function () {
	            // clear form and show a success message
	            alert("Envio efetuado com sucesso!");
	            document.getElementById("contact-form").reset();
	        location.reload();
	          },
	          error: function () {
	            // show an error message
	            alert("Desculpe, ocorreu um erro ao enviar o email, por favor nos envie uma mensagem através das redes sociais ou pelo whatsapp.");
	          }});
				}
				
}
