var container = document.querySelector(".container");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var navHighScore = document.querySelector(".highscore");
var quiz = document.querySelector(".quiz");
var feedBack = document.querySelector("#feedback");
var initials = document.querySelector("#initials");
var initialsText = document.querySelector("#initials-text");

var score = 0;
var timerCount;
var timer;
var isCorrect = false;
var isIncorrect = false;
var highScore;
var questions = ["Q1", "Q2", "Q3", "Q4", "Q5"];
var q = 0;
var options = ["first question", "opt 2", "opt 3", "opt 4", "2nd question", "opt2.2", "option 3.2", "option 4.2", "3rd question", "opt 2.3", "option 3.3", "option 4.3", "4th question", "opt 2.4", "opt 3.4", "option 4.4", "5th question", "opt 2.5", "option 3.5", "option 4.5"];
var currentoptions;
var x = 0;
var y = 4;
var h2;
var h3;


startButton.addEventListener("click", startQuiz);

getHighScore();

function getHighScore() {
    // Get stored value from client storage, if it exists
    var storedHighScore = localStorage.getItem("highScore");
    // If stored value doesn't exist, set counter to 0
    if (storedHighScore === null) {
        highScore = 0;
    } else {
        // If a value is retrieved from client storage set the highscore to that value
        highScore = storedHighScore;
    }

    navHighScore.textContent = highScore;
    return highScore;
}
function startQuiz() {
    timerCount = 45;
    renderQuestion()
    startTimer()
}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount > 0) {
            // Tests if correct, incorrect, or time out
            if (isCorrect && timerCount > 0) {
                correctAnswer();
                renderQuestion();
                //Feedback goes away after 1.5 seconds
                window.setTimeout(giveFeedBack, 1500)
                isCorrect = false;
            }
            if (isIncorrect && timerCount > 0) {
                timerCount -= 5;
                incorrectAnswer();
                renderQuestion();
                window.setTimeout(giveFeedBack, 1500)
                isIncorrect = false;
            }
            if (q == 6) {
                quiz.textContent = " ";
                clearInterval(timer);
                quizOver();
            }
        }
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears interval
            timerCount = 0;
            clearInterval(timer);
            timerElement.textContent = timerCount;
            quizOver();
        }
    }, 1000);
}
//makes feedback go away
function giveFeedBack() {
    feedBack.style.display = "none";

}
//Selects 4 options from the array when called
function currentOptions() {
    if (y <= 20) {
        newOption = options.slice(x, y);
        x = x + 4;
        y = y + 4;
        return newOption;
    }
}
function renderQuestion() {
    quiz.textContent = " ";
    if (q < 5) {
        //creates questions and options from arrays and gives data-index attributes
        h2 = document.createElement("h2");
        h2.setAttribute("data-index", q);
        quiz.appendChild(h2);
        h2.textContent = questions[q];
        var ul = document.createElement("ul");
        quiz.appendChild(ul);
        currentoptions = currentOptions();
        // renders each option for each question and assigns them data-index attributes
        for (var i = 0; i < currentoptions.length; i++) {
            var li = document.createElement("li");
            li.setAttribute("data-index", i);
            li.textContent = currentoptions[i];
            ul.appendChild(li);
        }
    }
    // question counter and it helps assign data-index attributes
    q++;

}
quiz.addEventListener("click", function (event) {
    var element = event.target;
    // if you choose an option to a question
    if (element.matches("li")) {
        var optionIndex = Number(element.getAttribute("data-index"));
        //accurate question counter
        var questionIndex = Number(h2.getAttribute("data-index"));
        // answer for first 4 questions
        if (optionIndex === questionIndex) {
            isCorrect = true;
        }
        //answer for 5th question
        else if (optionIndex === 2 && questionIndex === 4) {
            isCorrect = true;
        }
        else {
            isIncorrect = true;
        }
    }
})
//gives 20 points per right question and reveals feedback
function correctAnswer() {
    score = score + 20;
    feedBack.textContent = "Correct!"
    feedBack.style.display = "block";
}
//reveals feedback
function incorrectAnswer() {
    feedback.textContent = "Wrong!"
    feedBack.style.display = "block";
}
//sets best highscore
function setHighScore() {
    if (score > highScore) {
        navHighScore.textContent = score;
        localStorage.setItem("highScore", score);

    }
}
//Shows your score and reveals initials input
function submitScore() {
    quiz.appendChild(h2);
    h2.textContent = "Finished!"
    var h3 = document.createElement("h3");
    quiz.appendChild(h3);
    h3.textContent = "Your score: " + score;
    initials.style.display = "block";
}
//question counter back to 0, saves high score and calls function to render to submit initials
function quizOver() {
    q = 0;
    setHighScore();
    submitScore();
}
//saves initials upun submit
initials.addEventListener("submit", function (event) {
    event.preventDefault();
    var initialsInput = initialsText.value.trim();
    if (initialsInput === "") {
        alert("Enter your initials");
    }
    localStorage.setItem("initials", (initialsInput));
    displayHighScores();
})

function displayHighScores() {
    container.textContent = " ";
    h2 = document.createElement("h2");
    container.appendChild(h2);
    h2.textContent = "Highscores"
    var newHighScore = getHighScore();
    storedInitials = localStorage.getItem("initials");
    ol = document.createElement("ol");
    li = document.createElement("li");
    container.appendChild(ol);
    container.appendChild(li);
    li.textContent = storedInitials + " " + newHighScore;

}
