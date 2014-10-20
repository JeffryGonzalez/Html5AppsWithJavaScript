describe("mathGame - happy path", function() {
	var domain = new Hypertheory.domain.games.MathGame();
	
	describe("question♫ 1", anotherQuestion(4, "2 + 2"));
	describe("question♫ 2", anotherQuestion(9, "3 * 3"));
	describe("question♫ 3", anotherQuestion(20, "2 * 10"));
	describe("question♫ 4", anotherQuestion(6, "8 - 2"));
	describe("question♫ 5", anotherQuestion(20, "18 + 2"));
	describe("question♫ 6", anotherQuestion(0, "3 - 3"));
	describe("question♫ 7", anotherQuestion(136, "103 + 33"));
	describe("question 8 win!" , anotherQuestion(80, "8 * 10", "win"));

	function anotherQuestion(answer, question, message) {
		message = message || "right";

	return function() {
			it("should have the right question (" + question + ")", function() {
				expect(domain.getQuestion()).toBe(question);
			});
			it("should have the right answer (" + answer + ")", function() {
				expect(domain.checkStatus(answer)).toBe(message);
			});
		}
	}
});

describe("math game - wrong answers", function() {
	beforeEach(function () {
		this.domain = new Hypertheory.domain.games.MathGame();
		this.domain.getQuestion();
		this.response = this.domain.checkStatus(5);
	});
	it("should give response as wrong", function () {
		expect(this.response).toBe("wrong");
	});
});

describe("math game - game over - too many wrong", function() {
	beforeEach(function () {
		this.domain = new Hypertheory.domain.games.MathGame();
		this.domain.getQuestion();
		this.domain.checkStatus(5);
		this.domain.checkStatus(5);
		this.response = this.domain.checkStatus(5);
	});
	it("should be lose", function() {
		expect(this.response).toBe("lose");
	});
});


