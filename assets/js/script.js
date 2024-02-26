// List of DOM elements
let movesCounter = document.getElementById('moves-counter');
let displayComputerCard = document.getElementById('computer-card-front');
let displayPlayerCard = document.getElementById('player-card-front');
let displayMoveInfo = document.getElementById('move-info');
let computerCardBack = document.getElementById('computer-card-back');
let playerCardBack = document.getElementById('player-card-back');
let playButton = document.getElementById('play-button');

// Variables
let deckSize = 'small';
let playerDeck;
let computerDeck;
let warDeck = [];

// Get all buttons and add eventlisteners
const buttons = document.querySelectorAll('button')

buttons.forEach(button => button.addEventListener('click', (event) => {
    let buttonType = button.getAttribute('data-type');

    // Removes "focus" from all buttons
    button.blur()

    if (buttonType === 'reset') {
        resetGame()
        startGame()
    }
    if (buttonType === 'small-deck') {
        button.setAttribute('data-type', 'large-deck');
        button.innerHTML = '<i class="fa-solid fa-layer-group"></i> Large';
        deckSize = 'full';
        resetGame()
        startGame()
    }
    if (buttonType === 'large-deck') {
        button.setAttribute('data-type', 'small-deck');
        button.innerHTML = '<i class="fa-solid fa-layer-group"></i> Small';
        deckSize = 'small';
        resetGame()
        startGame()
    }
    if (buttonType === "info") {
        gameRules()
    }
    if (buttonType === 'play') {
        playGame()
    }
}))