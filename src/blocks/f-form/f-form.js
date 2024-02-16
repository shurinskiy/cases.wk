import { selectTweaker } from "../../js/libs/selectTweaker";
import Inputmask from "inputmask";

(() => {
	selectTweaker(document.querySelectorAll('.f-form__select'));

	Inputmask({
		"mask": "+7 (999) 999-99-99", 
		showMaskOnHover: false
	}).mask(document.querySelectorAll('input[type="tel"]'));

	$('.f-form__checkbox_toggle').on('change', (e) => $('.f-form__citizenship').toggle());

	$('.f-form__file').on('change', 'input[type="file"]', function(e) {
		let $self = $(this);
		let $label = $self.next('span');
		let $wrapper = $self.parent('.f-form__file');

		if (!! $self.val()) {
			$label.text($self[0].files[0].name);
			$wrapper.addClass('f-form__file_selected');
		} else {
			$label.text('Загрузить');
			$wrapper.removeClass('f-form__file_selected');
		}
	});

})();