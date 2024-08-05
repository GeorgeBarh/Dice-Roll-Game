// Declare constants for DOM elements

let gameTypeSelected = false; // Flag to track if a game type has been selected

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", function () {
    letsPlay();
});

function letsPlay() {
    let startButton = document.getElementById('start-button');
    startButton.addEventListener("click", function () {
        hideContent();
        let gameArea = document.getElementsByClassName('game-area')[0];
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
            <div class="game"></div>
            <div class="score-area">
                <p>Your tries: <span></span></p>
                <p>Your score: <span></span></p>
            </div>
            <div class="versus-computer">
                <p>Do you think you can beat the computer?</p>
                <button class="versus-computer-btn">Play versus the computer</button>
            </div>
        `;
        // Call the function to attach event listeners after adding content
        chooseGame();
        oneDieDifficulty();
    });
}

function hideContent() {
    let startButton = document.getElementById('start-button');
    startButton.style.display = "none";
    let gameDescription = document.getElementById('game-description');
    if (gameDescription) {
        gameDescription.style.display = "none";
    }
}

function chooseGame() {
    // Use querySelectorAll to find the dynamically added buttons
    let gameTypeButtons = document.querySelectorAll('button[data-type="one-die"], button[data-type="two-dice"]');

    for (let i = 0; i < gameTypeButtons.length; i++) {
        let gameTypeButton = gameTypeButtons[i];

        gameTypeButton.addEventListener('click', function () {
            // Check which button was clicked based on its data-type attribute
            if (this.getAttribute('data-type') === "one-die") {
                alert('You chose to play with One Die! Please select difficulty level to start the game!');
            } else if (this.getAttribute('data-type') === 'two-dice') {
                alert('You chose to play with Two Dice! Please select difficulty to start the game!');
            }

            gameTypeSelected = true;
        });
    }
}

/*
* Alerts the user regarding the difficulty of the 'One Die' game type
*/

function oneDieDifficulty() {
    let oneDieDifficultyLevels = document.querySelectorAll('button[data-type="easy"], button[data-type="medium"], button[data-type="hard"]');

    for (let i = 0; i < oneDieDifficultyLevels.length; i++) {
        let oneDieDifficultyLevel = oneDieDifficultyLevels[i];

        oneDieDifficultyLevel.addEventListener('click', function () {

            if (!gameTypeSelected) {
                alert('Please select a game type first!')
                return;
            }

            if (this.getAttribute('data-type') === 'easy') {
                alert('You have 3 tries to reach the number 6!');
            } else if (this.getAttribute('data-type') === 'medium') {
                alert('You have 3 tries to reach number 9!');
            } else if (this.getAttribute('data-type') === 'hard') {
                alert('You have 3 tries to reach number 12!');
            }
        });
    }
}

/*
* Alerts the user regarding the difficulty of the 'Two Dice' game type
*/

function twoDiceDifficulty() {

    let twoDiceDifficultyLevels = document.querySelectorAll('button[data-type= "easy"], button[data-type="medium"], button[data-type= "hard"]')

}


function oneDieGame() {

}

function twoDiceGame {

}
