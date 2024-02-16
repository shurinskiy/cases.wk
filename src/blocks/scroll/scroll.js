import { scrollBasedToggle } from "../../js/libs/scroll";

(() => {

	const sticky = document.querySelector('.scroll__items');
	const items = sticky?.querySelectorAll('.scroll__item');

	if (sticky && items)
		scrollBasedToggle(sticky, items, { first: false });

})();