(function (window, document) {
	'use strict';

	function addPassiveListener(target, eventName, handler) {
		target.addEventListener(eventName, handler, { passive: true });
	}

	function rafThrottle(callback) {
		var queued = false;

		return function () {
			if (queued) {
				return;
			}

			queued = true;
			window.requestAnimationFrame(function () {
				queued = false;
				callback();
			});
		};
	}

	function safePlay(video) {
		if (!video || typeof video.play !== 'function') {
			return;
		}

		var playPromise = video.play();
		if (playPromise && typeof playPromise.catch === 'function') {
			playPromise.catch(function () {});
		}
	}

	function initHeroLottie() {
		var heroLottieContainer = document.querySelector('.lottie-container-hero');
		if (!heroLottieContainer || !window.lottie || heroLottieContainer.dataset.lottieLoaded) {
			return;
		}

		heroLottieContainer.dataset.lottieLoaded = 'true';
		window.lottie.loadAnimation({
			container: heroLottieContainer,
			renderer: 'svg',
			loop: true,
			autoplay: true,
			path: './assets/json/technology/ai-tech-desktop.json'
		});
	}

	function backtotop() {
		var header = document.querySelector('.bs-header');
		if (!header) {
			return;
		}

		var toggleHeaderState = function () {
			header.classList.toggle('sticked', window.scrollY > 100);
		};

		toggleHeaderState();
		addPassiveListener(window, 'scroll', toggleHeaderState);
	}

	function testimonialSlider() {
		var sliderElement = document.querySelector('.testimonial-swiper');
		if (!sliderElement || typeof window.Swiper === 'undefined') {
			return;
		}

		var loaded = new WeakSet();

		function updatePagination(swiper) {
			var bullets = document.querySelectorAll('.testimonial-pagination span');
			bullets.forEach(function (bullet) {
				bullet.classList.remove('swiper-pagination-bullet-active');
			});

			var activeIndex = swiper.realIndex % 3;
			if (bullets[activeIndex]) {
				bullets[activeIndex].classList.add('swiper-pagination-bullet-active');
			}
		}

		function playLottieInActiveSlide(swiper) {
			var activeSlide = swiper.slides[swiper.activeIndex];
			if (!activeSlide || !window.lottie) {
				return;
			}

			var container = activeSlide.querySelector('.lottie-container-inner');
			if (container && !loaded.has(container)) {
				window.lottie.loadAnimation({
					container: container,
					renderer: 'svg',
					loop: true,
					autoplay: true,
					path: './assets/json/linear-gradient-testimonial.json'
				});
				loaded.add(container);
			}
		}

		new window.Swiper('.testimonial-swiper', {
			slidesPerView: 1.6,
			spaceBetween: 120,
			centeredSlides: true,
			loop: true,
			loopedSlides: 3,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			breakpoints: {
				360: { slidesPerView: 1.2, spaceBetween: 12 },
				768: { slidesPerView: 1.2, spaceBetween: 40 },
				1024: { slidesPerView: 1.2, spaceBetween: 60 },
				1025: { slidesPerView: 1.6, spaceBetween: 120 }
			},
			pagination: {
				el: '.swiper-pagination.testimonial-pagination',
				clickable: true,
				renderBullet: function (index, className) {
					return index < 3 ? '<span class="' + className + '" data-bullet-index="' + index + '"></span>' : '';
				}
			},
			on: {
				init: function () {
					playLottieInActiveSlide(this);
				},
				slideChange: function () {
					updatePagination(this);
					playLottieInActiveSlide(this);
				}
			}
		});
	}

	function testimonialMobileSlider() {
		if (!document.querySelector('.testimonial-swiper-mob') || typeof window.Swiper === 'undefined') {
			return;
		}

		new window.Swiper('.testimonial-swiper-mob', {
			loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination.works-pagination',
				clickable: true
			},
			navigation: {
				nextEl: '.testimonial-swiper-mob .swiper-navigation .next',
				prevEl: '.testimonial-swiper-mob .swiper-navigation .prev'
			},
			mousewheel: { releaseOnEdges: true }
		});
	}

	function aosAnimation() {
		var elements = document.querySelectorAll('[data-aos]');
		if (!elements.length) {
			return;
		}

		if (window.innerWidth >= 1025 && window.AOS) {
			window.AOS.init({ once: true });
			return;
		}

		elements.forEach(function (element) {
			element.removeAttribute('data-aos');
			element.removeAttribute('data-aos-delay');
		});
	}

	function heroSlider() {
		if (!document.querySelector('.heroSlider') || typeof window.Swiper === 'undefined') {
			return;
		}

		new window.Swiper('.heroSlider', {
			loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			autoplay: {
				delay: 4000,
				disableOnInteraction: false
			}
		});
	}

	function drivenApproachSlider() {
		var sliderSection = document.querySelector('.drivenApproachSlider');
		if (!sliderSection || typeof window.Swiper === 'undefined') {
			return;
		}

		var swiper = new window.Swiper('.drivenApproachSlider', {
			loop: true,
			effect: 'fade',
			fadeEffect: { crossFade: true },
			navigation: {
				nextEl: '.swiper-button-next.driven-approach-next',
				prevEl: '.swiper-button-prev.driven-approach-prev'
			},
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			on: {
				slideChangeTransitionStart: function () {
					document.querySelectorAll('.drivenApproachSlider video').forEach(function (video) {
						video.pause();
						video.currentTime = 0;
					});
				},
				slideChangeTransitionEnd: function () {
					var activeSlide = document.querySelector('.drivenApproachSlider .swiper-slide-active');
					var video = activeSlide ? activeSlide.querySelector('video') : null;
					safePlay(video);
				}
			}
		});

		swiper.autoplay.stop();

		if ('IntersectionObserver' in window) {
			var observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						swiper.slideTo(0, 0);
						swiper.autoplay.start();
						observer.unobserve(sliderSection);
					}
				});
			}, { threshold: 0.3 });

			observer.observe(sliderSection);
		} else {
			swiper.autoplay.start();
		}
	}

	function applyRightSpacing() {
		var container = document.querySelector('.container');
		var targets = document.querySelectorAll('.container-left-space-target');
		if (!container || !targets.length) {
			return;
		}

		var containerRect = container.getBoundingClientRect();
		var rightGap = window.innerWidth - containerRect.right;

		targets.forEach(function (target) {
			target.style.marginLeft = Math.max(rightGap, 0) + 'px';
			target.style.paddingLeft = '12px';
		});
	}

	function initHeaderHideOnScroll() {
		var doc = document.documentElement;
		var header = document.getElementById('header');
		if (!header) {
			return;
		}

		var previousScroll = window.scrollY || doc.scrollTop;
		var previousDirection = 0;

		var checkScroll = function () {
			var currentScroll = window.scrollY || doc.scrollTop;
			var direction = currentScroll > previousScroll ? 2 : 1;

			if (direction !== previousDirection) {
				if (direction === 2 && currentScroll > 52) {
					header.classList.add('hide');
				} else if (direction === 1) {
					header.classList.remove('hide');
				}
				previousDirection = direction;
			}

			previousScroll = currentScroll;
		};

		addPassiveListener(window, 'scroll', checkScroll);
	}

	function initWordSlider() {
		var wordList = document.querySelector('.word-list');
		var words = document.querySelectorAll('.word-list .word');
		if (!wordList || words.length < 2) {
			return;
		}

		var wordHeight = words[0].offsetHeight;
		var wordCount = words.length;
		wordList.appendChild(words[0].cloneNode(true));

		var currentIndex = 0;
		window.setInterval(function () {
			currentIndex += 1;
			wordList.style.transition = 'transform 0.5s ease-in-out';
			wordList.style.transform = 'translateY(-' + (currentIndex * wordHeight) + 'px)';

			if (currentIndex === wordCount) {
				window.setTimeout(function () {
					wordList.style.transition = 'none';
					wordList.style.transform = 'translateY(0)';
					currentIndex = 0;
				}, 600);
			}
		}, 3000);
	}

	function setBackground() {
		document.querySelectorAll('.set-bg').forEach(function (element) {
			var desktopBackground = element.getAttribute('data-img');
			var mobileBackground = element.getAttribute('data-mob-img');
			var background = window.innerWidth > 767.98 || !mobileBackground ? desktopBackground : mobileBackground;

			if (background) {
				element.style.backgroundImage = 'url(' + background + ')';
			}
		});
	}

	function adjustSpaceTop() {
		var header = document.getElementById('header');
		if (!header) {
			return;
		}

		var headerHeight = header.offsetHeight;
		document.querySelectorAll('.space-top').forEach(function (element) {
			element.style.paddingTop = headerHeight + 'px';
		});
	}

	function initResponsiveBannerVideo() {
		var banner = document.querySelector('.bs-banner');
		if (!banner) {
			return;
		}

		var isMobile = window.innerWidth <= 992;
		var activeSelector = isMobile ? '.mobile-video' : '.desk-video';
		var inactiveSelector = isMobile ? '.desk-video' : '.mobile-video';
		var inactiveVideo = banner.querySelector(inactiveSelector);
		var activeVideo = banner.querySelector(activeSelector);

		if (inactiveVideo) {
			inactiveVideo.remove();
		}

		if (!activeVideo) {
			return;
		}

		var source = activeVideo.querySelector('source[data-src]');
		if (source && !source.getAttribute('src')) {
			source.setAttribute('src', source.dataset.src);
			activeVideo.load();
		}

		safePlay(activeVideo);
	}

	function initResponsiveSourceVideos() {
		document.querySelectorAll('.responsive-video').forEach(function (video) {
			var source = video.querySelector('source');
			if (!source) {
				return;
			}

			var src = window.innerWidth <= 768 ? video.getAttribute('data-mobile') : video.getAttribute('data-desktop');
			if (!src || source.getAttribute('src') === src) {
				return;
			}

			source.setAttribute('src', src);
			video.load();
		});
	}

	function optimizeImages() {
		var criticalContainers = '.bs-header,.offcanvas-header,.bs-banner,.contact-section,.blog-hero,.bio-ai-tech-banner';

		document.querySelectorAll('img').forEach(function (image, index) {
			if (!image.hasAttribute('decoding')) {
				image.setAttribute('decoding', 'async');
			}

			if (image.closest(criticalContainers) || index < 4) {
				if (!image.hasAttribute('fetchpriority')) {
					image.setAttribute('fetchpriority', 'high');
				}
				return;
			}

			if (!image.hasAttribute('loading')) {
				image.setAttribute('loading', 'lazy');
			}
		});
	}

	function optimizeVideos() {
		var observer = null;

		if ('IntersectionObserver' in window) {
			observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					var video = entry.target;

					if (entry.isIntersecting) {
						safePlay(video);
					} else if (!video.closest('.swiper-slide-active,.bs-banner,.contact-section')) {
						video.pause();
					}
				});
			}, { rootMargin: '200px 0px' });
		}

		document.querySelectorAll('video').forEach(function (video) {
			var isCritical = !!video.closest('.bs-banner,.contact-section');

			if (!video.hasAttribute('playsinline')) {
				video.setAttribute('playsinline', '');
			}

			if (!isCritical && !video.hasAttribute('preload')) {
				video.setAttribute('preload', 'metadata');
			}

			if (observer && video.autoplay && !isCritical) {
				video.pause();
				observer.observe(video);
			}
		});
	}

	function initMediaOptimizations() {
		initResponsiveBannerVideo();
		initResponsiveSourceVideos();
		optimizeImages();
		optimizeVideos();
	}

	var handleResize = rafThrottle(function () {
		setBackground();
		applyRightSpacing();
		adjustSpaceTop();
		initResponsiveSourceVideos();
	});

	document.addEventListener('DOMContentLoaded', function () {
		initHeroLottie();
		backtotop();
		testimonialSlider();
		testimonialMobileSlider();
		aosAnimation();
		heroSlider();
		drivenApproachSlider();
		setBackground();
		applyRightSpacing();
		adjustSpaceTop();
		initHeaderHideOnScroll();
		initWordSlider();
		initMediaOptimizations();
	});

	addPassiveListener(window, 'resize', handleResize);
})(window, document);