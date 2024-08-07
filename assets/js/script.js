// Declare constants for DOM elements

// This variable will track the selected game type
let gameTypeSelected = '';
//This variable will trace the selected difficulty level
let difficultyLevelSelected = '';

/*
*Define target scores for each game type and difficulty level so as to be easier to handle them inside the functions 
*/
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

/*
* Declare global variables for dice values so as to be updated 
* in the incrementScore() and runGame() functions
*/
let firstDieValue = 0;
let secondDieValue = 0;

/*
*This object includes the images of the die that will display to
*the screen according to the random number (between 1-6 ) that *the user will roll once they click the Roll button 
*/

const diceImages = {
    1: 'assets/images/die-1.png',
    2: 'assets/images/die-2.png',
    3: 'assets/images/die-3.png',
    4: 'assets/images/die-4.png',
    5: 'assets/images/die-5.png',
    6: 'assets/images/die-6.png',
}

// Wait for the DOM to finish loading before running the game

document.addEventListener("DOMContentLoaded", function () {

    /*
    * The game page should appear if the user clicks the start button
    * or if the user presses Enter while the start button is focused.
    */
    let startButton = document.getElementById('start-button')
    startButton.focus();

    startButtonListener();
    enterKeyPressListener();
    headingClickedListener();

    // Define Event Listeners

    function startButtonListener() {
        startButton.addEventListener("click", letsPlay);
    }

    function enterKeyPressListener() {
        startButton.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                letsPlay();
            }
        });
    }

    function headingClickedListener() {
        let headingClicked = document.getElementsByTagName('h1')[0];
        headingClicked.addEventListener('click', resetToStart);
    }

});

// Declare Handlers

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
                <img id="firstDie" src="assets/images/die-1.png" class="dice-result" alt="firstdie-number-image"></img>
                <img id="secondDie" src="assets/images/die-1.png" class="dice-result" alt="second-die-image"></img>
            </div>
            <div>
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
}

function resetToStart() {
    let gameArea = document.getElementsByClassName('game-area')[0];
    gameArea.style.display = 'none';
    let startBtn = document.getElementById('start-button');
    startBtn.style.display = 'block';
    let gameIntro = document.getElementById('game-description');
    gameIntro.style.display = "block";

    let startButton = document.getElementById('start-button');
    startButton.focus(); // it sets the startButton on focus after the reset so as the enterKeyPressListener to work again.
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
            // Check which button was clicked based on its data-type attribute, tracks the selection of the user 
            gameTypeSelected = this.getAttribute('data-type');

            if (gameTypeSelected === 'one-die') {
                alert('You chose to play with One Die! Please select difficulty level.');

                // Hide the second die if the user plays one die game.
                let secondDieImg = document.getElementById('secondDie');
                secondDieImg.style.display = "none";

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
    let rollButton = document.getElementById('roll-btn');
    let firstDieImage = document.getElementById('firstDie');
    let secondDieImage = document.getElementById('secondDie');

    rollButton.addEventListener('click', function () {
        if (gameTypeSelected === '') {
            alert("Please select game type and difficulty level.");
            return;
        }

        // Hide the dice initially 
        firstDieImage.style.display = 'none';
        secondDieImage.style.display = 'none';


        if (gameTypeSelected === 'one-die') {
            firstDieValue = Math.floor(Math.random() * 6) + 1;
            firstDieImage.src = diceImages[firstDieValue];
            secondDieImage.src = ''; // Clear the second die
            secondDieImage.style.display = 'none';
            console.log(secondDieValue)
        } else if (gameTypeSelected === 'two-dice') {
            firstDieValue = Math.floor(Math.random() * 6) + 1;
            secondDieValue = Math.floor(Math.random() * 6) + 1;
            firstDieImage.src = diceImages[firstDieValue];
            secondDieImage.src = diceImages[secondDieValue];
            secondDieImage.style.display = 'block';
        }

        // Display the dice images after the delay

        firstDieImage.style.display = 'block';
        secondDieImage.style.display = gameTypeSelected === 'two-dice' ? 'block' : 'none';

        incrementTries();
        incrementScore();

        //checkResult is called after the score and tries updates are visible
        setTimeout(function () {
            checkResult(); // 
        }, 300);
    });
}

function incrementTries() {
    setTimeout(function () {
        let tries = document.getElementById('tries');
        let currentTries = parseInt(tries.innerText);
        updatedTries = ++currentTries;
        tries.innerText = updatedTries;
    }, 250) // Adjust the same delay with incrementScore() in order the score and tries to be displayed at the same time.
}

function incrementScore() {

    // setTimeout to introduce a delay before updating the score

    setTimeout(function () {
        let currentScore = parseInt(document.getElementById('score').innerText) || 0;

        let updatedScore = currentScore + firstDieValue + secondDieValue;

        document.getElementById('score').innerText = updatedScore;
    }, 250); // Adjust the delay duration so as to show the score after the dice images are fully loaded.
}

function checkResult() {
    // Convert these elements to numbers
    let numberOfTries = parseInt(document.getElementById('tries').innerText);
    let scoreNumber = parseInt(document.getElementById('score').innerText);

    // Check if the number of tries is exactly 3
    if (numberOfTries == 3) {
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
    }


}

function resetGame() {
    document.getElementById('tries').innerText = '0';
    document.getElementById('score').innerText = '0';
    firstDieValue = 0;
    secondDieValue = 0;
    // Clear the values of the dice before the game restart
    // document.getElementById('firstDie').src = '';
    // document.getElementById('secondDie').src = '';
    letsPlay();
}