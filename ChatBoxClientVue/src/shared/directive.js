import Vue from "vue"

Vue.directive('only-numeric', {
	bind: function (el, binding) {
		el.addEventListener('keydown', (e) => {
			let event = e || window.event;
			if ((binding.arg === "decimal" || binding.value === "decimal")) {
				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 37 && event.keyCode <= 40) ||
					(event.keyCode >= 96 && event.keyCode <= 105) ||
					event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
					event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 || event.keyCode == 110) {

				} else {
					event.preventDefault();
				}
				if (event.target.value.indexOf('.') !== -1 && (event.keyCode == 190 || event.keyCode == 110))
					event.preventDefault();

			}
			else {

				if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 37 && event.keyCode <= 40) ||
					(event.keyCode >= 96 && event.keyCode <= 105) ||
					event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46) {

				} else {
					event.preventDefault();
				}
			}
		})

	}
})