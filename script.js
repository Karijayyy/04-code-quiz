var startPage = document.getElementById("start-page")
var startButton = document.getElementById("start-button")
var questionsDiv = document.querySelector(".grid")
startButton.addEventListener("click", function () {
    startPage.style.display = "none"
    questionsDiv.style.display = "block"
    // display quiz
    populate();
})
//countdown timer
var count = 90;
var interval = setInterval(function () {
    document.getElementById('count').innerHTML = count;
    count--;
    if (count === 0) {
        clearInterval(interval);
        document.getElementById('count').innerHTML = 'Done';
        // or...
        alert("You're out of time!");
    }
}, 1000);
//quiz function
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
        this.questionIndex++;
    }
    else {
        this.questionIndex++;
        count -= 10
        document.getElementById('count').innerHTML = count;
    }
}
Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}
function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
var highScores = JSON.parse(localStorage.getItem("highScores")) || []

function showScores() {
    document.querySelector("#quiz").setAttribute("style", "display:none;")
    document.querySelector(".highScores").setAttribute("style", "display:block")
    displayScores()
       console.log("showScores");
};
document.querySelector(".highScoreButton").addEventListener("click", saveHighScore)

function saveHighScore(){
    var initialsInput = document.querySelector(".initialsInput").value 
    var finalScore = {
        initials:initialsInput, 
        score: quiz.score,
    }
    highScores.push(finalScore)
    localStorage.setItem("highScores", highScores)
    // displayscores beneath this broke my code 
    displayScores()
}
function displayScores() {
    document.querySelector(".scoresList").innerHTML = ""
    highScores.forEach(function (item) {
        var liel = document.createElement("li")
        liel.textContent = `initials: ${item.initials}
     score: ${item.score}`
        document.querySelector(".scoresList").append(liel)
    })
}
var questions = [
    new Question("What can JavaScript Change?", ["HTML Content", "HTML Attributes", "HTML Styles (CSS)", "All"], "All"),
    new Question("Which can be used to declare a variable?", ["Let", "Const", "Var", "All"], "All"),
    new Question("Which is not an example of Arithmetic Operators?", ["*", "$", "/", "--"], "$"),
    new Question("Which is a loop?", ["For", "While", "For In", "All"], "All"),
    new Question("Javascript is used to develope what?", ["Mobile Apps", "Games", "Web Apps", "All"], "All")
];
// create quiz
var quiz = new Quiz(questions);

