import DATA from './m-quiz.json';

(() => {

	const $quiz = $('#m-quiz');
	const $step = $('.m-page__top-left span');
	const numeral = $step.data("numeral")
	const $page = $quiz.find('.m-page__content');
	const $results = $quiz.find('.m-results');
	const $submit = $quiz.find('.m-quiz__btn_submit');
	const $next = $quiz.find('.m-quiz__btn_next');
	const $prev = $quiz.find('.m-quiz__btn_prev');
	let results = {};
	let comments = {};

	if (!$quiz.length) return;


	// отрисовка текущего блока вопросов
	const renderPage = (index) => {
		$quiz.data('step', index);
		
		// количество оставшихся шагов
		const left = (DATA.length + 1) - index;
				
		// отрисовка
		const getChecked = (id) => results[index]?.includes(id) ? 'checked' : '';

		const renderAnswers = () => DATA[index].answers
			.map((answer, id) =>
				`<label>
					<input type="${DATA[index].type ?? 'checkbox'}" name="${index}" value="${id}" ${getChecked(id)}>
					<span>${answer}</span>
				</label>`
			).join('');

		$page.html(`
			<h4 class="m-page__question">${DATA[index].question}</h4>
			<div class="m-page__answers">${renderAnswers()}</div>
			<input class="m-page__comment" type="text" name="${index}" value="${comments[index] ?? ''}" placeholder="Комментарий">
		`);

		// подставить количество шагов в шапку блока
		$step.text(`${left} ${declOfNum(left, numeral)}`);

		// сброс элементов
		$next
			.prop('disabled', Boolean(!results[index] || !results[index].length))
			.add($page)
			.add($results)
			.add($next)
			.add($submit)
			.removeAttr('style');

		// убрать кнопку "назад" на первой страничке
		if (!index) $prev.removeAttr('style');
	};


	// формирование результатов для отправки
	const processingResults = () => {
		$quiz.data('step', DATA.length);
		let content = '<table cellpadding="0" cellspacing="0" border="1" style="border-collapse: collapse; border: 1px solid #aaaaaa; width: 100%;">';

		// форматирование результатов в виде таблицы для отображения в теле письма
		const getAnswers = (index) => results[index]
			.map((result) => `${DATA[index].answers[result]}</br>`)
			.join('');

		DATA.forEach((item, index) => {
			let style = `style="padding: 5px; ${(index % 2) ? '':'background-color: #e2e2e2'}"`;

			content += 
				`<tr>
					<td ${style}>${item.question}</td>
					<td ${style}>${getAnswers(index)}</td>
				</tr>`

			if (comments[index])
				content += `<tr><td colspan="2" ${style}>${comments[index]}</td></tr>`;
				
		});
		content += '</table>';

		// подставить количество шагов в шапку блока
		$step.text(`1 ${declOfNum(1, numeral)}`);

		// переключение видимости элементов
		$results
			.find('.m-results__data')
			.html(content)
			.end()
			.add($page.html(''))
			.add($next)
			.add($submit)
			.toggle();
	};


	// обработчик выбора ответа
	$quiz.on('change', 'input', function(e) {
		const $shell = $(this).parents('.m-page__content');
		results[e.target.name] = [];

		$shell
			.find('input:checked')
			.each(function(index, el){
				results[e.target.name].push(Number(el.value));
			});

		comments[e.target.name] = $shell.find('input:text').val();
		$next.prop('disabled', Boolean(!results[e.target.name].length));
	});


	// обработчик кнопки "далее"
	$quiz.on('click', '.m-quiz__btn_next', function(e) {
		const nextStep = $quiz.data('step') + 1;

		if (DATA.length <= nextStep) {
			processingResults();			
		} else {
			$prev.show();
			renderPage(nextStep);
		}
	});


	// обработчик кнопки "назад"
	$quiz.on('click', '.m-quiz__btn_prev', function(e) {
		let prevStep = $quiz.data('step') - 1;
		if (prevStep < 0) return;

		renderPage(prevStep);
	});


	// отправка формы (отправляющая кнопка, по дизайну, находится за пределами формы)
	$submit.on('click', function(e) {
		e.preventDefault();
		$quiz.find('#m-form input.m-form__submit[type="submit"]').trigger('click')
	});


	// склонение числительных	
	const declOfNum = (n, data) => { 
		if (!data) { return '' };

		const text_forms = data.split(",");
		n = Math.abs(n) % 100; 
		const n1 = n % 10;

		if (n > 10 && n < 20) { return text_forms[2].trim(); }
		if (n1 > 1 && n1 < 5) { return text_forms[1].trim(); }
		if (n1 == 1) { return text_forms[0].trim(); }
		return text_forms[2].trim();
	}

	
	// начало работы, самый первый вызов
	renderPage(0);


	// обработчик отправки формы
	$quiz.on('submit', '#m-form', function(e) {
		e.preventDefault();
		
		let $form = $(this);
		let formdata = new FormData($form[0]);
		let $elements = $form
			.find('input, textarea')
			.add('.m-quiz__btn_prev')
			.add('.m-quiz__btn_submit');

		formdata.set('m-quiz', $form.find('.m-results__data').html());
		$elements.prop("disabled", true);

		$.ajax({
			type: 'post',
			url: 'mailto.php', // обработчик аякса на сервере (использует PHPMailer)
			data: formdata,
			processData: false,
			contentType:false,
		}).done(function(response) {
			let data = JSON.parse(response);
			$tmp = $form.children().detach();

			if(data.status=='error') {
				$form.append(`<div class="m-form__echo m-form__echo_error">${data.text}</div>`);

				setTimeout(function() {
					$form.children().remove();
					$form.append($tmp);
					$elements.prop("disabled", false);
				}, 2000);

			} else {
				$form.append(`<div class="m-form__echo m-form__echo_success">${data.text}</div>`);
			}
		});
	});

})();