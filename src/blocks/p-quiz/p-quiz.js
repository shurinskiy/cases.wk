import DATA from './p-quiz.json';

(() => {

	const $quiz = $('#p-quiz');
	const $page = $quiz.find('.p-page');
	const $results = $quiz.find('.p-results');
	const $progress = $quiz.find('.p-quiz__progress');
	const $restart = $quiz.find('.p-quiz__btn_restart');
	const $next = $quiz.find('.p-quiz__btn_next');
	let results = {};

	if (!$quiz.length) return;


	// отрисовка блока вопросов
	const renderPage = (index) => {
		$quiz.data('step', index);

		const renderAnswers = () => DATA[index].answers
			.map((answer, id) =>
				`<label>
					<input type="radio" name="${index}" value="${index}_${id}">
					<span>${answer.text}</span>
				</label>`
			).join('');

		$page.html(`
			<div class="p-page__item">
				<h4 class="p-page__question">${DATA[index].question}</h4>
				<div class="p-page__answers">${renderAnswers()}</div>				
			</div>
		`);
	};


	// отрисовка блока результатов
	const renderResults = () => {
		let content = '';

		const getCorrect = (answer, index, id) => {
			let classname = '';

			if(!answer.correct && results[index] === `${index}_${id}`) {
				classname = 'invalid';
			} else if (answer.correct) {
				classname = 'valid';
			}

			return classname;
		}

		const getAnswers = (index) => DATA[index].answers
			.map((answer, id) => 
				`<li class="p-results__answer ${getCorrect(answer, index, id)}">${answer.text}</li>`
			)
			.join('');

		DATA.forEach((item, index) => {
			content += 
				`<div class="p-results__item">
					<h4 class="p-results__question">${item.question}</h4>
					<ul class="p-results__answers">${getAnswers(index)}</ul>
				</div>`;
		});

		$results.html(content).show();
	};


	// обработчик выбора ответа
	$quiz.on('change', '.p-page__answers input', function(e) {
		results[e.target.name] = e.target.value;
		$progress.find('span').css({ width: (($quiz.data('step') + 1) / DATA.length * 100) + '%' });
		$next.prop('disabled', false);
	});


	// обработчик кнопки "далее"
	$quiz.on('click', '.p-quiz__btn_next', function(e) {
		const nextStep = $quiz.data('step') + 1;
		
		if (DATA.length <= nextStep) {
			$page.hide();
			$next.hide();
			$progress.hide();
			$restart.show();
			renderResults();			
		} else {
			renderPage(nextStep);
		}
		
		$next.prop('disabled', true);
	});

	
	// обработчик кнопки "рестарт"
	$quiz.on('click', '.p-quiz__btn_restart', function(e) {
		results = {};
		$results
			.html('')
			.add($page)
			.add($next)
			.add($restart)
			.add($progress)
			.add($progress.find('span'))
			.removeAttr('style')

		renderPage(0);
	});

	renderPage(0);
})();