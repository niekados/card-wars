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

    // Reset button
    if (buttonType === 'reset') {
        resetGame()
        startGame()
    }

    // Deck Size button (small)
    if (buttonType === 'small-deck') {
        button.setAttribute('data-type', 'large-deck');
        button.innerHTML = '<i class="fa-solid fa-layer-group"></i> Large';
        deckSize = 'full';
        resetGame()
        startGame()
    }

    // Deck Size button (large)
    if (buttonType === 'large-deck') {
        button.setAttribute('data-type', 'small-deck');
        button.innerHTML = '<i class="fa-solid fa-layer-group"></i> Small';
        deckSize = 'small';
        resetGame()
        startGame()
    }

    // Game rules button
    if (buttonType === "info") {
        gameRules()
    }

    // Play button
    if (buttonType === 'play') {
        playGame()
    }
}))

// Add event listeners to play game with "spacebar" or "enter" keys
document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!playButton.classList.contains('hidden')) {
        playGame();
      }
    }
  })