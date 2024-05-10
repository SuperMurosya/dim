//const { log } = require("gulp-clean/utils");

class MenuButton {
	_iconClass = null;
	_closeMenu = null

	constructor(iconClass, closeMenu) {

		if (typeof iconClass == 'string') {
			this._iconClass = iconClass;
		}
		if (closeMenu != undefined) {
			this._closeMenu = closeMenu;
		}
		this.menu();
	}

	_blockScroll() {

		let html = document.getElementsByTagName("html")[0];
		html.classList.toggle('_scroll-block');
	}

	menu() {

		let bodyTag = document.getElementsByTagName("body")[0]

		if (this._closeMenu) {
			let closeButton = document.getElementsByClassName(this._closeMenu)[0];

			closeButton.addEventListener('click', () => {
				bodyTag.classList.toggle('_menu-open');
				this._blockScroll();



			});

			let bg = bodyTag.getElementsByClassName('bg')[0];
			bg.addEventListener('click', (e) => {
				if (!e.target.closest('.menu__body')) {
					bodyTag.classList.toggle('_menu-open');
					this._blockScroll();
				}
			});
		}




		if (this._iconClass) {
			let icon = document.getElementsByClassName(this._iconClass)[0];
			icon.addEventListener('click', () => {
				bodyTag.classList.toggle('_menu-open');
				this._blockScroll();

			});
		}
	}
}

const menuMobil = new MenuButton('menu__icon', 'menu__close');



class KamPopUp {
	_iconClass = null;
	_closeMenu = null;
	_classWrapper = null;
	_classContent = null;

	constructor(iconClass, classWrapper, classContent, closeMenu) {

		if (typeof iconClass == 'string') {
			this._iconClass = iconClass;
		}
		if (closeMenu != undefined) {
			this._closeMenu = closeMenu;
		}

		if (classWrapper != undefined) {
			this._classWrapper = classWrapper;
		}
		if (classContent != undefined) {
			this._classContent = classContent;
		}
		this.popUp();
	}

	_blockScroll() {

		let html = document.getElementsByTagName("html")[0];
		html.classList.toggle('_scroll-block');

	}

	popUp() {

		let classWrapper = null;
		if (this._classWrapper) {
			classWrapper = document.getElementsByClassName('contact-form')[0];
		} else {
			classWrapper = document.getElementsByTagName("body")[0];
		}

		let openClass;
		if (this._classWrapper) {
			openClass = '_' + this._classWrapper + '-open';
		} else {
			openClass = '_popup-open';
		}


		if (this._closeMenu && classWrapper != undefined) {
			let closeButton = document.getElementsByClassName(this._closeMenu)[0];
			if (closeButton != null) {
				closeButton.addEventListener('click', () => {
					classWrapper.classList.toggle(openClass);
					this._blockScroll();
				});

				if (this._classContent) {
					classWrapper.addEventListener('click', (e) => {
						if (!e.target.closest('.' + this._classContent)) {
							classWrapper.classList.toggle(openClass);
							this._blockScroll();
						}
					});
				}

			} else {
				console.log('error close button');

			}




		}


		if (this._iconClass && classWrapper != undefined) {

			let icon = document.getElementsByClassName(this._iconClass)[0];


			if (icon != null) {
				icon.addEventListener('click', () => {
					classWrapper.classList.toggle(openClass);
					this._blockScroll();
				});
			}

		}
	}


}



const dimPopUp = new KamPopUp('header__button', 'contact-form', 'contact-form__body', 'contact-form__close');

const dimPopUp2 = new KamPopUp('pass__application', 'contact-form', 'contact-form__body', 'contact-form__close');


/*slick slider */

$('.popular__body').slick({
	dots: true,
	infinite: false,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 1,
	prevArrow: '<div class="slider-arrows slider-arrows__prev"><i class="fa-solid fa-caret-left"></i></div>',
	nextArrow: '<div class="slider-arrows slider-arrows__next"><i class="fa-solid fa-caret-right"></i></div>',
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				dots: true
			}
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false
			}
		}

		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	]
});

//   var slider = document.getElementById('slider');

// noUiSlider.create(slider, {
//     start: [100, 5000],
//     connect: true,
//     range: {
//         'min': 500,
//         'max': 6000
//     },
// 	step: 1000,
// 	 // Show a scale with the slider
// 	 pips: {
//         mode: 'steps',
//         stepped: true,
//         density: 4
//     },
// 	margin: 300
// });

/**
 * Создает трекер для элемента
 * @param selector {string}
 * @param callback
 * @param mutationType
 * @param time {undefined|int}
 * @returns {MutationObserver}
 */
function createObserver(selector, callback, mutationType, time) {
	element = document.querySelector(selector);
	var config = { attributes: true, childList: true, subtree: true };
	if (mutationType === undefined) {
		mutationType = ['childList', 'attributes'];
	}
	if (!Array.isArray(mutationType)) {
		mutationType = [mutationType];
	}
	if (typeof time == 'undefined') {
		time = 1000;
	}
	var mutationCallback = function (mutationsList, observer) {
		for (var mutation of mutationsList) {
			if (mutationType.indexOf(mutation.type) != -1) {
				/* Запускаем переданную функцию */
				if (typeof callback === 'function' /*&& checkTimeStamp(time)*/) {
					callback(observer);
				}
			}
		}
	};
	var observer = new MutationObserver(mutationCallback);
	observer.observe(element, config);
	return observer;

	/* Later, you can stop observing */
	/*    observer.disconnect();*/
}

function initSliderRange(observer) {
	observer.disconnect();
	$('#slider-range1 span:first, #slider-range2 span:first, #slider-range3 span:first, #slider-range4 span:first, #slider-range5 span:first, #slider-range6 span:first, #slider-range7 span:first').addClass('ui-slider-handle-left');
	$('#slider-range1 span:last, #slider-range2 span:last, #slider-range3 span:last, #slider-range4 span:last, #slider-range5 span:last, #slider-range6 span:last, #slider-range7 span:last').addClass('ui-slider-handle-right');
}


$(document).ready(function () {

	var active_slider = '';

	$(function () {
		$("#slider-range1").slider({
			range: true,
			min: 5000,
			max: 55000,
			step: 1000,
			values: [10000, 40000],
			slide: function (event, ui) {
				$("#amount1").val(ui.values[0]);
				$("#amount2").val(ui.values[1]);
			}
		});

		$("#slider-range2").slider({
			range: true,
			min: 0,
			max: 50,
			step: 1,
			values: [2, 10],
			slide: function (event, ui) {
				$("#amount3").val(ui.values[0]);
				$("#amount4").val(ui.values[1]);
				if (ui.values[1] == 50) $('#label_a4').html('> :'); else $('#label_a4').html('До:');
			}
		});
		$("#slider-range3").slider({
			range: true,
			min: 0,
			max: 200,
			step: 10,
			values: [10, 80],
			slide: function (event, ui) {
				$("#amount5").val(ui.values[0]);
				$("#amount6").val(ui.values[1]);
				if (ui.values[1] == 200) $('#label_a6').html('> :'); else $('#label_a6').html('До:');
			}
		});

		$("#slider-range4").slider({
			range: true,
			min: 50,
			max: 300,
			step: 10,
			values: [50, 150],
			slide: function (event, ui) {
				$("#amount7").val(ui.values[0]);
				$("#amount8").val(ui.values[1]);
				if (ui.values[0] == 50) $('#label_a7').html('< :'); else $('#label_a7').html('От:');
				if (ui.values[1] == 300) $('#label_a8').html('> :'); else $('#label_a8').html('До:');
			}
		});

		$("#slider-range5").slider({
			range: true,
			min: 1,
			max: 6,
			step: 1,
			values: [1, 3],
			slide: function (event, ui) {
				$("#amount9").val(ui.values[0]);
				$("#amount10").val(ui.values[1]);
				if (ui.values[1] == 6) $('#label_a10').html('> :'); else $('#label_a10').html('До:');
			}
		});

		$("#slider-range6").slider({
			range: true,
			min: 50,
			max: 300,
			step: 10,
			values: [50, 150],
			slide: function (event, ui) {
				$("#amount11").val(ui.values[0]);
				$("#amount12").val(ui.values[1]);
				if (ui.values[0] == 50) $('#label_a11').html('< :'); else $('#label_a11').html('От:');
				if (ui.values[1] == 300) $('#label_a12').html('> :'); else $('#label_a12').html('До:');
			}
		});

		$("#slider-range7").slider({
			range: true,
			min: 3,
			max: 18,
			step: 1,
			values: [3, 9],
			slide: function (event, ui) {
				$("#amount13").val(ui.values[0]);
				$("#amount14").val(ui.values[1]);
				if (ui.values[0] == 3) $('#label_a13').html('< :'); else $('#label_a13').html('От:');
				if (ui.values[1] == 18) $('#label_a14').html('> :'); else $('#label_a14').html('До:');
			}
		});

		$("#amount1").val($("#slider-range1").slider("values", 0));
		$("#amount2").val($("#slider-range1").slider("values", 1));
		$("#amount3").val($("#slider-range2").slider("values", 0));
		$("#amount4").val($("#slider-range2").slider("values", 1));
		$("#amount5").val($("#slider-range3").slider("values", 0));
		$("#amount6").val($("#slider-range3").slider("values", 1));
		$("#amount7").val($("#slider-range4").slider("values", 0));
		$("#amount8").val($("#slider-range4").slider("values", 1));
		$("#amount9").val($("#slider-range5").slider("values", 0));
		$("#amount10").val($("#slider-range5").slider("values", 1));
		$("#amount11").val($("#slider-range6").slider("values", 0));
		$("#amount12").val($("#slider-range6").slider("values", 1));
		$("#amount13").val($("#slider-range7").slider("values", 0));
		$("#amount14").val($("#slider-range7").slider("values", 1));
	});


	$("#amount1").blur(function () {
		$("#slider-range1").slider("values", 0, $(this).val());
	});

	$("#amount2").blur(function () {
		$("#slider-range1").slider("values", 1, $(this).val());
	});

	$("#amount3").blur(function () {
		$("#slider-range2").slider("values", 0, $(this).val());
	});

	$("#amount4").blur(function () {
		$("#slider-range2").slider("values", 1, $(this).val());
	});

	$("#amount5").blur(function () {
		$("#slider-range3").slider("values", 0, $(this).val());
	});

	$("#amount6").blur(function () {
		$("#slider-range3").slider("values", 1, $(this).val());
	});

	$("#amount7").blur(function () {
		$("#slider-range4").slider("values", 0, $(this).val());
	});

	$("#amount8").blur(function () {
		$("#slider-range4").slider("values", 1, $(this).val());
	});

	$("#amount9").blur(function () {
		$("#slider-range5").slider("values", 0, $(this).val());
	});

	$("#amount10").blur(function () {
		$("#slider-range5").slider("values", 1, $(this).val());
	});

	$("#amount11").blur(function () {
		$("#slider-range6").slider("values", 0, $(this).val());
	});

	$("#amount12").blur(function () {
		$("#slider-range6").slider("values", 1, $(this).val());
	});

	$("#amount13").blur(function () {
		$("#slider-range7").slider("values", 0, $(this).val());
	});

	$("#amount14").blur(function () {
		$("#slider-range7").slider("values", 1, $(this).val());
	});

	// $('#slider-range1 a:first, #slider-range2 a:first, #slider-range3 a:first').addClass('ui-slider-handle-left');
	// $('#slider-range1 a:last, #slider-range2 a:last, #slider-range3 a:last').addClass('ui-slider-handle-right');

	//	console.log($('#slider-range1 span:first').addClass('ui-slider-handle-left'));

	createObserver('#slider-range1', initSliderRange, ['childList']);
	/*
		$('#slider-range1 span:first').addClass('ui-slider-handle-left');
		$('#sslider-range1 span:last').addClass('ui-slider-handle-right');
	*/
	$('.ui-slider-handle-left').mousedown(function () {
		active_slider = 'left';
		$("#amount1, #amount2, #amount3, #amount4, #amount5, #amount6").blur();

	});

	$('.ui-slider-handle-left').mouseup(function () {
		active_slider = '';
	});

	$('.ui-slider-handle-right').mousedown(function () {
		active_slider = 'right';
		$("#amount1").blur();
		$("#amount2").blur();
		$("#amount3").blur();
		$("#amount4").blur();
		$("#amount5").blur();
		$("#amount6").blur();
		$("#amount7").blur();
		$("#amount8").blur();
		$("#amount9").blur();
		$("#amount10").blur();
		$("#amount11").blur();
		$("#amount12").blur();
		$("#amount13").blur();
		$("#amount14").blur();
	});

	$('.ui-slider-handle-right').mouseup(function () {
		active_slider = '';
	});


});
//	Setup Slider
function setup_slider(sc, a1, a2) {
	var a1, a2, sc_min, sc_max, st, labels;
	$('#label_a1').html('От:');
	$('#label_a2').html('До:');
	if (sc == 1) {
		sc_min = 5000; sc_max = 55000; if (a1 == '') a1 = 10000; if (a2 == '') a2 = 40000; st = 1000;
		labels = '<span class="first_child less5">&lt;5</span><span>15</span><span>25</span><span>35</span><span>45</span><span class="last_child">&gt;55</span>';
	}
	if (sc == 2) {
		sc_min = 5000; sc_max = 55000; if (a1 == '') a1 = 10000; if (a2 == '') a2 = 40000; st = 1000;
		labels = '<span class="first_child less5">&lt;5</span><span>15</span><span>25</span><span>35</span><span>45</span><span class="last_child">&gt;55</span>';
	}
	if (sc == 3) {
		sc_min = 10000; sc_max = 110000; if (a1 == '') a1 = 20000; if (a2 == '') a2 = 50000; st = 1000;
		labels = '<span class="first_child less5">&lt;10</span><span>30</span><span>50</span><span>70</span><span>90</span><span class="last_child">&gt;110</span>';
	}
	if (sc == 4) {
		sc_min = 50000; sc_max = 300000; if (a1 == '') a1 = 100000; if (a2 == '') a2 = 200000; st = 5000;
		labels = '<span class="first_child less5">&lt;50</span><span>100</span><span>150</span><span>200</span><span>250</span><span class="last_child">&gt;300</span>';
	}
	if (a2 == sc_max) $('#label_a2').html('> :'); else $('#label_a2').html('До:');
	if (a1 == sc_min) $('#label_a1').html('< :'); else $('#label_a1').html('От:');
	$("#amount1").val(a1); $("#amount2").val(a2);
	$("#slider-range1").slider({
		range: true, min: sc_min, max: sc_max, step: st, values: [a1, a2],
		slide: function (event, ui) {
			$("#amount1").val(ui.values[0]); $("#amount2").val(ui.values[1]);
			if (ui.values[1] == sc_max) $('#label_a2').html('> :'); else $('#label_a2').html('До:');
			if (ui.values[0] == sc_min) $('#label_a1').html('< :'); else $('#label_a1').html('От:');
		}
	});
	$('#ui_slider_labels01').html(labels);

}




/* Показати сховати головний фільтр*/
$(".main-filter-btn").click(function () {
	$(this).toggleClass('show');
	$(".main-filter").toggleClass('show');
	$(".main-flt-show").text($(".main-flt-show").text() == 'показати' ? 'сховати' : 'показати');
});