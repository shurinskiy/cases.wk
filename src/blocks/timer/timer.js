(() => {
	'use strict';
  
	const els = {
		s: initElements('s'),
		m: initElements('m'),
		h: initElements('h')
	};
  
	function initElements(type) {
		const els = [{}, {}];
	
		if (!['s', 'm', 'h'].includes(type)) return els;
	
		const target = document.querySelector(`.timer__clock_${type}`);
	
		if (!target) return els;
	
		let el;
	
		el = els[0];
		el.digit = target.querySelector('.timer__card:nth-child(1)');
		el.card = el.digit.querySelector('.t-card__digit');
		el.cardFaces = el.card.querySelectorAll('.t-card__face');
		el.cardFaceA = el.cardFaces[0];
		el.cardFaceB = el.cardFaces[1];
	
		el = els[1];
		el.digit = target.querySelector('.timer__card:nth-child(2)');
		el.card = el.digit.querySelector('.t-card__digit');
		el.cardFaces = el.card.querySelectorAll('.t-card__face');
		el.cardFaceA = el.cardFaces[0];
		el.cardFaceB = el.cardFaces[1];
	
		return els;
	}
  
	(function runClock() {
		const date = new Date();
		const now = {
			h: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds()
		};
		const updateNow = (h, m, s) => {
			if (h) {
				now.h = h;
				now.h0 = now.h[0];
				now.h1 = now.h[1];
			}
			if (m) {
				now.m = m;
				now.m0 = now.m[0];
				now.m1 = now.m[1];
			}
			if (s) {
				now.s = s;
				now.s0 = now.s[0];
				now.s1 = now.s[1];
			}
		}
		updateNow(
			now.h < 10 ? `0${now.h}` : `${now.h}`,
			now.m < 10 ? `0${now.m}` : `${now.m}`,
			now.s < 10 ? `0${now.s}` : `${now.s}`,
		);
		// console.log(`${now.h0}${now.h1}:${now.m0}${now.m1}:${now.s0}${now.s1}`);
	
		for (const t of Object.keys(els)) {
			for (const i of ['0', '1']) {
				const curr = now[`${t}${i}`];

				let next = +curr + 1;

				if (t === 'h') {
					if (i === '0') next = next <= 2 ? `${next}` : '0';
					if (i === '1') next = next <= 3 ? `${next}` : '0';
				}
				if (t === 'm') {
					if (i === '0') next = next <= 5 ? `${next}` : '0';
					if (i === '1') next = next <= 9 ? `${next}` : '0';
				}
				if (t === 's') {
					if (i === '0') next = next <= 5 ? `${next}` : '0';
					if (i === '1') next = next <= 9 ? `${next}` : '0';
				}

				const el = els[t][i];
				
				if (el && el.digit) {
					if (!el.digit.dataset.digitAfter) {
						el.digit.dataset.digitAfter = curr;
						el.cardFaceA.textContent = el.digit.dataset.digitAfter;
						el.digit.dataset.digitBefore = next;
						el.cardFaceB.textContent = el.digit.dataset.digitBefore;
					} else if (el.digit.dataset.digitAfter !== curr) {
						el.card.addEventListener('transitionend',
							function () {
								el.digit.dataset.digitAfter = curr;
								el.cardFaceA.textContent = el.digit.dataset.digitAfter;
				
								const cardClone = el.card.cloneNode(true);
								cardClone.classList.remove('flipped');
								
								el.digit.replaceChild(cardClone, el.card);
								el.card = cardClone;
								el.cardFaces = el.card.querySelectorAll('.t-card__face');
								el.cardFaceA = el.cardFaces[0];
								el.cardFaceB = el.cardFaces[1];
				
								el.digit.dataset.digitBefore = next;
								el.cardFaceB.textContent = el.digit.dataset.digitBefore;
							},
							{ once: true }
						);
						if (!el.card.classList.contains('flipped')) {
							el.card.classList.add('flipped');
						}
					}
				}
			}
		}
	
		setTimeout(runClock, 1000);
	})();
	
})();