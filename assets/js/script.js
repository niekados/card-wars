// List of DOM elements
let movesCounter = document.getElementById('moves-counter');
let displayComputerCard = document.getElementById('computer-card-front');
let displayPlayerCard = document.getElementById('player-card-front');
let displayMoveInfo = document.getElementById('move-info');
let computerCardBack = document.getElementById('computer-card-back');
let playerCardBack = document.getElementById('player-card-back');
let playButton = document.getElementById('play-button');

// Game variables
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

/**
 * Randomizes the suits of a deck of cards based on the specified deck size. 
 * This function randomizes each suit separately.
 */
function randomizeDeck() {
    const deck = new Set();

    // Randomize small deck (values between 10 and 14)
    if (deckSize == "small") {
        while (deck.size < 5) {
            const randomValue = Math.floor(Math.random() * 5) + 10;
            deck.add(randomValue);
        }
    }

    // Randomize large deck (values between 2 and 14)
    if (deckSize == 'full') {
        while (deck.size < 13) {
            const randomValue = Math.floor(Math.random() * 13) + 2;
            deck.add(randomValue);
        }
    }
    return Array.from(deck);
}

/**
 * Assigns the suits Spades & Clubs to black cards, and Hearts & Diamonds to red cards. 
 * Randomly assigns colors to the player and computer.
 */
function assignCardColours() {
    let blackCards = [["spades", randomizeDeck()], ["clubs", randomizeDeck()]];
    let redCards = [["hearts", randomizeDeck()], ["diamonds", randomizeDeck()]];
    let i = Math.floor(Math.random() * 2);
    if (i) {
      playerDeck = blackCards;
      computerDeck = redCards;
    } else {
      playerDeck = redCards;
      computerDeck = blackCards;
    }
  }

/** 
 * Randomizes the cards in deck assigned to red or black suits.
*/
function assignCards(player) {
    let cardDeck = []
  
    while (player[0][1].length > 0 || player[1][1].length > 0) {
      let i = Math.floor(Math.random() * 2);
      if (player[i][1].length > 0) {
        let card = player[i][1].pop();
        cardDeck.push([player[i][0], card]);
      }
    }
    return cardDeck
  }

/**
 * Starts the game by assigning card decks to the computer and player.
 */
function startGame() {
    assignCardColours();
    playerDeck = assignCards(playerDeck);
    computerDeck = assignCards(computerDeck);  
  }

/**
 * Resets the game by clearing all card decks and restarting the game state.
 */
  function resetGame() {
    playerDeck = null;
    computerDeck = null;
    warDeck = [];
    displayComputerCard.textContent = '';
    displayPlayerCard.textContent = '';
    displayMoveInfo.textContent = '';
    computerCardBack.textContent = '';
    playerCardBack.textContent = '';
    playButton.classList.remove('hidden');
    displayPlayerCard.classList.remove('hidden');
    displayComputerCard.classList.remove('hidden');
    movesCounter.textContent = 0;
    hiddeAllCards()
  }