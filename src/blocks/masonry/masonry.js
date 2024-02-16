import { masonryBuilder } from "../../js/libs/masonry";

(() => {
	// const breakpoint = window.matchMedia('(min-width:960px)');
	
	const masonry = masonryBuilder(document.querySelector('.masonry__items'), {
		layout: function() {
			this.containerNode.classList.add('masonry__items_builded');
		}
	});

	// breakpoint.addEventListener('change', () => {
	// 	masonry.init(breakpoint.matches);
	// });

})();