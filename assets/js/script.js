// Declare constants and global variables

// This variable will track the selected game type
let gameTypeSelected = '';

//This variable will trace the selected difficulty level
let difficultyLevelSelected = '';


//This variable will trace the target score based on the difficulty level and the game type
let targetScore = 0;

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
    addGameHtml();
    hideContent();
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
    let gameIntro = document.getElementById('instructions');
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
    let gameDescription = document.getElementById('instructions');
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
            <p class="two">Choose a game type:</p>
            <button class="game-settings-btn" data-type="one-die" aria-label="Select game with one die">One Die</button>
            <button class="game-settings-btn" data-type="two-dice" aria-label="Select game with two dice">Two Dice</button>
        </div>
        <div class="choose-difficulty">
            <p>Choose difficulty level:</p>
            <button class="game-settings-btn" data-type="easy" aria-label="Select easy difficulty">Easy</button>
            <button class="game-settings-btn medium" data-type="medium" aria-label="Select medium difficulty">Medium</button>
            <button class="game-settings-btn" data-type="hard" aria-label="Select hard difficulty">Hard</button>
        </div>
    </div>

<div class="game">
    <div class="score-area">
        <p>Your score: <span id="score" class="counter-style">0</span></p>
        <p>Your target: <span id="goal" class="counter-style">${targetScore}</span></p>
    </div>
    <div class="images-box">   
        <img id="first-die" src="assets/images/die-1.png" class="dice-images dice" alt="Die showing one" aria-label="First die showing one">
        <img id="second-die" src="assets/images/die-1.png" class="dice-images dice" alt="Die showing one" aria-label="Second die showing one">
    </div>
    <div>
        <p>Your tries: <span id="tries" class="counter-style">0</span></p>
    </div>
</div>

<div>
    <button id="roll-btn" data-type="submit" aria-label="Roll the dice">Roll!</button>
</div>
<div id="choose-opponent">
    <p>Do you think you can beat the computer?</p>
    <button id="choose-opponent-btn" class="choose-player-btn" aria-label="Play versus the computer">Play versus the computer</button>
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

            if (gameTypeSelected === 'one-die') {
                targetScore = targets['one-die'][difficultyLevelSelected];
            } else if (gameTypeSelected === 'two-dice') {
                targetScore = targets['two-dice'][difficultyLevelSelected];
            }

            updateTargetScoreHtml();

            alert(`You have 3 tries to reach the number ${targetScore}! Good luck!`);
        });
    }
}


/**
 *  * This function updates the text content of the target score element with the current target score
 */

function updateTargetScoreHtml() {
    let scoreGoal = document.getElementById('goal');
    if (scoreGoal) {
        scoreGoal.innerText = targetScore;
    }
}

function runGame() {
    let rollButton = document.getElementById('roll-btn');
    let firstDieImage = document.getElementById('first-die');
    let secondDieImage = document.getElementById('second-die');


    rollButton.addEventListener('click', function () {
        // Check if both game type and difficulty level are selected
        if (gameTypeSelected === '' || difficultyLevelSelected === '') {
            if (gameTypeSelected === '' && difficultyLevelSelected === '') {
                alert('Please select game type first and then the difficulty level.Good luck!');
            } else if (gameTypeSelected === '') {
                alert("Please select a game type.");
            } else if (difficultyLevelSelected === '') {
                alert("Please select a difficulty level.");
            }
            return; // Exit the function if any selection is missing
        }

        // Add animation class
        firstDieImage.classList.add('dice');
        secondDieImage.classList.add('dice');

        // Check game type and update dice values and images
        if (gameTypeSelected === 'one-die') {
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
            firstDieImage.classList.remove('dice');
            secondDieImage.classList.remove('dice');
            checkResult(); // 
        }, 600);
    });
}

/**
 * This function updates the tries display in the HTML in the single game (not in *the versus computer game)
 *  */

function incrementTries() {
    setTimeout(function () {
        let tries = document.getElementById('tries');
        let currentTries = parseInt(tries.innerText);
        updatedTries = ++currentTries;
        tries.innerText = updatedTries;
    }, 250) // Adjust the same delay with incrementScore() in order the score and tries to be displayed at the same time.
}

/**
 * /**
 * This function updates the score and display in the *HTML in the single game (not in *the versus computer *game)
   */


function incrementScore() {

    // setTimeout to introduce a delay before updating the score

    setTimeout(function () {
        let currentScore = parseInt(document.getElementById('score').innerText);

        let updatedScore = currentScore + firstDieValue + secondDieValue || 0;

        document.getElementById('score').innerText = updatedScore;
    }, 250); // Adjust the delay duration so as to show the score after the dice images are fully loaded.
}

/**
 *compares the player's score with the target score after *3 tries,
 * and updates the result display with a win or lose message.
 */

function checkResult() {
    // Convert these elements to numbers
    let numberOfTries = parseInt(document.getElementById('tries').innerText);
    let scoreNumber = parseInt(document.getElementById('score').innerText);

    // Check if the number of tries is exactly 3
    if (numberOfTries == 3) {

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

// Reset dice images based on the game type
let firstDieImage = document.getElementById('first-die');
let secondDieImage = document.getElementById('second-die');

firstDieImage.src = diceImages[1]; // Reset to default image
if (gameTypeSelected === 'one-die') {
    secondDieImage.style.display = 'none'; // Hide the second die
} else if (gameTypeSelected === 'two-dice') {
    secondDieImage.src = diceImages[1]; // Reset to default image
    secondDieImage.style.display = 'block'; // Display the second die
}

//     // Call letsPlay to ensure game area and state are correctly initialized
//     letsPlay();
// }

function resetGame() {
    // Clear the values of the dice before the game restart
    document.getElementById('tries').innerText = '0';
    document.getElementById('score').innerText = '0';
    firstDieValue = 0;
    secondDieValue = 0;
    letsPlay();
}

// Versus Computer Game set up

/**
 * Sets up event listener for playing against the pc.
 * This function attach a click event listener to the button for playing vs the computer.
 */

function vsComputerClickListener() {
    let vsComputerBtn = document.getElementById('choose-opponent-btn')
    vsComputerBtn.addEventListener('click', playVsComputer)
}

/** 
 * This is the main function the of game againist the computer
 * This function updates the game HTML for the versus computer mode, sets up event listeners,
 * and adjusts the dice image sizes based on the selected game type.
 */
function playVsComputer() {
    versusComputerHtml();

    let playerFirstDieImage = document.getElementById('player-first-die')
    let playerSecondDieImage = document.getElementById('player-second-die')
    let computerFirstDieImage = document.getElementById('computer-first-die')
    let computerSecondDieImage = document.getElementById('computer-second-die')

    // Update class for dice image size so as to fit inside the game area when the the game vs computer in two dice game needs four images

    playerFirstDieImage.classList.remove('dice-images');
    playerSecondDieImage.classList.remove('dice-images');
    computerFirstDieImage.classList.remove('dice-images');
    computerSecondDieImage.classList.remove('dice-images');

    playerFirstDieImage.classList.add('dice-size');
    playerSecondDieImage.classList.add('dice-size');
    computerFirstDieImage.classList.add('dice-size');
    computerSecondDieImage.classList.add('dice-size');



    chooseGameVsComputer();
    runComputerGame();
    playSingeGameListener();
}



function versusComputerHtml() {
    let versusPc = document.getElementsByClassName('game-area')[0]
    versusPc.innerHTML = `
<div class="game-questions">
    <div class="game-selection">
        <p>Choose a game type:</p>
        <button class="game-settings-btn" data-type="one-die" aria-label="Select game with one die">One Die</button>
        <button class="game-settings-btn" data-type="two-dice" aria-label="Select game with two dice">Two Dice</button>
    </div>
</div>

<div class="game">
    <div class="player-vs-computer">
        <div id="player-area" class="player-area">
            <p>Player score: <span id="player-score" class="counter-style">0</span></p>
            <div class="dice-container">
                <img id="player-first-die" src="assets/images/die-1.png" class="dice-images"
                    alt="Player's first die showing one" aria-label="Player's first die showing one">
                <img id="player-second-die" src="assets/images/die-1.png" class="dice-images"
                    alt="Player's second die showing one" aria-label="Player's second die showing one">
            </div>
        </div>
        <div id="computer-area" class="computer-area">
            <p>Computer score: <span id="computer-score" class="counter-style">0</span></p>
            <div class="dice-container">
                <img id="computer-first-die" src="assets/images/die-1.png" class="dice-images dice"
                    alt="Computer's first die showing one" aria-label="Computer's first die showing one">
                <img id="computer-second-die" src="assets/images/die-1.png" class="dice-images dice"
                    alt="Computer's second die showing one" aria-label="Computer's second die showing one">
            </div>
        </div>
    </div>
    <div class="tries-area">
        <p>Your tries: <span id="tries" class="counter-style">0</span></p>
    </div>
</div>

<div>
    <button id="roll-btn" data-type="submit" aria-label="Roll the dice">Roll!</button>
</div>
<div id="choose-opponent">
    <button id="choose-opponent-btn" aria-label="Play single game">Play single game</button>
</div>
`;
}


/**
 * Sets up event listeners for selecting the game type when playing against the computer.
 * This function attaches click event listeners to the game type selection buttons,
 * updates the selected game type, and adjusts the dice image display based on the selection.
 */
function chooseGameVsComputer() {
    // Use querySelectorAll to find the dynamically added buttons
    let gameTypeButtons = document.querySelectorAll('button[data-type="one-die"], button[data-type="two-dice"]');

    let playerFirstDieImg = document.getElementById('player-first-die');
    let playerSecondDieImg = document.getElementById('player-second-die');

    let computerFirstDieImg = document.getElementById('computer-first-die');
    let computerSecondDieImg = document.getElementById('computer-second-die')


    for (let i = 0; i < gameTypeButtons.length; i++) {
        let gameTypeButton = gameTypeButtons[i];

        gameTypeButton.addEventListener('click', function () {
            // Check which button was clicked based on its data-type attribute, tracks the selection of the user 
            gameTypeSelected = this.getAttribute('data-type');

            if (gameTypeSelected === 'one-die') {
                alert('You chose to compete the computer with One Die! Whoever roll the higher number wins!');

                // Hide the computers second die if the user plays one die game.
                playerSecondDieImg.style.display = "none";

                // Update the class in order the images to be larger since when they are only two, they fit in the game.
                playerFirstDieImg.classList.remove('dice-size');
                playerFirstDieImg.classList.add('dice-images');

                // Hide the computers second die if the user plays one die game.

                computerSecondDieImg.style.display = 'none'

                computerFirstDieImg.classList.remove('dice-size');
                computerFirstDieImg.classList.add('dice-images');


            } else if (gameTypeSelected === 'two-dice') {
                alert('You chose to compete the computer with Two Dice! Whoever roll the higher number wins!');


                //Display the players second die image if the user click two dice game
                playerSecondDieImg.style.display = "block";

                // Update the class again so as to make the images smaller and able to fit in the game area
                playerFirstDieImg.classList.remove('dice-images');
                playerFirstDieImg.classList.add('dice-size');

                //Display the computers second die image if the user click two dice  game
                computerSecondDieImg.style.display = 'block'

                // Update the class again so as to make the images smaller and able to fit in the game area
                computerFirstDieImg.classList.remove('dice-images');
                computerFirstDieImg.classList.add('dice-size');

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
            alert("Please select game type to start the game! Good luck!");
            return;
        }

        // Add animation class
        playerFirstDieImage.classList.add('dice');
        playerSecondDieImage.classList.add('dice');
        computerFirstDieImage.classList.add('dice');
        computerSecondDieImage.classList.add('dice');

        if (gameTypeSelected === 'one-die') {
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

            computerSecondDieImage.style.display = 'block'

            // Add the small size class for two-dice game

            playerFirstDieImage.classList.add('dice-size');
            playerSecondDieImage.classList.add('dice-size');
            computerFirstDieImage.classList.add('dice-size');
            computerSecondDieImage.classList.add('dice-size');

        }

        //Display the dice images after the delay
        incrementTries();
        playerIncrementScore();
        computerIncrementScore();
        //checkResult is called after the score and tries function updates are visible
        setTimeout(function () {
            playerFirstDieImage.classList.remove('dice');
            playerSecondDieImage.classList.remove('dice');
            computerFirstDieImage.classList.remove('dice');
            computerSecondDieImage.classList.remove('dice');
            checkResultVsComputer();
        }, 600);
    })

}


/**
 * Update the players score and display it in the HTML.
 */

function playerIncrementScore() {
    setTimeout(function () {
        // Get the current score and ensure it's a number, defaulting to 0 if not
        let playerCurrentScore = parseInt(document.getElementById('player-score').innerText) || 0;

        // Calculate the updated score
        let playerUpdatedScore = playerCurrentScore + playerFirstDieValue + (playerSecondDieValue || 0);

        // Update the score in the DOM
        document.getElementById('player-score').innerText = playerUpdatedScore;
    }, 250); // Adjust the delay duration if needed
}

/**
 * Update the computer's score and display it in the HTML.
 */

function computerIncrementScore() {
    setTimeout(function () {
        let computerCurrentScore = parseInt(document.getElementById('computer-score').innerText);

        let computerUpdatedScore = computerCurrentScore + computerFirstDieValue + (computerSecondDieValue || 0);

        document.getElementById('computer-score').innerText = computerUpdatedScore;
    }, 250);
}

/*
* Check the player#s score, the computer's score and the *tries and announce the winner. Then reset the game.
*/
function checkResultVsComputer() {
    // Convert score elements to numbers
    let playerScore = parseInt(document.getElementById('player-score').innerText, 10);
    let computerScore = parseInt(document.getElementById('computer-score').innerText, 10);
    let numberOfTries = parseInt(document.getElementById('tries').innerText, 10);

    // Check if the number of tries is exactly 3
    if (numberOfTries === 3) {
        // Determine the winner based on the highest score
        let resultMessage;
        if (playerScore > computerScore) {
            resultMessage = `Congratulations! You won! Your score was ${playerScore} and the computer's score was ${computerScore}.`;
        } else if (playerScore < computerScore) {
            resultMessage = `That's too bad...You lost. Your score was ${playerScore} and the computer's score was ${computerScore}.`;
        } else {
            resultMessage = `It's a tie! Both you and the computer scored ${playerScore}.`;
        }
        alert(resultMessage);

        resetVersusComputerGame();
    }
}


function resetVersusComputerGame() {
    // Clear the values of the dice before the game restart
    document.getElementById('tries').innerText = '0';
    document.getElementById('player-score').innerText = '0';
    document.getElementById('computer-score').innerText = '0';

    playerFirstDieValue = 0;
    playerSecondDieValue = 0;
    computerFirstDieValue = 0;
    computerSecondDieValue = 0;
    playVsComputer();
}

/**
 * This function attaches click event listener to the choose opponent button in order the user to play single game
 */

function playSingeGameListener() {
    let playSingeGameBtn = document.getElementById('choose-opponent-btn')
    playSingeGameBtn.addEventListener('click', letsPlay)
}


