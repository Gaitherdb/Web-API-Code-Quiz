var container = document.querySelector(".container");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var navHighScore = document.querySelector(".highscore");
var quiz = document.querySelector(".quiz");


var score = 0;
var timerCount;
var timer;
var isCorrect = false;
var isIncorrect = false;
var highscore;
var questions = ["Q1", "Q2", "Q3", "Q4", "Q5"];
var q = 0;
var options = ["first question", "opt 2", "opt 3", "opt 4", "2nd question", "opt2.2", "option 3.2", "option 4.2", "3rd question", "opt 2.3", "option 3.3", "option 4.3", "4th question", "opt 2.4", "opt 3.4", "option 4.4", "5th question", "opt 2.5", "option 3.5", "option 4.5"];
var currentoptions;
var x = 0;
var y = 4;
var h2;



// console.log(q);
startButton.addEventListener("click", startQuiz);

getHighScore();

function getHighScore() {
    // Get stored value from client storage, if it exists
    var storedHighScore = localStorage.getItem("highScore");
    // If stored value doesn't exist, set counter to 0
    if (storedHighScore === null) {
        highscore = 0;
    } else {
        // If a value is retrieved from client storage set the highscore to that value
        highscore = storedHighScore;
    }

    navHighScore.textContent = highscore;
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
            // Tests if win condition is met
            if (isCorrect && timerCount > 0) {
                isCorrect = false;
                correctAnswer();
                renderQuestion();

            }
            if (isIncorrect && timerCount > 0) {
                timerCount -= 5;
                isIncorrect = false;

                renderQuestion();

            }
            if (q == 5) {
                quiz.textContent = " ";
                console.log(q);
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
function currentOptions() {
    if (y <= 20) {
        newoption = options.slice(x, y);
        x = x + 4;
        y = y + 4;
        return newoption;
    }
}
function renderQuestion() {
    quiz.textContent = " ";
    if (q < 5) {

        console.log(q);
        h2 = document.createElement("h2");
        h2.setAttribute("data-index", q);
        quiz.appendChild(h2);
        h2.textContent = questions[q];
        var ul = document.createElement("ul");
        quiz.appendChild(ul);
        currentoptions = currentOptions();


        for (var i = 0; i < currentoptions.length; i++) {

            var li = document.createElement("li");
            li.setAttribute("data-index", i);
            li.textContent = currentoptions[i];
            ul.appendChild(li);
        }


    }
    q++;

}
quiz.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("li")) {
        var optionIndex = element.getAttribute("data-index");
        var questionIndex = h2.getAttribute("data-index");

        if (optionIndex === questionIndex) {
            isCorrect = true;
        }
        else if (optionIndex === 2 && questionIndex === 4) {
            isCorrect = true;
        }
        else {
            isIncorrect = true;
        }
    }
})
// if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     todos.splice(index, 1);

// function checkCorrect() {
//         // If the word equals the blankLetters array when converted to string, set isWin to true
//         if (chosenWord === blanksLetters.join("")) {
//             // This value is used in the timer function to test if win condition is met
//             isCorrect = true;
//         }
//     }
function correctAnswer() {
    score = score + 20;
}

// function incorrectAnswer() {

//     }
function setHighScore() {
    localStorage.setItem("highscore", highscore);
}
function quizOver() {
    q = 0;
    setHighScore();

}


    // if (q === 0) {
    //     currentoptions = options.slice(0, 4);
    // }
    // else if (q === 1) {
    //     currentoptions = options.slice(4, 8);
    // }
    // else if (q === 2) {
    //     currentoptions = options.slice(8, 12);
    // }
    // else if (q === 3) {
    //     currentoptions = options.slice(12, 16);
    // }
    // else {
    //     currentoptions = options.slice(16, 20);)
