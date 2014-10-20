// Test Utils
(function () {

	var finders = function (selectorContext) {

		return {
			getTextReader: function (selector) {
				return function () {
					return $(selectorContext).find(selector).text();
				}
			},
			getTextWriter: function (selector) {
				return function (text) {
					$(selectorContext).find(selector).text(text);
				}
			},
			getValueReader: function (selector) {
				return function () {
					return $(selectorContext).find(selector).val();
				}
			},
			getValueWriter: function (selector) {
				return function (value) {
					$(selectorContext).find(selector).val(value);
				}
			},
			getClicker: function (selector) {
				return function () {
					$(selectorContext).find(selector).click();
				}
			}
		}
	}

	window.testUtils = {
		finders: function (rootContext) {
			return finders(rootContext);
		}
	}
})();