import { roughAccordion, smoothAccordion } from "../../js/libs/accordions";

(() => {

	// Аккордеон через смену классов
	document.querySelectorAll('.accordeon_green').forEach((accordion) => {
		roughAccordion(accordion.querySelectorAll('.accordeon__head'), { toggle: true });
	});
	
	// Аккордеон с плавной сменой блоков
	document.querySelectorAll('.accordeon_yellow').forEach((accordion) => {
		smoothAccordion(accordion.querySelectorAll('.accordeon__head'), { toggle: true });
	});
	
	// Аккордеон с плавной сменой блоков, простая реализация
	document.querySelectorAll('.accordeon_blue').forEach((accordion) => {
		let heads = accordion.querySelectorAll('.accordeon__head');
		heads.forEach(head => {
			head.addEventListener('click', function(e) {
				let sibling = head.nextElementSibling;
				heads.forEach(outhead => {(outhead != this) && (outhead.nextElementSibling.style.maxHeight = 0)});
				sibling.style.maxHeight = sibling.scrollHeight + 'px';
			});
		});
	});

})();