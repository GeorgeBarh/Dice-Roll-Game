// Declare constants for DOM elements
let gameTypeSelected = '';  // This variable will track the selected game type

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
            <div class="game">
                <button class="roll-btn" data-type="submit">Roll!</button>
            </div>
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
        setUpDifficulty();
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

            if (gameTypeSelected === 'one-die') {
                if (this.getAttribute('data-type') === 'easy') {
                    alert('You have 3 tries to reach the number 6! Good luck!');
                } else if (this.getAttribute('data-type') === 'medium') {
                    alert('You have 3 tries to reach the number 9! Good luck!');
                } else if (this.getAttribute('data-type') === 'hard') {
                    alert('You have 3 tries to reach the number 12! Good luck!');
                }
            } else if (gameTypeSelected === 'two-dice') {
                if (this.getAttribute('data-type') === 'easy') {
                    alert('You have 3 tries to reach the number 12! Good luck!');
                } else if (this.getAttribute('data-type') === 'medium') {
                    alert('You have 3 tries to reach the number 18! Good luck!');
                } else if (this.getAttribute('data-type') === 'hard') {
                    alert('You have 3 tries to reach the number 24! Good luck!');
                }
            }
        });
    }
}