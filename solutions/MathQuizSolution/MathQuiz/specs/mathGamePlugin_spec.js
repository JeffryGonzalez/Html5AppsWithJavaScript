


describe("Math Game", function () {
	/*
	 <div id="math-game">
			<div id="status"></div>
			<span id="question"></span>
			<input type="text" id="answer" />
			<input type="button" value="Answer" id="give-answer" />
		</div>
	*/

	var readQuestion,
		setAnswer,
		readAnswer,
		readStatus,
		clickAnswer,
		domain,
		sut;
	var finders = testUtils.finders("#math-game");
	readQuestion = finders.getTextReader('#question');
	clickAnswer = finders.getClicker('#give-answer');
	readAnswer = finders.getValueReader('#answer');
	setAnswer = finders.getValueWriter('#answer');
	readStatus = finders.getTextReader('#status');
	readCountDown = finders.getTextReader("#countdown");
		

	beforeEach(function () {
		
		domain = {
			getQuestion: function () { },
			checkStatus: function (answer) {}
		}
		window.Hypertheory = {};
		Hypertheory.domain = {};
		Hypertheory.domain.games = {};
		Hypertheory.domain.games.MathGame = domain;
		
	});

	describe("Playing", function () {

		
		describe("Starting the Game", function () {
			beforeEach(function() {
				spyOn(domain, "getQuestion").and.returnValue("first question");
				sut = $('#math-game').mathGame({ domain: domain });	
			});
			it("should get and display the first question", function() {
				expect(readQuestion()).toBe("first question");
			});
			it("should focus the input", function() { // will not pass with chrome dev tools open. bug in chrome.
				expect(sut.find(':focus').attr("id")).toBe("answer");
			});
		});

		describe("right answer", function () {
			beforeEach(function () {
				// spy on the checker
				spyOn(domain, 'checkStatus').and.returnValue("right");
				spyOn(domain, 'getQuestion').and.returnValue("dog");
				sut = $('#math-game').mathGame({ domain: domain });
				//provide the answer
				setAnswer(42);
				// click the button
				clickAnswer();
			});
			it("should pass the value to the checker", function () {
				expect(domain.checkStatus).toHaveBeenCalledWith(42);
			});
			it("should display the next question", function () {
				expect(readQuestion()).toBe("dog");
				expect(domain.getQuestion.calls.count()).toBe(2);
			});
			it("should clear the input", function () {
				expect(readAnswer()).toBe('');
			});
			it("should have no message in the status", function() {
				expect(readStatus()).toBe('');
			});
		});
		describe("wrong answer", function () {
			
			beforeEach(function() {
				spyOn(domain, 'checkStatus').and.returnValue("wrong");
				spyOn(domain, 'getQuestion').and.returnValue('cat');
				sut = $('#math-game').mathGame({ domain: domain });
				setAnswer(99);
				clickAnswer();

			});
			it("should pass the value to the checker", function() {
				expect(domain.checkStatus).toHaveBeenCalledWith(99);
			});
			it("should have a message in the status", function() {
				expect(readStatus()).toBe("Wrong, try again!");
			});
			it("should leave the question", function() {
				expect(readQuestion()).toBe('cat');
				expect(domain.getQuestion.calls.count()).toBe(1);
			});
		});
		describe("game over, you win!", function() {
			beforeEach(function() {
				spyOn(domain, 'checkStatus').and.returnValue("win");
				spyOn(domain, 'getQuestion').and.returnValue('cat');
				sut = $('#math-game').mathGame({ domain: domain });
				setAnswer(120);
				clickAnswer();
			});
			it("should show game over in the status", function() {
				expect(readStatus()).toBe("Game Over! You Win!");
			});
			it("should disable the answer button", function() {
				expect(sut.find('#give-answer').is(":disabled")).toBeTruthy();
			});

		});
		describe("game over, you lose!", function() {
			beforeEach(function () {
				spyOn(domain, 'checkStatus').and.returnValue("lose");
				spyOn(domain, 'getQuestion').and.returnValue('frog');
				sut = $('#math-game').mathGame({ domain: domain });
				setAnswer(120);
				clickAnswer();
			});
			it("should show game over message", function() {
				expect(readStatus()).toBe("Game Over! You Lose!");
			});
			it("should disable the button", function() {
				expect(sut.find('#give-answer').is(":disabled")).toBeTruthy();
			});
		});
		describe("invalid input", function() {
			beforeEach(function () {
				spyOn(domain, 'checkStatus');
				spyOn(domain, 'getQuestion').and.returnValue('frog');
				sut = $('#math-game').mathGame({ domain: domain });
				setAnswer('pizza');
				clickAnswer();
			});
			it("should not pass the input", function() {
				expect(domain.checkStatus).not.toHaveBeenCalled();
			});
			it("should set that status", function() {
				expect(readStatus()).toBe("Enter a number.");
			});
			it("focuses the textbox", function() {
				expect(sut.find(':focus').attr('id')).toBe('answer');
			});
		});
	});
	describe("Timing out the the game - extra credit", function() {
		beforeEach(function() {
			jasmine.clock().install();
			sut = $('#math-game').mathGame({ domain: domain });
		});
		afterEach(function() {
			jasmine.clock().uninstall();
		});
		it("should update the clock", function() {
			expect(readCountDown()).toBe("03:00");
		});
		it("should update on tick", function() {
			jasmine.clock().tick(1001);
			expect(readCountDown()).toBe("03:59");
		});
		it("should update again", function() {
			jasmine.clock().tick(2002);
			expect(readCountDown()).toBe("03:58");
		});
		it("should stop at zero", function() {
			jasmine.clock().tick(1000 * 60 * 3);
			expect(readCountDown()).toBe("00:00");
		});
		it("should change the status", function() {
			jasmine.clock().tick(1000 * 60 * 3);
			expect(readStatus()).toBe("Time Up!");	
		});
	});
});

