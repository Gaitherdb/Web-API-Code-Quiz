var container = document.querySelector(".container");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var navHighScore = document.querySelector(".highscore");
var quiz = document.querySelector(".quiz");
var feedBack = document.querySelector("#feedback");
var initials = document.querySelector("#initials");
var initialsText = document.querySelector("#initials-text");
var initialsButton = document.querySelector(".initialsButton");

var score = 0;
var timerCount;
var timer;
var isCorrect = false;
var isIncorrect = false;
var highScore;
var questions = ["Primitive value \"John Doe\" is a:", "If var x = 3 and var = \"3\" then x + y = ?", "What does DOM stand for?", "What symbols are used for commenting in Javascript?", "For, while, & do...while are types of what?"];
var q = 0;
var options = ["String", "Boolean", "Number", "Biginit", "3, 3", "\"33\"", "3\"3\"", "\"6\"", "Do Or Move", "Dominant Operator Mode", "Document Object Model", "Domain Online Monitor", "**", "^^", "%%", "//", "Commands", "If statements", "Loops", "Variables"];
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
    timerCount = 30;
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
            quiz.textContent = " ";
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
    initials.style.display = "flex";
    var button = document.createElement("button");
    initials.appendChild(button);
    button.textContent = "Submit";
}
//saves high score and calls function to render to submit initials
function quizOver() {
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
    else if (initialsInput != "") {
        localStorage.setItem("initials", (initialsInput));
        displayHighScores();
    }
})

function displayHighScores() {
    container.textContent = " ";
    h2 = document.createElement("h2");
    var div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("highscore-container");
    div.appendChild(h2);
    h2.textContent = "Highscores";
    var newHighScore = getHighScore();
    storedInitials = localStorage.getItem("initials");
    ol = document.createElement("ol");
    li = document.createElement("li");
    div.appendChild(ol);
    ol.appendChild(li);
    li.textContent = storedInitials + " " + newHighScore;
}


