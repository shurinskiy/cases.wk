import DATA from './q-quiz.json';

(() => {

	const $quiz = $('#q-quiz');
	const $page = $quiz.find('.q-page');
	const $results = $quiz.find('.q-results');
	const $restart = $quiz.find('.q-quiz__btn_restart');
	const $next = $quiz.find('.q-quiz__btn_next');
	const $prev = $quiz.find('.q-quiz__btn_prev');
	let results = {};

	if (!$quiz.length) return;


	// отрисовка текущего блока вопросов
	const renderPage = (index) => {
		$quiz.data('step', index);
		
		// отрисовка
		const getChecked = (id) => results[index]?.includes(id) ? 'checked' : '';

		const renderAnswers = () => DATA[index].answers
			.map((answer, id) =>
				`<label>
					<input type="checkbox" name="${index}" value="${id}" ${getChecked(id)}>
					<span>${answer}</span>
				</label>`
			).join('');

		$page.html(`
			<div class="q-page__item">
				<h4 class="q-page__question">${DATA[index].question}</h4>
				<div class="q-page__answers">${renderAnswers()}</div>				
			</div>
		`);

		// сброс элементов
		$next
			.prop('disabled', Boolean(!results[index] || !results[index].length))
			.add($page)
			.add($results)
			.add($next)
			.add($restart)
			.removeAttr('style');
		
		// убрать кнопку "назад" на первой страничке
		if (!index) $prev.removeAttr('style');

	};


	// отрисовка блока результатов
	const processingResults = () => {
		$quiz.data('step', DATA.length);
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

		// переключение видимости элементов
		$results
			.html(content)
			.add($page.html(''))
			.add($next)
			.add($restart)
			.toggle();
	};


	// обработчик выбора ответа
	$quiz.on('change', 'input', function(e) {
		results[e.target.name] = [];

		$(this)
			.parents('.q-page__answers')
			.find('input[type=checkbox]:checked')
			.each(function(index, el){
				results[e.target.name].push(Number(el.value));
			});

		$next.prop('disabled', Boolean(!results[e.target.name].length));
	});


	// обработчик кнопки "далее"
	$quiz.on('click', '.q-quiz__btn_next', function(e) {
		const nextStep = $quiz.data('step') + 1;

		if (DATA.length <= nextStep) {
			processingResults();			
		} else {
			$prev.show();
			renderPage(nextStep);
		}
	});


	// обработчик кнопки "назад"
	$quiz.on('click', '.q-quiz__btn_prev', function(e) {
		let prevStep = $quiz.data('step') - 1;
		if (prevStep < 0) return;

		renderPage(prevStep);
	});

	
	// обработчик кнопки "рестарт"
	$quiz.on('click', '.q-quiz__btn_restart', function(e) {
		results = {};
		$results
			.html('')
			.add($page)
			.add($next)
			.add($prev)
			.add($restart)
			.removeAttr('style');

		renderPage(0);
	});

	// самый первый вызов
	renderPage(0);
})();