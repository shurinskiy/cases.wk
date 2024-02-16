import { deepParallax } from "../../js/libs/scroll";

(() => {

	const sticky = document.querySelector('.deep__items');
	const items = sticky?.querySelectorAll('.deep__item');

	if (sticky && items)
		deepParallax(sticky, items, { speed: 5, far: 1000, fade: 1.1 });

})();