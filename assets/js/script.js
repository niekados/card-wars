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
document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
        if (!playButton.classList.contains('hidden')) {
            playGame();
        }
    }
})

/**
 * Calls a popup window with game rules
 */
function gameRules() {
    swal.fire({
        iconHtml: '<i class="fa-regular fa-circle-question"></i>',
        html: `
    <div>
    <p><strong>Setup:</strong> Each player is randomly assigned a deck of either red or black cards.</p>
    <p><strong>Gameplay:</strong> Players simultaneously reveal the top card of their deck. Each round is called a 'battle'.</p>
    <p><strong>Battle:</strong> The player with the higher card value wins the battle.</p>
    <p><strong>War:</strong></p>
    <ul>
    <li>If both players reveal cards of equal value, a 'war' occurs.</li>
    <li>Players place a new card face-up.</li>
    <li>The player with the higher face-up card wins the war, collecting all cards on the table and adding them to the bottom of their deck.</li>
    </ul>
    <p><strong>Repeat:</strong> If the face-up cards are equal again, repeat the war process.</p>
    <p><strong>End:</strong> The game ends when one player runs out of cards. The player with all the cards wins.</p>
    </div>`,
        showCloseButton: true,
        allowEnterKey: true,
        allowEscapeKey: true,
        customClass: {
            popup: 'swal-popup',
            closeButton: 'swal-button',
            icon: 'swal-icon',
            confirmButton: 'swal-button',
        }
    })
}