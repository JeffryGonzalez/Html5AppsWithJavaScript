// Domain
window.Hypertheory = window.Hypertheory || {};
Hypertheory.domain = Hypertheory.domain || {};
Hypertheory.domain.games = Hypertheory.domain.games || {};
Hypertheory.domain.games.MathGame = (function () {



	var originalQuestions = '[' +
	'{"q":"2 + 2","a":4},' +
	'{"q":"3 * 3","a":9},' +
	'{"q":"2 * 10","a":20},' +
	'{"q":"8 - 2","a":6},' +
	'{"q":"18 + 2","a":20},' +
	'{"q":"3 - 3","a":0},' +
	'{"q":"103 + 33","a":136},' +
	'{"q":"8 * 10","a":80}' +
	']';


	return function () {
		var guessCount = 0;
		var maxGuesses = 3;

		var questions = JSON.parse(originalQuestions);
		var currentQuestion;
		this.getQuestion = function () {
			currentQuestion = questions.splice(0,1)[0];
			return currentQuestion.q;
		};
		this.checkStatus = function (answer) {
			
			if (answer === currentQuestion.a) {
				if (questions.length < 1) {
					return "win";
				} else {
					return "right";
				}
			} else {
				guessCount++;
				if (guessCount < maxGuesses) {
					return "wrong";
				} else {
					return "lose";
				}
			}
		};
	}
})();