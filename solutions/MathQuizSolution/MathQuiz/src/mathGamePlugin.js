(function ($) {
	$.fn.mathGame = function (options) {

		options = options || {};
		options.domain = options.domain || new Hypertheory.domain.games.MathGame();
		options.question = $(this).find(options.question || '#question');
		options.answer = $(this).find(options.answer || '#answer');
		options.giveAnswer = $(this).find(options.giveAnswer || '#give-answer');
		options.status = $(this).find(options.status || '#status');
		options.countDown = $(this).find(options.countDown || '#countdown');

		var numberOfMillisecondsLeft = 3 * 60 * 1000;
		var gameIsWonOrLost = false;

		console.log(numberOfMillisecondsLeft);
		options.countDown.text("3:00");

		var timeOut = window.setInterval(function() {
			var newValue = "";

			numberOfMillisecondsLeft -= 1000;
			var seconds = (Math.round((numberOfMillisecondsLeft / 1000) % 60)).toString();
			var minutes = (Math.round((numberOfMillisecondsLeft / (1000 * 60)) % 60)).toString();
			seconds = seconds.length > 1 ? seconds : "0" + seconds;
			minutes = minutes.length > 1 ? minutes : "0" + minutes;
			newValue = minutes + ":" + seconds;

			options.countDown.text(newValue);
			if (numberOfMillisecondsLeft <= 0 ) {
				window.clearInterval(timeOut);
				options.giveAnswer.attr("disabled", true);
				options.status.text("Time Up!");
			}

			if (gameIsWonOrLost) {
				window.clearInterval(timeOut);

			}
		
	}, 1000);

	var game = options.domain;
	// start the game

	options.question.text(game.getQuestion());
	options.answer.focus();

	options.giveAnswer.click(function () {
		var answer = parseFloat(options.answer.val());
		if (isNaN(answer)) {
			options.status.text("Enter a number.");
			options.answer.focus();
			return;
		}
		var status = game.checkStatus(answer);
		switch (status) {
			case "right":
				options.status.text('');
				options.answer.val('');
				options.question.text(game.getQuestion());
				break;
			case "wrong":
				options.status.text('Wrong, try again!');
				break;
			case "win":
				options.status.text('Game Over! You Win!');
				options.giveAnswer.attr("disabled", true);
				gameIsWonOrLost = true;
				break;

			case "lose":
				options.status.text('Game Over! You Lose!');
				options.giveAnswer.attr("disabled", true);
				gameIsWonOrLost = true;
				break;
			default:
				options.status.text('');
		}


	});



	return this;
}
})(jQuery);