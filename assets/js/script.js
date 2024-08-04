
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById('start-button')
    startButton.addEventListener("click", function () {
        letsPlay();
    })
})

function letsPlay() {
    let gameArea = document.getElementsByTagName('main')[0]
    gameArea.innerHTML = `<section class="game-area">

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

        <div class="versus-computer">

            <p>Do you think you can beat the computer?</p>
            <button><span>Play versus the computer</span></button>

        </div>

        <div class="score-area">
            <p>Your tries: <span></span></p>
            <p>Your score:<span></span></p>
        </div>
    </section>`

}

