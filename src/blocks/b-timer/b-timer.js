(() => {
	const countdownTimer = (element, options = {}) => {
		class Timer {
			constructor(element, options) {
				if(!element) return;
	
				this.options = {
					class: 'clock',
					types: 'd,h,m,s',
					effectClass: 'flipped',
					digitWrapper: false,
					date: 14 * 24 * 60 * 60 * 1000,
					...options
				}
	
				this.$shell = element;
				this.rest = new Date(Date.parse(new Date()) + this.options.date);
				this.types = this.options.types.split(',');
				this.interval = null;
				this.digits = {};
				this.init();
			}
	
			current() {
				const diff = this.rest - new Date().getTime(),
					day = Math.floor(diff / (1000 * 60 * 60 * 24)),
					hur = Math.floor((diff / (1000 * 60 * 60)) % 24),
					min = Math.floor((diff / 1000 / 60) % 60),
					sec = Math.floor((diff / 1000) % 60);
	
				const values = { 
					d: { curr: day, next: (day == 0) ? 0 : day - 1 },
					h: { curr: hur, next: (hur == 0) ? 23 : hur - 1 }, 
					m: { curr: min, next: (min == 0) ? 59 : min - 1 }, 
					s: { curr: sec, next: (sec == 0) ? 59 : sec - 1 }
				};
	
				for (const val in values) {
					values[val].curr = ("0" + values[val].curr).slice(-2);
					values[val].next = ("0" + values[val].next).slice(-2);
				}
	
				return { diff, ...values };
			}
	
			update() {
				const values = this.current();
	
				for (const digit in this.digits) {
					const value = values[digit];
					const card = this.digits[digit]
					const before = getComputedStyle(card, ':before');
					const data = card.dataset;
					let timer;
					
					if(! data.timeBefore) {
						data.timeBefore = value.next;
						data.timeAfter = value.curr;
					} else if (data.timeBefore !== value.next) {
						card.classList.add(this.options.effectClass);
						
						timer = setTimeout(() => {
							card.classList.remove(this.options.effectClass);
							data.timeBefore = value.next;
							data.timeAfter = value.curr;
							timer = null;
						}, parseFloat(before.transitionDuration) * 1000);
					}
				}
			}
	
			init() {
				if(! this.$shell.classList.contains(this.options.class))
					this.$shell.classList.add(this.options.class);
	
				this.types.map(type => {
					const $cover = document.createElement('div');
					const $digit = document.createElement('div');
					$cover.className = `${this.options.class}__cover`;
					$digit.className = `${this.options.class}__digit`;

					if(this.options.digitWrapper) {
						$cover.append($digit);
						this.$shell.append($cover);
					} else {
						this.$shell.append($digit);
					}
	
					this.digits[type] = $digit;
				});
	
				this.update();
				this.interval = setInterval(this.update.bind(this), 1000);
			}
		}

		return new Timer(element, options);
	}

	countdownTimer(document.querySelector('.b-timer__inner'), { 
		class: 'b-clock',
		date: 5 * 24 * 60 * 60 * 1000,
		digitWrapper: true
	});

})();