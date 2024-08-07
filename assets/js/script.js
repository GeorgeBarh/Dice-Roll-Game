// Declare constants and global variables

// This variable will track the selected game type
let gameTypeSelected = '';

//This variable will trace the selected difficulty level
let difficultyLevelSelected = '';


/*
* Declare global variables for dice values so as to be updated 
* in the incrementScore() and runGame() functions 
*/
let firstDieValue = 0;
let secondDieValue = 0;

// The same with above but for the versusComputerGame()
let playerFirstDieValue = 0;
let playerSecondDieValue = 0;
let computerFirstDieValue = 0;
let computerSecondDieValue = 0;

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

    /**
 * Sets up an event listener for the start button click event.
 * This function attaches a click event listener to the start button. When the start  button is clicked, it triggers the *letsPlay function, which initializes and starts the game.
 */

    function startButtonListener() {
        startButton.addEventListener("click", letsPlay);
    }

    /**
 * Sets up an event listener for the Enter key press on the start button.
 * 
 * This function attaches a keydown event listener to the start button. If the Enter key 
 * is pressed while the start button is focused, it triggers the letsPlay function, 
 * which initializes the game and starts the game.
 */

    function enterKeyPressListener() {
        startButton.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                letsPlay();
            }
        });
    }

    /**
 * Set up an event listener for clicks on the page heading.
 * 
 * This function attaches a click event listener to the h1 element on the page. 
 * When the heading is clicked, it triggers the resetToStart function, which resets 
 * the game to its initial state and displays the start button and game description.
 */
    function headingClickedListener() {
        let headingClicked = document.getElementsByTagName('h1')[0];
        headingClicked.addEventListener('click', resetToStart);
    }

});


//Declare event handlers

/**
 * This is the game's main function.
 * Initializes the game interface and sets up event listeners.
 * This function hides the introductory content, adds the game html to the page
 * and attaches event listeners for game interactions. It prepares the game for user 
 * interaction by calling functions to choose the game type, set up difficulty levels, 
 * and handle the game logic.
 */
function letsPlay() {
    hideContent();
    addGameHtml();
    chooseGame();
    setUpDifficulty();
    runGame();
    vsComputerClickListener();
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

// Declare initialization functions

/**
 * Hides the introductory content and game start button.
 * 
 * This function is used to hide elements that are not part of the game area, such as 
 * the start button and the game description, making the game area visible and ready 
 * for interaction.
 */

function hideContent() {
    let startButton = document.getElementById('start-button');
    startButton.style.display = "none";
    let gameDescription = document.getElementById('game-description');
    gameDescription.style.display = "none";
}

/**
 * Adds the game HThtmlL content to the page.
 * 
 * This function dynamically generates and inserts the HTML elements required for 
 * the game interface, including game selection buttons, difficulty levels, dice images, 
 * roll button, and score area. It ensures that the game interface is displayed to the user.
 */
function addGameHtml() {
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
            <img id="first-die" src="assets/images/die-1.png" class="dice-result" alt="firstdie-number-image"></img>
            <img id="second-die" src="assets/images/die-1.png" class="dice-result" alt="second-die-image"></img>
        </div>
        
        <div class="score-area">
            <p>Your tries: <span id="tries">0</span></p>
            <p>Your score: <span id="score">0</span></p>
        </div>
        <div>
        <button id="roll-btn" data-type="submit">Roll!</button>
        </div>
        <div id="choose-opponent">
            <p>Do you think you can beat the computer?</p>
            <button id="choose-opponent-btn" class="choose-player-btn">Play versus the computer</button>
        </div>
    `;
}

// Declare game setup Functions
/**
 * Sets up event listeners for selecting the game type.
 * This function attaches click event listeners to the game type selection buttons. 
 * It updates the `gameTypeSelected` variable based on the user's choice and adjusts 
 * the game interface accordingly.
 */
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
                let secondDieImg = document.getElementById('second-die');
                secondDieImg.style.display = "none";

            } else if (gameTypeSelected === 'two-dice') {
                alert('You chose to play with Two Dice! Please select difficulty level.');

                //Display the second die image if the user play second die game
                let secondDieImg = document.getElementById('second-die');
                secondDieImg.style.display = "block";
            }
        });
    }
}

/**
 * Sets up event listeners for selecting the difficulty level.
 * 
 * This function attaches click event listeners to the difficulty level selection buttons. 
 * It updates the `difficultyLevelSelected` variable based on the user's choice and 
 * alerts the user with the target score for the selected difficulty level.
 */
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
    let firstDieImage = document.getElementById('first-die');
    let secondDieImage = document.getElementById('second-die');


    rollButton.addEventListener('click', function () {
        if (gameTypeSelected === '') {
            alert("Please select game type and difficulty level.");
            return;
        }
        else if (gameTypeSelected === 'one-die') {
            firstDieValue = Math.floor(Math.random() * 6) + 1;
            firstDieImage.src = diceImages[firstDieValue];
            // Clear the second die
            secondDieImage.style.display = 'none';
        } else if (gameTypeSelected === 'two-dice') {
            firstDieValue = Math.floor(Math.random() * 6) + 1;
            secondDieValue = Math.floor(Math.random() * 6) + 1;
            firstDieImage.src = diceImages[firstDieValue];
            secondDieImage.src = diceImages[secondDieValue];
            secondDieImage.style.display = 'block';
        }

        // Display the dice images after the delay

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
    // Clear the values of the dice before the game restart
    document.getElementById('tries').innerText = '0';
    document.getElementById('score').innerText = '0';
    firstDieValue = 0;
    secondDieValue = 0;
    letsPlay();
}

// Versus Computer set up

function vsComputerClickListener() {
    let vsComputerBtn = document.getElementById('choose-opponent-btn')
    vsComputerBtn.addEventListener('click', playVsComputer);
}

function playVsComputer() {
    versusComputerHtml();
    chooseGameVsComputer();
    setUpDifficulty();
    runComputerGame();
}



function versusComputerHtml() {
    let versusPc = document.getElementsByClassName('game-area')[0]
    versusPc.innerHTML = `
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
    <div id="player-area">
        <img id="player-first-die" src="assets/images/die-1.png" class="dice-result"
            alt="player-firstdie-number-image"></img>
        <img id="player-second-die" src="assets/images/die-1.png" class="dice-result" alt="player-second-die-image"></img>
    </div>
    <div id="computer-area">
        <img id="computer-first-die" src="assets/images/die-1.png" class="dice-result"
            alt="computer-firstdie-number-image"></img>
        <img id="computer-second-die" src="assets/images/die-1.png" class="dice-result"
            alt="computer-second-die-image"></img>
    </div>
</div>
<div class="score-area">
    <p>Your score: <span id="score">0</span></p>
    <p>Your tries: <span id="tries">0</span></p>
    <p>Computer score: <span id="computer-score">0</span></p>
</div>
<div>
    <button id="roll-btn" data-type="submit">Roll!</button>
</div>
<div id="choose-opponent">
    <button id="choose-opponent-btn">Play single game</button>
</div>
`;
}

function chooseGameVsComputer() {
    // Use querySelectorAll to find the dynamically added buttons
    let gameTypeButtons = document.querySelectorAll('button[data-type="one-die"], button[data-type="two-dice"]');

    for (let i = 0; i < gameTypeButtons.length; i++) {
        let gameTypeButton = gameTypeButtons[i];

        gameTypeButton.addEventListener('click', function () {
            // Check which button was clicked based on its data-type attribute, tracks the selection of the user 
            gameTypeSelected = this.getAttribute('data-type');

            if (gameTypeSelected === 'one-die') {
                alert('You chose to compete the computer with One Die! Please select difficulty level.');

                // Hide the players second die if the user plays one die game.
                let playerSecondDieImg = document.getElementById('player-second-die');
                playerSecondDieImg.style.display = "none";
                // Hide the computers second die if the user plays one die game.
                let computerSecondDieImg = document.getElementById('computer-second-die')
                computerSecondDieImg.style.display = 'none'

            } else if (gameTypeSelected === 'two-dice') {
                alert('You chose to compete the computer with Two Dice! Please select difficulty level.');

                //Display the players second die image if the user click two dice  game
                let playerSecondDieImg = document.getElementById('player-second-die');
                playerSecondDieImg.style.display = "block";
                //Display the computers second die image if the user click two dice  game
                let computerSecondDieImg = document.getElementById('computer-second-die')
                computerSecondDieImg.style.display = 'block'

            }
        });
    }
}

function runComputerGame() {
    let rollBtn = document.getElementById('roll-btn');
    let playerFirstDieImage = document.getElementById('player-first-die')
    let playerSecondDieImage = document.getElementById('player-second-die')
    let computerFirstDieImage = document.getElementById('computer-first-die')
    let computerSecondDieImage = document.getElementById('computer-second-die')

    rollBtn.addEventListener('click', function () {
        if (gameTypeSelected === '') {
            alert("Please select game type and difficulty level.");
            return;
        }
        else if (gameTypeSelected === 'one-die') {
            // Players die
            playerFirstDieValue = Math.floor(Math.random() * 6) + 1;
            playerFirstDieImage.src = diceImages[playerFirstDieValue];
            // Hides players the second die
            playerSecondDieImage.style.display = 'none'
            //Computers die
            computerFirstDieValue = Math.floor(Math.random() * 6) + 1
            computerFirstDieImage.src = diceImages[computerFirstDieValue]
            // Hides computers second die
            computerSecondDieImage.style.display = 'none'
        }
        else if (gameTypeSelected === 'two-dice') {
            //Players dice
            playerFirstDieValue = Math.floor(Math.random() * 6) + 1;
            playerFirstDieImage.src = diceImages[playerFirstDieValue];
            playerSecondDieValue = Math.floor(Math.random() * 6) + 1;
            playerSecondDieImage.src = diceImages[playerSecondDieValue]
            //Computers dice
            computerFirstDieValue = Math.floor(Math.random() * 6) + 1;
            computerFirstDieImage.src = diceImages[computerFirstDieValue];
            computerSecondDieValue = Math.floor(Math.random() * 6) + 1;
            computerSecondDieImage.src = diceImages[computerSecondDieValue];

            // Display the second die again
            computerSecondDieImage.style.display = 'block'

            //Display the dice images after the delay
            incrementTries();
            incrementScore();

            //checkResult is called after the score and tries updates are visible
            setTimeout(function () {
                checkResult();
            }, 300);
        }
    })

}
