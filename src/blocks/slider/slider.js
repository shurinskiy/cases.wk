import Swiper, { Navigation, Pagination, Scrollbar, Mousewheel } from 'swiper';

(() => {

	const swiper1 = new Swiper(".slider__items-1", {
		modules: [Navigation, Pagination],
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.slider__items-1 .slider__next',
			prevEl: '.slider__items-1 .slider__prev',
		},
		pagination: {
			el: '.slider__pagination',
			bulletClass: 'slider__dot',
			bulletActiveClass: 'active',
			clickable: true,
			renderBullet: (index, cls) => `<span class='${cls}'>${index + 1}</span>`
		}
	});

	const swiper2 = new Swiper(".slider__items-2", {
		modules: [Pagination],
		slidesPerView: 1,
		loop: true,
		pagination: {
			type: 'fraction',
			el: '.slider__pagination',
			renderFraction: (currentCls, totalCls) => `Фото <span class='${currentCls}'></span> из <span class='${totalCls}'></span>`
		}
	});

	const swiper3 = new Swiper(".slider__items-3", {
		modules: [Pagination],
		slidesPerView: 1,
		loop: true,
		pagination: {
			type: 'progressbar',
			el: '.slider__pagination',
			progressbarFillClass: 'slider__progress'
		}
	});

	const swiper4 = new Swiper(".slider__items-4", {
		modules: [Scrollbar],
		slidesPerView: 1,
		scrollbar: {
			el: '.slider__scrollbar',
			dragClass: 'slider__scrollbar-handle',
			draggable: true
		}
	});

	const swiper5 = new Swiper(".slider__items-5", {
		modules: [Pagination],
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: '.slider__pagination',
			bulletClass: 'slider__thumb',
			bulletActiveClass: 'active',
			clickable: true,
			renderBullet: function (index, cls) {
				const img_src = this.$el.find(`[data-swiper-slide-index="${index}"]`).find('img')[0].src;
				return `<span class='${cls}' style='background-image:url(${img_src})'></span>`;
			}
		}
	});

	const swiper6 = new Swiper(".slider__items-6", {
		modules: [Navigation, Mousewheel],
		slidesPerView: 3.5,
		spaceBetween: 30,
		mousewheel: true,
		// loop: true,
		navigation: {
			nextEl: '.slider__items-6 .slider__next',
			prevEl: '.slider__items-6 .slider__prev',
			disabledClass: 'disabled'
		}
	});

})();