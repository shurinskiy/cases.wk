import DATA from './p-quiz.json';

(() => {

	const $quiz = document.querySelector('#p-quiz');
	if (!$quiz) return;

	const $page = $quiz.querySelector('.p-page');
	const $results = $quiz.querySelector('.p-results');
	const $progress = $quiz.querySelector('.p-quiz__progress');
	const $restart = $quiz.querySelector('.p-quiz__btn_restart');
	const $next = $quiz.querySelector('.p-quiz__btn_next');
	let results = {};

	// отрисовка блока вопросов
	const renderPage = (index) => {
		$quiz.dataset.step = index;

		const renderAnswers = () => DATA[index].answers
			.map((answer, id) =>
				`<label>
					<input type="radio" name="${index}" value="${index}_${id}">
					<span>${answer.text}</span>
				</label>`
			).join('');

		$page.innerHTML = 
			`<div class="p-page__item">
				<h4 class="p-page__question">${DATA[index].question}</h4>
				<div class="p-page__answers">${renderAnswers()}</div>				
			</div>`;
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

		$results.insertAdjacentHTML('afterbegin', content);
		$results.style.display = 'block';
	};


	// обработчик выбора ответа
	$quiz.addEventListener('change', (e) => {
		if (e.target.closest('.p-page__answers input')) {
			results[e.target.name] = e.target.value;

			Object.assign($progress.querySelector('span').style, { 
				width: ((+$quiz.dataset.step + 1) / DATA.length * 100) + '%' 
			});

			$next.removeAttribute('disabled');
		}
	});


	$quiz.addEventListener('click', (e) => {
		// обработчик кнопки "далее"
		if (e.target.closest('.p-quiz__btn_next')) {
			const nextStep = +$quiz.dataset.step + 1;
			
			if (DATA.length <= nextStep) {
				$page.style.display = 'none';
				$next.style.display = 'none';
				$progress.style.display = 'none';
				$restart.style.display = 'block';
				renderResults();
			} else {
				renderPage(nextStep);
			}
			
			$next.setAttribute('disabled', '');
		}
		// обработчик кнопки "рестарт"
		if (e.target.closest('.p-quiz__btn_restart')) {
			let elements = [$results, $page, $progress, $next, $restart, $progress.querySelector('span')];

			elements.map(item => item.removeAttribute('style'));
			$results.innerHTML = '';
			results = {};

			renderPage(0);
		}
	});

	renderPage(0);
})();