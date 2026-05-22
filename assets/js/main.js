/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scroll Animation
		function fadeInOnScroll() {
			var elements = document.querySelectorAll('.fade-in');
			elements.forEach(function(element) {
				var elementTop = element.getBoundingClientRect().top;
				var elementVisible = 150;
				
				if (elementTop < window.innerHeight - elementVisible) {
					element.classList.add('visible');
				}
			});
		}

		window.addEventListener('scroll', fadeInOnScroll);
		window.addEventListener('load', fadeInOnScroll);

	// Scroll Progress Bar
		function updateScrollProgress() {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			var scrollPercent = (scrollTop / scrollHeight) * 100;
			var progressBar = document.getElementById('scrollProgress');
			
			if (progressBar) {
				progressBar.style.width = scrollPercent + '%';
			}
		}

		window.addEventListener('scroll', updateScrollProgress);
		window.addEventListener('load', updateScrollProgress);

	// Back to Top Button
		function toggleBackToTop() {
			var backToTopBtn = document.getElementById('backToTop');
			if (backToTopBtn) {
				if (window.pageYOffset > 300) {
					backToTopBtn.classList.add('visible');
				} else {
					backToTopBtn.classList.remove('visible');
				}
			}
		}

		window.addEventListener('scroll', toggleBackToTop);

	// Scroll to Top Function
		window.scrollToTop = function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800, 'swing');
		};

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.on('click', function(e) {
				var $this = $(this);
				var href = $this.attr('href');

				// Only handle links to other pages (not # anchors)
				if (href && href.charAt(0) !== '#' && !href.includes('.html#')) {
					// Let the browser handle normal page navigation
					return;
				}

				// External link? Bail.
				if (href.charAt(0) != '#')
					return;

				// Prevent default for anchor links on same page
				e.preventDefault();

				// Deactivate all links.
				$nav_a.removeClass('active');

				// Activate link
				$this.addClass('active');

				// Smooth scroll to section (for same-page anchors)
				var target = href;
				var $target = $(target);
				
				if ($target.length) {
					$('html, body').animate({
						scrollTop: $target.offset().top
					}, 800, 'swing');
				}
			});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 800,
			offset: 0
		});

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);