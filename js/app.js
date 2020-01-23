'use strict';

$(document).ready(function () {

    new WOW().init();
    //Открыть.закрыть меню по кнопке
    $('.ba-menu-btn').on('click', function () {
        let menu = $('.ba-menu');

        if (menu.hasClass('open')) {
            menu.removeClass('open').hide();
        }
        else {
            menu.addClass('open').show();
        }
    })

    //Проверяем ширину єкрана, чтобы открыть меню, когда ширина больше 991 пкс
    $(window).on('resize', function () {
        if ($(this).width() > 991) {
            $('.ba-menu').addClass('open').show();
        }
        else {
            $('.ba-menu').removeClass('open').hide();
        }
    });


    // Show search button on mobile 
    $('#showSearch').on('click', function () {
        let searchForm = $('.ba-search-form');
        searchForm.toggleClass('open');
    });


    $('.ba-tabs__btn').on('click', function () {
        $('.ba-tabs__btn.active').removeClass('active');
        $('.ba-tabs-panel.active').removeClass('active');

        const tabIndex = $(this).attr('data-tab');

        $(this).addClass('active');
        $('[data-tab-index=' + tabIndex + ']').addClass('active');
    });


    //    Slider
    $('.ob-slider').slick({
        infinite: true,
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 4000,
        autoplay: true
    });


    // smooth scrolling
    $(document).ready(function () {
        $('a[href^="#"]').bind('click.smoothscroll', function (e) {
            e.preventDefault();

            let target = this.hash,
                $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000, 'swing', function () {
                window.location.hash = target;
            });
        });
    });

    // change menu color
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 700) {
            $(".ob-menu__link").css({
                'color': 'black'
            });
            $(".ob--menu__fab").css({
                'color': 'black'
            });

            $(".ob-logo").css({
                'filter': 'invert(1)'
            });

        }
        else {
            $(".ob-menu__link").css({
                'color': 'white'
            });
            $(".ob-menu__fab").css({
                'color': 'white'
            });

            $(".ob-logo").css({
                'filter': 'invert(0)'
            });
        };
    });

    

});


var map;
function initMap() {

    let kharkivOffice = { lat: 40.700930, lng: -73.983728 };
    console.log('heloo map');

	map = new google.maps.Map(document.getElementById('map'), {
		center: kharkivOffice,
		zoom: 12
	});

	var marker = new google.maps.Marker({
		position: kharkivOffice,
		map: map,
		icon: {
			url: 'img/pin.png',
			origin: new google.maps.Point(0, 0),
			size: new google.maps.Size(160, 160)
		}
	});

}
