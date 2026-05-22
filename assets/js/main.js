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

	// Theme Toggle Function
		function initTheme() {
			var savedTheme = localStorage.getItem('theme');
			if (savedTheme === 'dark') {
				document.body.classList.add('dark-theme');
				updateThemeIcon(true);
			}
		}

		window.toggleTheme = function() {
			var body = document.body;
			var isDark = body.classList.toggle('dark-theme');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			updateThemeIcon(isDark);
		};

		function updateThemeIcon(isDark) {
			var icon = document.getElementById('themeIcon');
			if (icon) {
				icon.className = isDark ? 'icon solid fa-sun' : 'icon solid fa-moon';
			}
		}

		// Initialize theme on page load
		initTheme();

	// Form Validation
		function initFormValidation() {
			var form = document.getElementById('contactForm');
			if (!form) return;

			var nameInput = document.getElementById('name');
			var emailInput = document.getElementById('email');
			var messageInput = document.getElementById('message');

			// Real-time validation
			if (nameInput) {
				nameInput.addEventListener('blur', function() {
					validateField(this, 'nameError', function(value) {
						return value.trim().length > 0;
					});
				});
			}

			if (emailInput) {
				emailInput.addEventListener('blur', function() {
					validateField(this, 'emailError', function(value) {
						var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						return emailRegex.test(value);
					});
				});
			}

			if (messageInput) {
				messageInput.addEventListener('blur', function() {
					validateField(this, 'messageError', function(value) {
						return value.trim().length >= 10;
					});
				});
			}

			// Form submission
			form.addEventListener('submit', function(e) {
				e.preventDefault();
				
				var isNameValid = validateField(nameInput, 'nameError', function(value) {
					return value.trim().length > 0;
				});
				
				var isEmailValid = validateField(emailInput, 'emailError', function(value) {
					var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					return emailRegex.test(value);
				});
				
				var isMessageValid = validateField(messageInput, 'messageError', function(value) {
					return value.trim().length >= 10;
				});

				if (isNameValid && isEmailValid && isMessageValid) {
					// Show success message
					alert('Thank you for your message! I will get back to you soon.');
					form.reset();
					[nameInput, emailInput, messageInput].forEach(function(input) {
						input.classList.remove('success', 'error');
					});
				}
			});
		}

		function validateField(input, errorId, validationFn) {
			var errorElement = document.getElementById(errorId);
			var isValid = validationFn(input.value);

			if (isValid) {
				input.classList.remove('error');
				input.classList.add('success');
				if (errorElement) {
					errorElement.classList.remove('show');
				}
			} else {
				input.classList.remove('success');
				input.classList.add('error');
				if (errorElement) {
					errorElement.classList.add('show');
				}
			}

			return isValid;
		}

		window.addEventListener('load', initFormValidation);

	// Typewriter Effect
		function typewriterEffect() {
			var element = document.getElementById('typewriter');
			if (!element) return;
			
			var text = 'Shengkun Huang';
			var index = 0;
			var speed = 150;
			
			function type() {
				if (index < text.length) {
					element.textContent += text.charAt(index);
					index++;
					setTimeout(type, speed);
				}
			}
			
			type();
		}

		// Start typewriter effect on page load
		window.addEventListener('load', function() {
			setTimeout(typewriterEffect, 500);
		});

	// Lightbox Function
		window.openLightbox = function(imgSrc, caption) {
			var lightbox = document.getElementById('lightbox');
			var lightboxImg = document.getElementById('lightbox-img');
			var lightboxCaption = document.getElementById('lightbox-caption');
			
			if (lightbox && lightboxImg) {
				lightbox.classList.add('active');
				lightboxImg.src = imgSrc;
				if (lightboxCaption && caption) {
					lightboxCaption.textContent = caption;
				}
				document.body.style.overflow = 'hidden';
			}
		};

		window.closeLightbox = function() {
			var lightbox = document.getElementById('lightbox');
			if (lightbox) {
				lightbox.classList.remove('active');
				document.body.style.overflow = 'auto';
			}
		};

		// Close lightbox when clicking outside the image
		window.addEventListener('click', function(e) {
			var lightbox = document.getElementById('lightbox');
			if (e.target === lightbox) {
				closeLightbox();
			}
		});

		// Add click event to portfolio images
		window.addEventListener('load', function() {
			var portfolioImages = document.querySelectorAll('.item .image img');
			portfolioImages.forEach(function(img) {
				img.style.cursor = 'pointer';
				img.addEventListener('click', function() {
					var src = this.getAttribute('src');
					var alt = this.getAttribute('alt');
					openLightbox(src, alt);
				});
			});

			// Animate skill progress bars
			var skillBars = document.querySelectorAll('.skill-progress');
			skillBars.forEach(function(bar) {
				var percent = bar.getAttribute('data-percent');
				setTimeout(function() {
					bar.style.width = percent;
				}, 300);
			});
		});

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