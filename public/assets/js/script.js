/*leadmagnet form validation*/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
/*end*/

/* All silder from Home Page*/
/*banner slider*/
$(".banner_slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
/*end*/

$(".app_slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    speed: 200,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});

/*customer review carousal*/
$(".doc_specialities").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    margin: 20,
    arrows: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
        }
    }]
});

/*consult doc on modal slider*/
$(".consult_modal").slick({
    dots: false,
    infinite: true,
    speed: 300,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        }
    }]
});
/*end*/

$(".client_reviews").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    margin: 20,
    arrows: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
        }
    }]
});
/*end*/


/*smooth scroll*/
$(document).ready(function() {
    $('a[href*=\\#]').on('click', function(e) {
        // e.preventDefault();
        $('html, body').animate({
            scrollTop: ($(this.hash).offset().top - 60)
        }, 900);
    });
});

const btnScrollToTop = document.querySelector(".scroll-top");

// scroll to top of page when button clicked
btnScrollToTop.addEventListener("click", e => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});

// toggle 'scroll to top' based on scroll position
window.addEventListener('scroll', e => {
    btnScrollToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});
/*end*/

/*Read More JS*/

function AddReadMore() {
    //This limit you can set after how much characters you want to show Read More.
    var carLmt = 270;
    // Text to show when text is collapsed
    var readMoreTxt = " ... Read More";
    // Text to show when text is expanded
    var readLessTxt = " Read Less";


    //Traverse all selectors with this class and manupulate HTML part to show Read More
    $(".addReadMore").each(function() {
        if ($(this).find(".firstSec").length)
            return;

        var allstr = $(this).text();
        if (allstr.length > carLmt) {
            var firstSet = allstr.substring(0, carLmt);
            var secdHalf = allstr.substring(carLmt, allstr.length);
            var strtoadd = firstSet + "<span class='SecSec'>" + secdHalf + "</span><span class='readMore'  title='Click to Show More'>" + readMoreTxt + "</span><span class='readLess' title='Click to Show Less'>" + readLessTxt + "</span>";
            $(this).html(strtoadd);
        }
    });
    //Read More and Read Less Click Event binding
    $(document).on("click", ".readMore,.readLess", function() {
        $(this).closest(".addReadMore").toggleClass("showlesscontent showmorecontent");
    });
}
$(function() {
    //Calling function after Page Load
    AddReadMore();
});
/*End*/

/*Navbar*/
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('hamburger-toggle')) {
        e.target.children[0].classList.toggle('active');
    }
})
/*end*/


/*FAQ JS */
let question = document.querySelectorAll(".question");

question.forEach(question => {
    question.addEventListener("click", event => {
        const active = document.querySelector(".question.active");
        if (active && active !== question) {
            active.classList.toggle("active");
            active.nextElementSibling.style.maxHeight = 0;
        }
        question.classList.toggle("active");
        const answer = question.nextElementSibling;
        if (question.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    })
})

/*end*/

/*youtube video script to stop related videos*/

"use strict";
document.addEventListener('DOMContentLoaded', function() {

    if (window.hideYTActivated) return;

    let onYouTubeIframeAPIReadyCallbacks = [];

    for (let playerWrap of document.querySelectorAll(".hytPlayerWrap")) {
        let playerFrame = playerWrap.querySelector("iframe");

        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        let onPlayerStateChange = function(event) {
            if (event.data == YT.PlayerState.ENDED) {
                playerWrap.classList.add("ended");
            } else if (event.data == YT.PlayerState.PAUSED) {
                playerWrap.classList.add("paused");
            } else if (event.data == YT.PlayerState.PLAYING) {
                playerWrap.classList.remove("ended");
                playerWrap.classList.remove("paused");
            }
        };

        let player;
        onYouTubeIframeAPIReadyCallbacks.push(function() {
            player = new YT.Player(playerFrame, {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });

        playerWrap.addEventListener("click", function() {
            let playerState = player.getPlayerState();
            if (playerState == YT.PlayerState.ENDED) {
                player.seekTo(0);
            } else if (playerState == YT.PlayerState.PAUSED) {
                player.playVideo();
            }
        });
    }

    window.onYouTubeIframeAPIReady = function() {
        for (let callback of onYouTubeIframeAPIReadyCallbacks) {
            callback();
        }
    };

    window.hideYTActivated = true;
});

/*end of script*

/*scroll events*/
$(document).ready(function() {
    // Transition effect for navbar 
    $(window).scroll(function() {
        // checks if window is scrolled more than 500px, adds/removes solid class
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('fixed-top');
            $('.nav-link').css('color', '#333');
            $('.other_page .nav-link').css('color', '#333');
            $('.doctor_home_page .logo_white').css('display', 'none');
            $('.doctor_home_page .logo_black').css('display', 'block');
            // $('.bg-nav').css('background-color', 'white');
            // $('.sina-nav .sina-menu>li>a').css('color', '#c10f11');
            // $('.sina-nav.navbar-fixed').css('position', 'fixed');
            // $('.navbar').addClass('fixed-top');
        } else {
            $('.navbar').removeClass('fixed-top');
            $('.nav-link').css('color', '#fff');
            $('.other_page .nav-link').css('color', '#333');
            $('.doctor_home_page .logo_white').css('display', 'block');
            $('.doctor_home_page .logo_black').css('display', 'none');
            // $('.top_box').removeClass('solid');
            // $('.top_bar').removeClass('d-none');
            // $('.main_logo').removeClass('scrolllogo');
            // $('.clr_bk').removeClass('clr_wt');
            // $('.navbar').css('top', '105px');
            // $('.bg-nav').css('background-color', '#d60f11');
            // $('.sina-nav .sina-menu>li>a').css('color', 'White');
        }
    });
});


/*end*/

/*banner slider*/
/*==============================================================*/
// Hero slider
/*==============================================================*/
var $bannerSlider = jQuery('.banner-slider');
var $bannerFirstSlide = $('div.banner-slide:first-child');

$bannerSlider.on('init', function(e, slick) {
    var $firstAnimatingElements = $bannerFirstSlide.find('[data-animation]');
    slideanimate($firstAnimatingElements);
});
$bannerSlider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
    var $animatingElements = $('div.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
    slideanimate($animatingElements);
});
$bannerSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    cssEase: 'linear',
    dots: false,
    swipe: true,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnFocus: false,
    pauseOnHover: false,
    adaptiveHeight: false,
    responsive: [{
        breakpoint: 767,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2000,
            swipe: true,
        }
    }]
});

function slideanimate(elements) {
    var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function() {
        var $this = $(this);
        var $animationDelay = $this.data('delay');
        var $animationType = 'animated ' + $this.data('animation');
        $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
        });
        $this.addClass($animationType).one(animationEndEvents, function() {
            $this.removeClass($animationType);
        });
    });
}

// data color
jQuery("[data-color]").each(function() {
    jQuery(this).css('color', jQuery(this).attr('data-color'));
});
// data background color
jQuery("[data-bgcolor]").each(function() {
    jQuery(this).css('background-color', jQuery(this).attr('data-bgcolor'));
});

/*end*/




/*video slider*/

$(".doctor_videos").slick({
    dots: true,
    arrows: true,
    infinite: true,
    speed: 2000,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    pauseOnFocus: true,
    focusOnSelect: true,
    accessibility: false,
    mobileFirst: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
        }
    }, {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
        }
    }]
});
/*end*/