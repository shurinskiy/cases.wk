(() => {

	document.querySelector('.video__box')?.addEventListener('click', function(e) {
		let player = this.querySelector('iframe');

		if (!player.src && e.target.classList.contains('video__play')) {
			player.src = e.target.dataset.youtubeSrc;
			e.target.remove();
		}
	});

})();
