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
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

				// Smooth scroll to section
					var target = $this.attr('href');
					var $target = $(target);
					
					if ($target.length) {
						$('html, body').animate({
							scrollTop: $target.offset().top
						}, 800, 'swing', function() {
							// Remove locked class after animation completes
							$this.removeClass('active-locked');
						});
					}

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 800,
			offset: 0
		});

	// Handle all internal links for smooth scrolling
		$('a[href^="#"]').on('click', function(e) {
			var target = $(this).attr('href');
			
			// Only handle links that start with # and are not just #
			if (target.length > 1) {
				var $target = $(target);
				
				if ($target.length) {
					e.preventDefault();
					$('html, body').animate({
						scrollTop: $target.offset().top
					}, 800, 'swing');
				}
			}
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