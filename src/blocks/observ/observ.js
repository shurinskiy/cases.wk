(() => {

	const sections = document.querySelectorAll('.observ__section');
	const menu = document.querySelector('.observ__side');

	if (sections && menu) {
		const ul = document.createElement('ul');
		menu.appendChild(ul);
	
		sections.forEach((section, index) => {
			const h2 = section.querySelector('h2');
			const li = document.createElement('li');
			const a = document.createElement('a');
	
			section.id = 'block-' + index;
			a.href = '#' + section.id;
			a.textContent = h2.textContent;
			li.appendChild(a)
			ul.appendChild(li);  
		});
		
		const observer = new IntersectionObserver((items, observer) => {
			items.forEach(item => {
				const a = document.querySelector(`.observ__side a[href='#${item.target.id}']`);
				a.parentNode.classList[item.isIntersecting ? 'add':'remove']('active');
			});
		}, { threshold: 0.4 });
		
		sections.forEach( item => { observer.observe(item) });
	}

})();