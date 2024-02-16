import DATA from './c-calc.json';

(() => {
	const $space = $('#c-calc');
	const $title = $space.find('.c-calc__title');
	const $page = $space.find('.c-page__controls');
	const $prev = $space.find('.c-calc__btn_prev');
	const $next = $space.find('.c-calc__btn_next');
	const choices = ['vop','tech','arch','geologsquare'];
	let results = [];
	let count = [];
	

	// проверка на объект
	const isObject = (item) => (item && typeof item === 'object' && !Array.isArray(item));

	/* формирование объекта текущего исследования через слияние заготовки для него с базовым объектом */
	const mergeDeep = (target, ...sources) => {
		if (!sources.length) return target;
		const source = sources.shift();
	
		if (isObject(target) && isObject(source)) {
			for (const key in source) {
				if (isObject(source[key])) {
					mergeDeep(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			}
		}
		return mergeDeep(target, ...sources);
	}

	const requiredMiss = ($shell) => {
		let done = false;
		$shell.find('[data-required!=""][data-required]').each(function() {
			let match = $(this)
				.find('input:text')
				.filter(function() { return $(this).val() > 0; })
				.add('input:checked', $(this));
			
			if (!match.length)
				done = true;
		});
		return done;
	}

	/* отрисовка страницы текущего исследования */
	const renderPage = (index) => {
		$space.data('step', index);

		// получить объект текущего исследования
		const rows = mergeDeep(DATA.pages[choices[index]].rows, DATA.default);

		// проверка - есть ли это значение в массиве результатов..
		const isInResult = (row, name) => (results[choices[index]] && results[choices[index]][row] && (name in results[choices[index]][row]) || '');

		// получить значение инпута (сразу или при возврате на предыдущую страницу)
		const getValue = (row, name) => {
			if (isInResult(row, name)) {
				return results[choices[index]][row][name];
			}
			return rows[row][name]['value'] ?? ''
		}

		// заголовок текущей страницы
		$title.find('h4').text(DATA.pages[choices[index]].title ?? '');

		// начинаю формировать html текущей страницы
		let html = `<div class="c-page__controls" data-page="${choices[index]}">`;
		for (const row in rows) {
			if (rows.hasOwnProperty(row)) {
				if (!$.isEmptyObject(rows[row])) {
					html += `<div class="c-page__row c-page__row_${row}">
								<h5 class="c-page__name">
									${rows[row]['title'] ?? ''} 
									${rows[row]['required'] && '<span>*</span>'}
								</h5>
								<div class="c-page__inputs" data-required="${rows[row]['required'] ?? ''}">`;
						for (const elem in rows[row]) {
							if (rows[row].hasOwnProperty(elem) && elem !== 'title' && elem !== 'required') {
								html += `<label class="c-page__input-${rows[row][elem]['input'] ?? 'cbox'}">
											<input	
												type="${rows[row][elem]['input'] ?? 'checkbox'}" 
												name="${row}" 
												value="${getValue(row, elem)}" 
												data-name="${elem}" 
												${isInResult(row, elem) && 'checked'}
											/>
											${rows[row][elem]['title'] ?? ''}
										</label>`
							}
						}
					html += `</div>
						</div>`
				}
			}
		}
		html += `</div>`
		
		// добавляю на страницу сформированный html
		$page.html(html);

		// сброс элементов
		$next
			.prop('disabled', Boolean(!results[choices[index]] || requiredMiss($(html))))
			.removeAttr('style');

		// убрать кнопку "назад" на первой страничке
		if (!index) $prev.removeAttr('style');
	};


	// обработчик выбора ответа
	$space.on('change', 'input', function(e) {
		const $shell = $(this).parents('.c-page__controls');
		const page = $shell.data('page');
		results[page] = [];

		$shell
			.find('input:checked')
			.add('input:text')
			.each(function(index, el) {
				if (el.name in results[page]) {
					Object.assign(results[page][el.name], { [el.dataset.name]: el.value });
				} else {
					Object.assign(results[page], {[el.name]: { [el.dataset.name]: el.value }});
				}
			});

		// $next.prop('disabled', Boolean(!Object.keys(results[page]).length));
		$next.prop('disabled', requiredMiss($shell));
	});


	// формирование результатов для отправки
	const processingResults = () => {
		$space.data('step', choices.length);
		return false;
	};


	// обработчик кнопки "далее"
	$space.on('click', '.c-calc__btn_next', function(e) {
		const nextStep = $space.data('step') + 1;
		
		if (choices.length <= nextStep) {
			processingResults();
		} else {
			$prev.show();
			renderPage(nextStep);
		}
	});


	// обработчик кнопки "назад"
	$space.on('click', '.c-calc__btn_prev', function(e) {
		let prevStep = $space.data('step') - 1;
		if (prevStep < 0) return;

		renderPage(prevStep);
	});

	renderPage(0);

})();
