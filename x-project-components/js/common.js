$(document).ready(function() {
	// SHOW CODE BUTTON ARROW
	$('.collapse').on('show.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').addClass('-open');
	})

	$('.collapse').on('hide.bs.collapse', function () {
		$(this).parent('.component-block-usage').find('.btn').removeClass('-open');
	})

	// PROGRESS BAR
	function progressBar() {
		var winScroll = document.body.scrollTop || document.documentElement.scrollTop,
				height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
				scrolled = (winScroll / height) * 100;
		document.getElementById('progress-bar').style.width = scrolled + "%";
	}

	window.onscroll = function() {
		progressBar()
	};

	// SEARCH
	$('.js-search-input').hideseek({
		highlight: true,
		nodata: 'No results found'
	});

	// scroll to element after search
	$('.js-search-input').on('_after', function() {
		var inputVal = $(this).val();

		$('.js-list-group > .list-group-item').each(function() {
			if ($(this).is(':visible')) {

				// scroll
				$('html, body').animate({
					scrollTop: $($(this).attr("href")).offset().top
				}, 0);

				// highlighting
				if ($(this).text() !== 'No results found' && inputVal !== '') {
					var target = $(this).attr('href').substring(1);

					$('.component-block-wrap > .list-group-item').removeClass('-highlighting');

					$('#'+target+'').find('.section-title').addClass('-highlighting');

					setTimeout(function(){
						$('#'+target+'').find('.section-title').removeClass('-highlighting');
					}, 1000);
				}

				return false;
			}
		});
	});

	// ADD HIGHLIGHTING AFTER ANCHOR
	$('.js-list-group > .list-group-item').on('click', function() {
		var target = $(this).attr('href').substring(1);

		$('.component-block-wrap > .list-group-item').removeClass('-highlighting');

		$('#'+target+'').find('.section-title').addClass('-highlighting');

		setTimeout(function(){
			$('#'+target+'').find('.section-title').removeClass('-highlighting');
		}, 1000);
	});

	// SCROLL TOP BUTTON HIDE ON < 1500
	function scrollTopButtonHide() {
		if ($(window).width() < 1500) {

			$(window).on('scroll', function() {
				if ($(this).scrollTop() > 100) {
					$('.js-scroll-top-button').addClass('-show');
				} else {
					$('.js-scroll-top-button').removeClass('-show');
				}
			});

			if ($(document).scrollTop() > 100) {
				$('.js-scroll-top-button').addClass('-show');
			}

		}
	}

	scrollTopButtonHide();

	$(window).on('resize', function() {
		scrollTopButtonHide();
	});

	// SCROLL TOP BUTTON WITH FOOTER
	function scrollTopBtnWithFooter() {
		$(window).on('scroll', function() {
			if ($(window).width() < 1500) {
					var pageHeight = $(document).height(),
							bottomOfPage = $(document).scrollTop() + $(window).height(),
							footerHeight = $('.js-footer').outerHeight();

					if (pageHeight === bottomOfPage) {
						$('.js-scroll-top-button').css('bottom', footerHeight);
					} else {
						$('.js-scroll-top-button').css('bottom', 0);
					}
			} else {
				$('.js-scroll-top-button').css('bottom', 0);
			}
		});
	}

	scrollTopBtnWithFooter();

	$(window).on('resize', function() {
		scrollTopBtnWithFooter()
	});

	// SIDE MENU ON MOBILE
	var slideout = new Slideout({
		'panel': document.getElementById('main-wrap'),
		'menu': document.getElementById('side-navigation-mobile'),
		'padding': 256,
		'tolerance': 70,
		'side': 'right',
		'touch': false
	});

	$('.js-hamburger-menu-item').on('click', function() {
		$(this).toggleClass('-open-menu');
		slideout.toggle();
	});

	// translate fixed element
	var fixed = document.querySelectorAll('.js-header, .js-scroll-top-button');

	slideout.on('translate', function(translated) {
		for (var i = 0; i < fixed.length; i++) {
			fixed[i].style.transform = 'translateX(' + translated + 'px)';;
		}
	});

	slideout.on('beforeopen', function () {
		for (var i = 0; i < fixed.length; i++) {
			fixed[i].style.transition = 'transform 300ms ease';
			fixed[i].style.transform = 'translateX(-256px)';
		}
	});

	slideout.on('beforeclose', function () {
		for (var i = 0; i < fixed.length; i++) {
			fixed[i].style.transition = 'transform 300ms ease';
			fixed[i].style.transform = 'translateX(0px)';
		}
	});

	slideout.on('open', function () {
		for (var i = 0; i < fixed.length; i++) {
			fixed[0].style.transition = '';
		}
	});

	slideout.on('close', function () {
		for (var i = 0; i < fixed.length; i++) {
			fixed[i].style.transition = '';
		}
	});

	// overlay
	function close(eve) {
		eve.preventDefault();
		slideout.close();
	}

	slideout
		.on('beforeopen', function() {
			this.panel.classList.add('-open');
		})
		.on('open', function() {
			this.panel.addEventListener('click', close);
		})
		.on('beforeclose', function() {
			this.panel.classList.remove('-open');
			this.panel.removeEventListener('click', close);
			$('.js-hamburger-menu-item').removeClass('-open-menu');
		});

	$('.js-list-group .list-group-item').on('click', function() {
		slideout.close();
	});

	// SCROLLSPY
	$('body').scrollspy({target: '.js-scroll-spy'});

	// TAB-SIZE POLYFILL
	var tabSize = 2;
	var codeElements = document.getElementsByTagName('code'),
			pre = document.getElementsByTagName('pre'),
			e = document.createElement('i');

	if(e.style.tabSize !== '' && e.style.MozTabSize !== '' && e.style.oTabSize !== '')
	{
		replaceTabs(codeElements);
		replaceTabs(pre);
	}

	function replaceTabs(ele)
	{
		for(var i = 0; i < ele.length; i++)
		{
			ele[i].innerHTML = ele[i].innerHTML.replace(/\t/g, repeat(" ", tabSize));
		}
	}

	function repeat(st, n) {
		var s = "";
		while (--n >= 0) {
			s += st
		}
		return s;
	}

	// POSITION STICKY POLIFILL
	var elements = $('.js-side-navigation');
	Stickyfill.add(elements);

	// CHANGELOG TABLE MAX HEIGHT
	var changelogTableItems = $('.js-changelog-table tbody > tr').length,
			rowsToShow = 4,
			changelogTableMaxHeight = 0;

	if (changelogTableItems > rowsToShow) {
		$('.js-changelog-table tbody > tr').each(function(index) {
			if (index + 1 > rowsToShow) {
				return false;
			}

			var changelogTableRows = $('.js-changelog-table tbody > tr').get(index);
					changelogTableMaxHeight = changelogTableMaxHeight + $(changelogTableRows).height();
		});

		var changelogTableHeadHeight = $('.js-changelog-table thead').height();

		$('.js-changelog-table').css('max-height', changelogTableMaxHeight + changelogTableHeadHeight);

	} else {
		$('.js-changelog-table').css('max-height', 'auto');
	}

	// SET CURRENT YEAR IN COPYRIGHT
	var currentYear = (new Date()).getFullYear();
	$('.js-set-current-year').text(currentYear);

});