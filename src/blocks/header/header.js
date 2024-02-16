import scrollLock from 'scroll-lock';
import { menuToggle } from "../../js/libs/menuToggle";

(() => {
	const $menu = document.querySelector('.header');
	const $toggles = document.querySelectorAll('.header__toggle, .header__close');
	
	const menu = menuToggle($menu, $toggles, {
		scrollLock: scrollLock,
		class: 'opened'
	});

})();