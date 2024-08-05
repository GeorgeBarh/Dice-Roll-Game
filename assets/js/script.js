
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    letsPlay();

})

function letsPlay() {
    let startButton = document.getElementById('start-button')
    startButton.addEventListener("click", function () {
        hideContent();
        let gameArea = document.getElementsByClassName('game-area')[0]
        gameArea.innerHTML = `

    <div class="game-questions">

        <div class="game-selection">

            <p>Choose a game:</p>

            <button><span>One Die</span></button>

            <button><span>Two Dice</span></button>

        </div>

        <div class="choose-difficulty">

            <p>Choose difficulty level: </p>
            <button>Easy</button>
            <button>Medium</button>
            <button>Hard</button>

        </div>
        
    </div>

        <div class="game">
        </div>




        `

    })
}

function hideContent() {
    let startButton = document.getElementById('start-button')
    startButton.style.display = "none";
    let gameDescription = document.getElementById('game-description')
    gameDescription.style.display = "none";
}

