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
var highscore = 0;



startButton.addEventListener("click", startGame);

getHighScore();

function getHighScore() {
    // Get stored value from client storage, if it exists
    var storedHighScore = localStorage.getItem("highScore");
    // If stored value doesn't exist, set counter to 0
    if (storedHighScore === null) {
      highscore = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      highscore = storedHighScore;
    }
    //Render win count to page
    navHighScore.textContent = highscore;
  }
function startGame() {

    timerCount = 15;

    // renderBlanks()
    // renderQuestion()
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
                // Clears interval and stops timer
                correctAnswer();
            }
            if (isIncorrect && timerCount > 0) {
                timerCount = timerCount - 5;
            }
        }
        // Tests if time has run out
        if (timerCount <= 0) {
            // Clears interval
            timerCount = 0;
            clearInterval(timer);
            timerElement.textContent = timerCount;
            gameOver();
        }
    }, 1000);
}

function renderQuestion() {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
    
        var li = document.createElement("li");
        li.textContent = todo;
        li.setAttribute("data-index", i);
    
        var button = document.createElement("button");
        button.textContent = "Complete ✔️";
    
        li.appendChild(button);
        todoList.appendChild(li);
      }
    // for (var i = 0; i < todos.length; i++) {
    //     var todo = todos[i];
    
    //     var li = document.createElement("li");
    //     li.textContent = todo;
    //     li.setAttribute("data-index", i);
    
    //     var button = document.createElement("button");
    //     button.textContent = "Complete ✔️";
    
    //     li.appendChild(button);
    //     todoList.appendChild(li);
    //   }
}
function checkCorrect() {
    // If the word equals the blankLetters array when converted to string, set isWin to true
    if (chosenWord === blanksLetters.join("")) {
      // This value is used in the timer function to test if win condition is met
      isCorrect = true;
    }
  }
function correctAnswer() {
score = score + 20;
}

function incorrectAnswer() {

}

function gameOver() {

}
