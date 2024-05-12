import DATA from './p-quiz.json';

(() => {

	const $quiz = document.querySelector('#p-quiz');
	if (!$quiz) return;

	const $nodes = {
		page: $quiz.querySelector('.p-page'),
		results: $quiz.querySelector('.p-results'),
		progress: $quiz.querySelector('.p-quiz__progress'),
		state:  $quiz.querySelector('.p-quiz__progress span'),
		restart: $quiz.querySelector('.p-quiz__btn_restart'),
		next: $quiz.querySelector('.p-quiz__btn_next')
	}

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

		$nodes.page.innerHTML = 
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

		$nodes.results.insertAdjacentHTML('afterbegin', content);
		$nodes.results.style.display = 'block';
		$nodes.restart.style.display = 'block';
	};
	
	
	// обработчик выбора ответа
	$quiz.addEventListener('change', function(e) {
		if (e.target.closest('.p-page__answers input')) {
			results[this.dataset.step] = e.target.value;
			
			Object.assign($nodes.state.style, { 
				width: ((+this.dataset.step + 1) / DATA.length * 100) + '%' 
			});
			
			$nodes.next.removeAttribute('disabled');
		}
	});
	
	
	$quiz.addEventListener('click', function(e) {
		// обработчик кнопки "далее"
		if (e.target.closest('.p-quiz__btn_next')) {
			const nextStep = +this.dataset.step + 1;
			
			if (DATA.length <= nextStep) {
				Object.values($nodes).map(node => node.style.display = 'none');
				renderResults();
			} else {
				renderPage(nextStep);
			}
			
			$nodes.next.setAttribute('disabled', '');
		}
		// обработчик кнопки "рестарт"
		if (e.target.closest('.p-quiz__btn_restart')) {
			Object.values($nodes).map(node => node.removeAttribute('style'));
			$nodes.results.innerHTML = '';
			results = {};

			renderPage(0);
		}
	});

	renderPage(0);
})();