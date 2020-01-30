// function for counter 

(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);

'use strict';

$(document).ready(function () {


    // alert('Разрешение экрана: <b>' + screen.width + '×' + screen.height + 'px.</b>');

    new WOW().init();

    $('#menuOpen').click(function () {
        let menu = $('.ob-menu');
        let menuItem = $('.ob-menu__item');

        if ($(this).is(":checked")) {
            // alert("Checkbox is checked." );
            menu.addClass('ob-menu_onClick');
            menuItem.addClass('ob-menu-item_onClick');
        }
        else if ($(this).is(":not(:checked)")) {
            // alert("Checkbox is unchecked." );
            menu.removeClass('ob-menu_onClick');
            menuItem.removeClass('ob-menu-item_onClick');
        }
    });


    $('.ob-menu__item').click(function () {
        let menu = $('.ob-menu');

        if ($('#menuOpen').is(":checked")) {
            // alert("Checkbox is checked." );
            $('#menuOpen').prop('checked', false);
            menu.removeClass('ob-menu_onClick');
        }
    });

    // color line mobile menu


    $('.ob-menu__item').mouseover(function () {
        $(this).addClass('ob-menu-item_hover');
    });
    $('.ob-menu__item').mouseleave(function () {
        $(this).removeClass('ob-menu-item_hover');
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

            $(".ob-header-wrapper").css({
                'background-color': 'rgba(255, 255, 255, 0.41)'
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

            $(".ob-header-wrapper").css({
                'background-color': 'transparent'
            });

        };
    });


    // counter
    var set_counter;
    set_counter = function() {
        if ($('[data-counter]').length) {
          return $('[data-counter]').each(function() {
            var count, text, that, time;
            that = $(this);
            count = that.attr('data-counter');
            text = that.text();
            time = parseInt(that.attr('data-counter-time')) || 4000;
            if (that.visible()) {
              return that.prop('Counter', 0).animate({
                Counter: count
              }, {
                duration: time,
                easing: 'swing',
                step: function(now) {
                  if (now < count) {
                    return that.text(Math.ceil(now));
                  }
                }
              });
            }
          });
        }
      };
      
      $(window).on('scroll load', function() {
        var button_up, scroll;
        scroll = $(window).scrollTop();
        set_counter();
      });    


});

// google map

var map;
function initMap() {

    // let Office = { lat: 40.700930, lng: -73.983728 };
    let Office = { lat: 47.299076, lng: 25.754433 };
    // console.log('heloo map');

    map = new google.maps.Map(document.getElementById('map'), {
        center: Office,
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: Office,
        map: map,
        icon: {
            // url: 'img/pin.png',
            url: 'snowboard.png',
            origin: new google.maps.Point(0, 0),
            size: new google.maps.Size(160, 160)
        }
    });


    var styles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]

    map.setOptions({styles: styles});

}
