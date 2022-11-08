module.exports = {
	addAwesome: function (str) {
		return str + ' Awesome!';
	},
	burgerMenu: function () {
		let iconsMenu = Array.prototype.slice.call(document.querySelectorAll(".burger"));
		if (iconsMenu != 0) {
			let menuBody = document.querySelector(".mobile-menu");
			let body = document.querySelector("body");

			body.addEventListener("click", function (e) {
				const composedPath = e.composedPath();
				if (iconsMenu.some(item => composedPath.includes(item))) {
					for (let index = 0; index < iconsMenu.length; index++) {
						iconsMenu[index].classList.toggle("_active");
					}
					menuBody.classList.toggle("_active");
					return;
				}
				if (!composedPath.includes(menuBody)) {
					for (let index = 0; index < iconsMenu.length; index++) {
						iconsMenu[index].classList.remove("_active");
					}
					menuBody.classList.remove("_active");
					return;
				}
			});
		}
	},
	progress: function (currentActive = 0) {
		// currentActive 1,2,3...
		const progressBarLine = document.querySelector(".progress-bar__line");
		const progressbarCircles = document.querySelectorAll(".progress-bar__circle");

		if (typeof progressbarCircles[0] == "undefined" || !progressbarCircles[0] || progressBarLine == "undefined" || !progressBarLine) {
			console.log("progressbarCircles or progressBarLine is undefined");
			return;
		}

		const circleWidth = progressbarCircles[0].offsetWidth;
		const circleLength = progressbarCircles.length;

		if ((currentActive % 1) != 0 || currentActive > circleLength || currentActive < 1) {
			console.log("progressBar is not correct");
			return progressBarLine.style.width = 0;
		}

		progressbarCircles.forEach((circle, i) => {
			if (i == currentActive - 1) {
				circle.classList.add("_active");
				circle.classList.remove("_passed");
			} else if (i < currentActive - 1) {
				circle.classList.add("_passed");
				circle.classList.remove("_active");
			} else {
				circle.classList.remove("_passed");
				circle.classList.remove("_active");
			}
		});
		const passedCircles = document.querySelectorAll(".circle._passed");
		const passedLength = passedCircles.length;
		progressBarLine.style.width = "calc(" + passedLength / (circleLength - 1) * 100 + "% - " + passedLength / (circleLength - 1) * circleWidth + "px )";
		return;
	},
	tabs: function () {
		let tabs = document.querySelectorAll(".tabs");
		for (let index = 0; index < tabs.length; index++) {
			let tab = tabs[index];
			let tabs_items = tab.querySelectorAll(".tabs-item");
			let tabs_blocks = tab.querySelectorAll(".tabs-block");
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.addEventListener("click", function (e) {
					for (let index = 0; index < tabs_items.length; index++) {
						let tabs_item = tabs_items[index];
						tabs_item.classList.remove('_active');
						tabs_blocks[index].classList.remove('_active');
					}
					tabs_item.classList.add('_active');
					tabs_blocks[index].classList.add('_active');
					e.preventDefault();
				});
			}
		}
	},
	inputMask: function () {
		// or use jquery mask
		// temporary option
		let inputs_num = document.querySelectorAll("input._number");
		for (let index = 0; index < inputs_num.length; index++) {
			let input = inputs_num[index];
			input.addEventListener('keydown', function (event) {
				if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
					(event.keyCode == 65 && event.ctrlKey === true) ||
					(event.keyCode >= 35 && event.keyCode <= 39)) {
					return;
				} else {
					if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
						event.preventDefault();
					}
				}
			});
		}
		let inputs_exp = document.querySelectorAll("input._expires");
		for (let index = 0; index < inputs_exp.length; index++) {
			let input = inputs_exp[index];
			input.addEventListener('keydown', function (event) {
				if (event.keyCode == 191 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
					(event.keyCode == 65 && event.ctrlKey === true) ||
					(event.keyCode >= 35 && event.keyCode <= 39)) {
					event.target.value = event.target.value.replace(
						/[^0-9]/g, '' // To allow only numbers
					).replace(
						/^([2-9])$/g, '0$1' // To handle 3 > 03
					).replace(
						/^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
					).replace(
						/^0{1,}/g, '0' // To handle 00 > 0
					).replace(
						/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
					);
					return;
				} else {
					if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
						event.preventDefault();
					}
				}
			});
		}
	},
	basket: function () {
		const subtotal = document.querySelector('.basket__subtitle._subtotal > span.value');
		const tax = document.querySelector('.basket__subtitle._tax > span.value');
		const shipping = document.querySelector('.basket__subtitle._shipping > span.value');
		const total = document.querySelector('.basket__title._total > span.value');

		const updateCalc = () => {
			const items = document.querySelectorAll('.basket-item');
			let currentSubtotal = 0;
			let currentTotal = 0;
			let currentShipping = 150;
			let currentTax = 100;

			for (let index = 0; index < items.length; index++) {
				const itemValue = items[index].querySelector('.basket-item__value');
				const itemPrice = items[index].querySelector('.basket-item__price').dataset.price;

				currentSubtotal += Number(itemPrice) * Number(itemValue.innerHTML);
			}

			subtotal.innerHTML = '$ ' + currentSubtotal;
			currentTotal = currentSubtotal + currentShipping + currentTax;
			total.innerHTML = '$ ' + currentTotal;
		};

		let minuses = document.querySelectorAll('.basket-item__button._minus');
		for (let index = 0; index < minuses.length; index++) {
			minuses[index].addEventListener('click', function (e) {
				const item = minuses[index].closest('.basket-item');
				const itemValue = item.querySelector('.basket-item__value');
				const itemPrice = item.querySelector('.basket-item__price').dataset.price;
				const currentItemPrice = item.querySelector('.basket-item__price > span');

				if (Number(itemValue.innerHTML) > 1) {
					itemValue.innerHTML = Number(itemValue.innerHTML) - 1;
					currentItemPrice.innerHTML = '$ ' + Number(itemPrice) * Number(itemValue.innerHTML);
				} else {
					item.remove();
				}
				updateCalc();
			});
		}

		let pluses = document.querySelectorAll('.basket-item__button._plus');
		for (let index = 0; index < pluses.length; index++) {
			pluses[index].addEventListener('click', function (e) {
				const item = pluses[index].closest('.basket-item');
				const itemValue = item.querySelector('.basket-item__value');
				const itemPrice = item.querySelector('.basket-item__price').dataset.price;
				const currentItemPrice = item.querySelector('.basket-item__price > span');

				if (Number(itemValue.innerHTML) < 999) {
					itemValue.innerHTML = Number(itemValue.innerHTML) + 1;
					currentItemPrice.innerHTML = '$ ' + Number(itemPrice) * Number(itemValue.innerHTML);
				}
				updateCalc();
			});
		}

		let removes = document.querySelectorAll('.basket-item__button._remove');
		for (let index = 0; index < removes.length; index++) {
			removes[index].addEventListener('click', function (e) {
				const item = removes[index].closest('.basket-item');
				item.remove();
				updateCalc();
			});
		}

		updateCalc();
	},
	tooltips: function () {
		console.log('timt');
		return 0;
	}
};

