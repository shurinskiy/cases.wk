(() => {

	$('.cm-catalog__items').on({
		mouseenter: function() {
			let $self = $(this);
			$self
				.height($self.find(':first-child').outerHeight())
				.addClass('hover');
		},
		mouseleave: function() {
			$(this)
				.removeAttr('style')
				.removeClass('hover');
		}
	}, '.cm-catalog__item');

})();