import { preloadingBar } from "../../js/libs/preloader";

(() => {
	preloadingBar({ name: 'preloader', area: 'body' });

	if (document.querySelector('.preloader')) {
		const vh = window.innerHeight * 0.01;
	
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});
	}

})();