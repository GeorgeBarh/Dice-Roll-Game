// Declare constants for DOM elements

// This variable will track the selected game type
let gameTypeSelected = '';
//This variable will trace the selected diffulty level
let difficultyLevelSelected = '';

// Define target scores for each game type and difficulty level so as to be easier to handle them inside the functions 
const targets = {
    'one-die': {
        'easy': 7,
        'medium': 11,
        'hard': 14
    },
    'two-dice': {
        'easy': 12,
        'medium': 20,
        'hard': 27
    }
}

// Wait for the DOM to finish loading before running the game

document.addEventListener("DOMContentLoaded", function () {

    /*
    * The game page should appears if the user clicks the start button
    * or if the user presses Enter while the start button is focused.
    */
    let startButton = document.getElementById('start-button')
    startButton.focus();

    //Define event handlers

    function startButtonClickHandler() {
        startButton.addEventListener("click", function () {
            letsPlay();
        });
    }

    startButtonClickHandler();

    function enterKeyPressHandler() {
        startButton.addEventListener('keydown', function (event) {
            if (key.event === 'Enter') {
                letsPlay();
            }
        })
    }

    enterKeyPressHandler();

    function headingClickedHandler() {
        let headingClicked = document.getElementsByTagName('h1')[0];
        headingClicked.addEventListener('click', function () {
            resetToStart();

        });
    }

    headingClickedHandler();


});


function letsPlay() {
    hideContent();
    let gameArea = document.getElementsByClassName('game-area')[0];
    gameArea.style.display = 'block'; // Make sure the game area is visible after the resetGame() 
    gameArea.innerHTML = `
            <div class="game-questions">
                <div class="game-selection">
                    <p>Choose a game:</p>
                    <button data-type="one-die">One Die</button>
                    <button data-type="two-dice">Two Dice</button>
                </div>
                <div class="choose-difficulty">
                    <p>Choose difficulty level:</p>
                    <button data-type="easy">Easy</button>
                    <button data-type="medium">Medium</button>
                    <button data-type="hard">Hard</button>
                </div>
            </div>
            <div class="game">
                <span id= "firstDie" class="dice-result">1</span>
                <span id= "secondDie" class="dice-result">1</span>
                <button id="roll-btn" data-type="submit">Roll!</button>
            </div>
            <div class="score-area">
                <p>Your tries: <span id="tries">0</span></p>
                <p>Your score: <span id="score">0</span></p>
            </div>
            <div class="versus-computer">
                <p>Do you think you can beat the computer?</p>
                <button class="versus-computer-btn">Play versus the computer</button>
            </div>
        `;
    // Call the function to attach event listeners after adding content
    chooseGame();
    setUpDifficulty();
    runGame();
};


function resetToStart() {
    let gameArea = document.getElementsByClassName('game-area')[0]
    gameArea.style.display = 'none';
    let startBtn = document.getElementById('start-button')
    startBtn.style.display = 'block';
    let gameIntro = document.getElementById('game-description');
    gameIntro.style.display = "block";

}


function hideContent() {
    let startButton = document.getElementById('start-button');
    startButton.style.display = "none";
    let gameDescription = document.getElementById('game-description');
    gameDescription.style.display = "none";
}

function chooseGame() {
    // Use querySelectorAll to find the dynamically added buttons
    let gameTypeButtons = document.querySelectorAll('button[data-type="one-die"], button[data-type="two-dice"]');

    for (let i = 0; i < gameTypeButtons.length; i++) {
        let gameTypeButton = gameTypeButtons[i];

        gameTypeButton.addEventListener('click', function () {
            // Check which button was clicked based on its data-type attribute , tracks the selection of the user 
            gameTypeSelected = this.getAttribute('data-type');

            if (gameTypeSelected === 'one-die') {
                alert('You chose to play with One Die! Please select difficulty level.');
            } else if (gameTypeSelected === 'two-dice') {
                alert('You chose to play with Two Dice! Please select difficulty level.');
            }
        });
    }
}

function setUpDifficulty() {
    let difficultyButtons = document.querySelectorAll('button[data-type="easy"], button[data-type="medium"], button[data-type="hard"]');

    for (let i = 0; i < difficultyButtons.length; i++) {
        let difficultyButton = difficultyButtons[i];

        difficultyButton.addEventListener('click', function () {
            if (gameTypeSelected === '') {
                alert('Please choose a game type first!');
                return;
            }

            difficultyLevelSelected = this.getAttribute('data-type'); // Track the selection of the user 

            let targetScore;

            if (gameTypeSelected === 'one-die') {
                targetScore = targets['one-die'][difficultyLevelSelected];
            } else if (gameTypeSelected === 'two-dice') {
                targetScore = targets['two-dice'][difficultyLevelSelected];
            }

            alert(`You have 3 tries to reach the number ${targetScore}! Good luck!`);
        });
    }
}

function runGame() {
    let rollButton = document.getElementById('roll-btn')
    let firstDieResult = document.getElementById('firstDie')
    let secondDieResult = document.getElementById('secondDie')

    rollButton.addEventListener('click', function () {

        if (gameTypeSelected === '') {
            alert("Please select game type and difficulty level.")
            return;
        }

        if (gameTypeSelected === 'one-die') {
            let oneDie = Math.floor(Math.random() * 6) + 1
            firstDieResult.textContent = oneDie;
            secondDieResult.textContent = ""; //Clear the second dice result
        } else if (gameTypeSelected === 'two-dice') {
            let firstDie = Math.floor(Math.random() * 6) + 1;
            let secondDie = Math.floor(Math.random() * 6) + 1;
            firstDieResult.textContent = firstDie;
            secondDieResult.textContent = secondDie;
        }

        incrementTries();
        incrementScore();
        checkResult();

    })
}

function incrementTries() {
    let tries = document.getElementById('tries');
    let currentTries = parseInt(tries.innerText);
    updatedTries = ++currentTries;
    tries.innerText = updatedTries;

}

function incrementScore() {
    let currentScore = parseInt(document.getElementById('score').innerText);
    let firstDieScore = parseInt(document.getElementById('firstDie').innerText);
    let secondDieScore = parseInt(document.getElementById('secondDie').innerText) || 0; // Default to 0: when it is an empty string or not a valid number, it will be treated as 0 in the calculation.


    let updatedScore = currentScore + firstDieScore + secondDieScore;

    document.getElementById('score').innerText = updatedScore;

}

function checkResult() {
    // Convert these to numbers
    let numberOfTries = parseInt(document.getElementById('tries').innerText, 10);
    let scoreNumber = parseInt(document.getElementById('score').innerText, 10);

    // Check if the number of tries is exactly 3
    if (numberOfTries === 3) {
        setTimeout(function () {
            let targetScore;

            if (gameTypeSelected === 'one-die') {
                targetScore = targets['one-die'][difficultyLevelSelected];

                if (scoreNumber >= targetScore) {
                    alert(`Well done! The target was ${targetScore} and you rolled a ${scoreNumber}!`);
                } else {
                    alert(`That's too bad... You rolled a ${scoreNumber} and the target was ${targetScore}. Maybe next time you will be luckier!`);
                }

            } else if (gameTypeSelected === 'two-dice') {
                targetScore = targets['two-dice'][difficultyLevelSelected];

                if (scoreNumber >= targetScore) {
                    alert(`Well done! The target was ${targetScore} and you rolled a ${scoreNumber}!`);
                } else {
                    alert(`That's too bad... You rolled a ${scoreNumber} and the target was ${targetScore}. Maybe next time you will be luckier!`);
                }
            }

            resetGame();
        }, 100); // 100 milliseconds delay to ensure the alert message will be displayed only after the score is updated.
    }
}

function resetGame() {

    document.getElementById('tries').innerText = '0';
    document.getElementById('score').innerText = '0';
    // Clear the values of the dice before the game restart
    document.getElementById('firstDie').innerText = '';
    document.getElementById('secondDie').innerText = '';
    letsPlay();
}
