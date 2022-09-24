//DOM
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start-button");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var startEl = document.querySelector("#start-screen");
var endEl = document.querySelector("#end-screen");

var questionIndex = 0;
var time = questions.length * 15;
var timerId;

// Start the quiz
function startQuiz() {

    startEl.setAttribute("class", "hide");

    questionsEl.removeAttribute("class");

    timerId = setInterval(clocktick, 1000);

    timerEl.textContent = time;

    getQuestion();
}

// Have questions show up on the screen
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

        choiceBtn.onclick = answerQuestion;

        choicesEl.appendChild(choiceBtn);
    });
}

// Second being taken off the clock
function clocktick() {
    // update the time 
    time --;
    timerEl.textContent = time;
    // if the user ran out of time 
    if (time < 0) {
        endQuiz();
    }
}

function answerQuestion () {

    // if user got incorrect answer
    if (this.value !== questions[questionIndex].answer) {
        // take off 15 seconds
        time -= 15;

        // if time is less than 0 keep the time at 0
        if (time < 0) {
            time = 0;
        }

        // show time on the page
        timerEl.textContent = time;

        // feedback if you get an answer wrong or right

        feedbackEl.textContent = "WRONG!";
    } else {
        feedbackEl.textContent = "CORRECT!";
    }

    feedbackEl.setAttribute("class", "feedback");

    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    //goes to the next question once the previous on is answered
    questionIndex++;

    // make sure we did not run out of questions 
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }

}

// end the quiz

    function endQuiz () {

        // stop the timer
        clearInterval(timerId);

        //show the end screen
        var highscorePage = document.querySelector("#end-screen");
        highscorePage.setAttribute("class", "show");

        var finalScore = document.querySelector("#final-score");
        finalScore.textContent = time;

        //hide questions
        questionsEl.setAttribute("class", "hide");
    }

    function saveScore () {

        // get value of input box
        var name = nameEl.value.trim();

        if (name !== "") {
            var highscore = JSON.parse(window.localStorage.getItem("high-scores")) || [];

            var newScore = {
                score: time,
                name: name
            };

            highscore.push(newScore);
            window.localStorage.setItem("high-scores", JSON.stringify(highscore));

            window.location.href = "score.html";
        }
    }

    function enterCheck(event) {
        if(event.key === "Enter") {
            saveScore();
        }
    }
    

    submitButton.onclick = saveScore;

    startButton.onclick = startQuiz;

    nameEl.onkeyup = enterCheck;

