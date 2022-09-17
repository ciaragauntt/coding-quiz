//DOM
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start-button");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");

var questionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
    var startEl = document.getElementById("start-screen");
    startEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

function getQuestion() {
    var questionNow = questions[questionIndex];

    var titleEl = document.getElementById("question-title");
    titleEl.textContent = questionNow.title;

    choicesEl.innerHTML = "";

    questionNow.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        choiceBtn.onClick = questionClick;

        choicesEl.appendChild(choiceBtn);
    });
}