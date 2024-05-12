import DATA from './q-quiz.json';

(() => {

	const $quiz = document.querySelector('#q-quiz');
	if (!$quiz) return;

	const $nodes = {
		page: $quiz.querySelector('.q-page'),
		results: $quiz.querySelector('.q-results'),
		progress: $quiz.querySelector('.q-quiz__progress'),
		restart: $quiz.querySelector('.q-quiz__btn_restart'),
		next: $quiz.querySelector('.q-quiz__btn_next'),
		prev: $quiz.querySelector('.q-quiz__btn_prev')
	}

	let results = {};


	// расчет прогресса
	const countProgress = (results) => {
		let count = Object.values(results).reduce((cnt, res) => cnt + !!res.length, 0);
		return (count / DATA.length * 100) + '%';
	}

	
	// отрисовка текущего блока вопросов
	const renderPage = (index) => {
		$quiz.dataset.step = index;
		Object.values($nodes).map(node => node.removeAttribute('style'));
		
		// определение состояния инпута из объекта с результатами
		const getChecked = (id) => results[index]?.includes(id) ? 'checked' : '';
		// радиокнопка или чекбокс
		const type = DATA[index].radio ? 'radio':'checkbox';
		
		// отрисовка
		const renderAnswers = () => DATA[index].answers
			.map((answer, id) =>
				`<label>
					<input type="${type}" name="${index}" value="${id}" ${getChecked(id)}>
					<span>${answer}</span>
				</label>`
			).join('');

		$nodes.page.innerHTML = 
			`<div class="q-page__item">
				<h4 class="q-page__question">${DATA[index].question}</h4>
				<div class="q-page__answers">${renderAnswers()}</div>				
			</div>`;

		// переключить состояние кнопки "далее"
		$nodes.next.style.display = 'block';
		$nodes.next.toggleAttribute('disabled', Boolean(!results[index] || !results[index].length));
		
		// показать полосу прогресса
		$nodes.progress.style.display = 'block';
		
		// не показывать кнопку "назад" на первой страничке
		if (index) $nodes.prev.style.display = 'block';
	};


	// отрисовка блока результатов
	const processingResults = () => {
		$quiz.dataset.step = DATA.length;
		Object.values($nodes).map(node => node.removeAttribute('style'));
		
		let content = '';

		// отрисовка
		const getAnswers = (index) => results[index]
			.map((result) => `<li class="q-results__answer">${DATA[index].answers[result]}</li>`)
			.join('');

		DATA.forEach((item, index) => {
			content += 
				`<div class="q-results__item">
					<h4 class="q-results__question">${item.question}</h4>
					<ul class="q-results__answers">${getAnswers(index)}</ul>
				</div>`;
		});

		// показать соответствующие элементы
		$nodes.page.innerHTML = '';
		$nodes.results.innerHTML = content;
		$nodes.results.style.display = 'block';
		$nodes.restart.style.display = 'block';
		$nodes.prev.style.display = 'block';
	};


	// обработчик выбора ответа
	$quiz.addEventListener('change', function(e) {
		results[this.dataset.step] = [];
		
		if (e.target.closest('input')) {
			this.querySelectorAll('.q-page__answers input:checked').forEach(input => {
				results[this.dataset.step].push(Number(input.value));
			});

			Object.assign($nodes.progress.querySelector('span').style, { 
				width: countProgress(results)
			});
		
			$nodes.next.toggleAttribute('disabled', Boolean(!results[this.dataset.step].length));
		}
	});


	// обработчик кнопок
	$quiz.addEventListener('click', function(e) {
		
		// кнопка "далее"
		if (e.target.closest('.q-quiz__btn_next')) {
			const nextStep = +this.dataset.step + 1;

			if (DATA.length <= nextStep) {
				processingResults();
			} else {
				$nodes.prev.style.display = 'block';
				renderPage(nextStep);
			}
		}

		// кнопка "назад"
		if (e.target.closest('.q-quiz__btn_prev')) {
			let prevStep = this.dataset.step - 1;
			if (prevStep < 0) return;
	
			renderPage(prevStep);
		}

		// кнопка "рестарт"
		if (e.target.closest('.q-quiz__btn_restart')) {
			results = {};

			renderPage(0);
		}
	});

	// самый первый вызов рендера
	renderPage(0);
})();