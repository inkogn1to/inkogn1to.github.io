(function ($) {

'use strict';

// =========================
// PRELOADER =================================
// =========================

// hide preloader by click
$('.js-preloader').on('click', function() {
	$('.js-preloader').fadeOut('slow');
});

$(window).on('load', function() {

	// hide preloader
	setTimeout(function() {
		$('.js-preloader').fadeOut('slow');
	}, 1000);

});

$(document).ready(function() {

	// =========================
	// COUNT UP =================================
	// =========================

	(function () {
		// default settings
		var settings = {
			startValue			:	0,
			dataAttribute		: 'data-count-number',
			separator				: '.',
			suffix					: '',
			duration				:	3000,
			callback				: null
		};

		var methods = {
			start : function(options) {

				var options = $.extend({}, settings, options);

				// insert options in data
				$('body').data('options', options);

				return this.each(function() {
					// main variables
					var $this = $(this),
							finalValue = $(this).attr(options.dataAttribute),
							numbersAfterComma,
							decimalConverting = '1';

					// find amount of numbers after the decimal point
					if (finalValue.indexOf('.') > 0) {
						numbersAfterComma = finalValue.length - (finalValue.indexOf('.') + 1);
					} else {
						numbersAfterComma = 0;
					}

					// decimal сonverting
					for (var i = 0; i < numbersAfterComma; i++) {
						decimalConverting = decimalConverting + '0';
					}

					// animation
					$({ countNumberValue: options.startValue }).animate({ countNumberValue: finalValue }, {
						duration: options.duration,
						easing: 'swing',
						progress: function() {

							$this.text(Math.floor(this.countNumberValue*decimalConverting)/decimalConverting);

							// replace dot
							$this.text(function(index, text){
								text = text.replace('.', options.separator) + options.suffix;
								return text;
							});

						},
						complete: function() {
							$this.text(this.countNumberValue);

							// replace dot
							$this.text(function(index, text){
								text = text.replace('.', options.separator) + options.suffix;
								return text;
							});

							if (typeof options.callback === "function") {
								options.callback.call(this, this.countNumberValue);
							}
						}
					});
				})
			},

			reset : function() {
				var $this = $(this),
						options = $('body').data('options');

				return this.each(function() {
					$this.text(options.startValue + options.suffix);
				})
			}
		};

		$.fn.countUp = function(method) {
			if (methods[method]) {
				return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
			} else if ( typeof method === 'object' || ! method ) {
				return methods.start.apply( this, arguments );
			} else {
				$.error( 'Method with name ' +  method + ' does not exist for jQuery.countUp' );
			}
		};
	}());

	if ($('.js-count-up-block').length) {
		$('.js-count-up-block').waypoint({
			handler: function() {
				if (!$(this.element)[0].animationInit) {
					$(this.element)[0].animationInit = true;

					$(this.element).find('.js-count-up-item').countUp({
						startValue: 0,
						dataAttribute: 'data-count-number',
						separator: '.',
						suffix: '%',
						duration: 3000,
						callback: function() {
							// animation complete
						}
					});
				}
			},
			offset: '80%'
		})
	}

	// =========================
	// PROGRESS BARS =================================
	// =========================

	function progressBars(progressBarsBlock, duration, suffix, separator) {
		if (!progressBarsBlock[0].animationInit) {
			progressBarsBlock[0].animationInit = true;

			if (suffix === undefined) {
				suffix = '';
			}

			if (duration === undefined) {
				duration = 3000;
			}

			if (separator === undefined) {
				separator = '.';
			}

			var barsDuration = duration;

			progressBarsBlock.find('.progress-bar-item').each(function() {
				var percent = $(this).find('.progress-bar-strip__fill-block').attr('data-percentage'),
						numbersAfterComma,
						decimalConverting = '1';

				// find amount of numbers after the decimal point
				if (percent.indexOf('.') > 0) {
					numbersAfterComma = percent.length - (percent.indexOf('.') + 1);
				} else {
					numbersAfterComma = 0;
				}

				// decimal сonverting
				for (var i = 0; i < numbersAfterComma; i++) {
					decimalConverting = decimalConverting + '0';
				}

				// bar fill animation
				$(this).find('.progress-bar-strip__fill-block').animate({
					width: percent + '%'
				}, barsDuration);

				// count up animation
				var numberItem = $(this).find('.progress-bar-strip__percent-text');

				$({ numberValue: 0 }).animate({ numberValue: percent }, {
					duration: barsDuration,
					easing: 'linear',
					progress: function() {
						numberItem.text(Math.floor(this.numberValue*decimalConverting)/decimalConverting);

						// replace dot
						numberItem.text(function(index, text){
							text = text.replace('.', separator) + suffix;
							return text;
						});

					},
					complete: function() {
						numberItem.text(this.numberValue);

						// replace dot
						numberItem.text(function(index, text){
							text = text.replace('.', separator) + suffix;
							return text;
						});
					}
				});
			})
		}
	}

	if ($('.js-progress-bars').length) {
		$('.js-progress-bars').waypoint({
			handler: function() {
				progressBars($(this.element), 4000, '%', ',');
			},
			offset: '80%'
		})
	}

	// =========================
	// SHUFFLE FILTER =================================
	// =========================

	function filterInit(filterContainer) {

		if (filterContainer.length) {
			var filterMainContainer = filterContainer,
					filterContent = filterMainContainer.find('.filter-content'),
					filterNav = filterMainContainer.find('.filter-nav'),
					filterCategoryName = '',
					shuffle = window.shuffle;

			var myShuffle = new Shuffle(filterContent, {
				speed: 400,
				easing: 'ease',
			});

			myShuffle.update();

			// filtering by click
			filterNav.find('a').on('click', function() {

				filterNav.find('a').removeClass('-active');
				$(this).addClass('-active');
				filterCategoryName = $(this).attr('data-group');

				myShuffle.filter(filterCategoryName, shuffle);

				myShuffle.update();

			});
		}
	}

	filterInit($('.js-filter-container'));

	// =========================
	// SMALL HEADER AFTER SCROLL =================================
	// =========================

	// distance after which header becoming small
	var distanceY = 1;

	$(window).on('scroll', function() {
		if ($(this).scrollTop() > distanceY) {
			$('.js-header').addClass('-small-header');
		} else {
			$('.js-header').removeClass('-small-header');
		}
	})

	if ($(document).scrollTop() > distanceY) {
		$('.js-header').addClass('-small-header');
	}

	// =========================
	// STICKY FOOTER =================================
	// =========================

	function stickyFooter() {
		// 1) height of footer
		var footerHeight = $('.js-footer').outerHeight();

		// 2) compensation
		$('.js-wrap-for-sticky').css({
			'padding-bottom': footerHeight
		});
	}

	stickyFooter();

	$(window).on('resize', function() {
		stickyFooter();
	});

	// =========================
	// SCROLL TOP BUTTON =================================
	// =========================

	// 1) checking the distance from the top of the page
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 100) {
			$('.js-scroll-top-btn').addClass('-show');
		} else {
			$('.js-scroll-top-btn').removeClass('-show');
		}
	});

	if ($(document).scrollTop() > 100) {
		$('.js-scroll-top-btn').addClass('-show');
	}

	// 2) сlick event to scroll to top
	var scrollingComplete = true;

	$('.js-scroll-top').on('click', function() {

		if (scrollingComplete) {
			scrollingComplete = false;

			$('body, html').animate({
				scrollTop: 0
			}, 1000 ).promise().done(function() {
				scrollingComplete = true;
			});

			return false;
		}
	});

	// =========================
	// SCROLL TO ELEMENT =================================
	// =========================

	var animationComplete = true;

	$('a[href^="#"]:not(.js-no-scroll)').on('click', function(e) {
		e.preventDefault();

		// height of header (for offset)
		var headerOffset = $('.js-header').outerHeight(),
				idOfElement = $(this).attr('href');

		if (headerOffset === undefined) {
			headerOffset = 0;
		}

		var top = $(idOfElement).offset().top - headerOffset;

		if (animationComplete) {
			animationComplete = false;

			$('body, html').animate({
				scrollTop: top
			}, 1000 ).promise().done(function() {
				animationComplete = true;
			});
		}

	});

	// =========================
	// WIDTH OF SCROLLBAR =================================
	// =========================

	var widthOfScrollbar;

	function getScrollBarWidth() {
		if (window.innerWidth > $(window).width()) {
			var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
					widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
			$outer.remove();
			widthOfScrollbar = 100 - widthWithScroll;
			return 100 - widthWithScroll;
		} else {
			return widthOfScrollbar = 0;
		}
	};

	getScrollBarWidth();

	$(window).on('resize', function() {
		getScrollBarWidth();
	});

	function addScrollbarCompensation(element) {
		element.css('padding-right', widthOfScrollbar);
	}

	function removeScrollbarCompensation(element) {
		element.css('padding-right', 0);
	}

	// example
	addScrollbarCompensation($('.element-one, .element-two'));

	removeScrollbarCompensation($('.element-one, .element-two'));

	// =========================
	// STANDARD GOOGLE MAP =================================
	// =========================

	function initMap() {
		var coordinates = new google.maps.LatLng(40.712348, -74.006720),
		zoom = 12;

		var map = new google.maps.Map(document.getElementById('js-map'), {
			center: coordinates,
			zoom: zoom,
			disableDefaultUI: true,
			zoomControl: true,
			fullscreenControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},

			// OPTIONAL - styles for theme (https://snazzymaps.com)
			// minify code (https://www.minifier.org)

			// styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		});

		// OPTIONAL - custom icon
		var icon = {
			url: '../img/svg/icon_map_marker.svg',
			scaledSize: new google.maps.Size(50, 50)
		};

		var marker = new google.maps.Marker({
			position: coordinates,
			map: map,

			// OPTIONAL - animation of marker
			// animation: google.maps.Animation.BOUNCE,

			// OPTIONAL - text on marker hover
			// title: 'text on hover',

			// OPTIONAL - custom icon from png or svg
			// icon: icon
		});

		// OPTIONAL - add info window
		var infoWindow = new google.maps.InfoWindow({
			content: '<p>Info window</p>'
		});

		// show info window after click
		/*marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});*/

		// show info window all time
		/*google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
			infoWindow.open(map,marker);
		});*/

		// close info window after click anywhere on the map
		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});

	}

	if ($('#js-map').length) {
		initMap();
	}

	// =========================
	// GOOGLE MAP WITH MULTIPLE MARKER =================================
	// =========================

	function initMapMultipleMarkers() {
		var map = new google.maps.Map(document.getElementById('js-map-multiple-markers'), {
			disableDefaultUI: true,
			zoomControl: true,
			fullscreenControl: true,
			zoomControlOptions: {
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
		});

		// array of markers (with coordinates, name, address)
		var multipleMarkers = [
			{
				lat: 40.679680,
				lng: -73.942175,
				name: 'Name 1',
				address: 'Address 1'
			},
			{
				lat: 40.729391,
				lng: -74.076758,
				name: 'Name 2',
				address: 'Address 2'
			},
			{
				lat: 40.745260,
				lng: -73.997794,
				name: 'Name 3',
				address: 'Address 3'
			}
		];

		var infoWindow = new google.maps.InfoWindow();

		google.maps.event.addListener(map, 'click', function() {
			infoWindow.close();
		});

		// Determine the boundaries of the visible area of the map in accordance with the position of the markers
		var bounds = new google.maps.LatLngBounds();

		// create the markers
		for (var i = 0; i < multipleMarkers.length; i++){

			var latLng = new google.maps.LatLng(multipleMarkers[i].lat, multipleMarkers[i].lng);
			var name = multipleMarkers[i].name;
			var address = multipleMarkers[i].address;

			addMarker(latLng, name, address);

			// Expand the boundaries of our visible area by adding the coordinates of our current marker
			bounds.extend(latLng);
		}

		// Automatically scale the map so that all markers are in the visible area of the map
		map.fitBounds(bounds);

		function addMarker(latLng, name, address) {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				title: name
			});

			google.maps.event.addListener(marker, 'click', function() {
				var contentString = '<div class="infowindow">' +
															'<h5>' + name + '</h5>' +
															'<p>' + address + '</p>' +
														'</div>';

				infoWindow.setContent(contentString);
				infoWindow.open(map, marker);
			});
		}
	}

	if ($('#js-map').length) {
		initMapMultipleMarkers();
	}

	// =========================
	// YOUTUBE THUMBNAIL =================================
	// =========================

	// 1) add thumbnail
	$('.js-youtube-video-thumbnail').each(function() {
		var youtubeVideoSrc = $(this).children('iframe').attr('data-youtube-src'),
				youtubeVideoID = youtubeVideoSrc.split('/').pop();

		$(this).children('.video-thumbnail__overlay').css('background-image', 'url(https://img.youtube.com/vi/' + youtubeVideoID + '/sddefault.jpg)');
	});

	// 2) on click play iframe
	$('.js-youtube-video-thumbnail').on('click' , function() {
		var $this = $(this),
				youtubeVideoSrc = $this.children('iframe').attr('data-youtube-src');

		$this.children('iframe').attr('src', youtubeVideoSrc + '?autoplay=1');
		$this.children('iframe').removeClass('-hide');

		setTimeout(function() {
			$this.children('.video-thumbnail__overlay').addClass('-hide');
		}, 300);
	});

	// =========================
	// VIMEO THUMBNAIL =================================
	// =========================

	// 1) add thumbnail
	$('.js-vimeo-video-thumbnail').each(function() {
		var $this = $(this),
				vimeoVideoID = $this.children('iframe').attr('data-vimeo-src').split('/').pop();

		$.getJSON('https://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', { format: 'json' }, function (data) {
			var thumbnailImg = data[0].thumbnail_large;
			$this.children('.video-thumbnail__overlay').css('background-image', 'url(' + thumbnailImg + ')');
		});
	});

	// 2) on click play iframe
	$('.js-vimeo-video-thumbnail').on('click' , function() {
		var $this = $(this),
				vimeoVideoSrc = $this.children('iframe').attr('data-vimeo-src');

		$this.children('iframe').attr('src', vimeoVideoSrc + '?autoplay=1');
		$this.children('iframe').removeClass('-hide');

		setTimeout(function() {
			$this.children('.video-thumbnail__overlay').addClass('-hide');
		}, 300);
	});

});

}(jQuery));