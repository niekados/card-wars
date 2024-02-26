// DOM elements used to display various game information and actions
let movesCounter = document.getElementById('moves-counter'); // Keeps track of the number of moves made
let displayComputerCard = document.getElementById('computer-card-front'); // Displays the computer's card
let displayPlayerCard = document.getElementById('player-card-front'); // Displays the player's card
let displayMoveInfo = document.getElementById('move-info'); // Displays information about the current move
let computerCardBack = document.getElementById('computer-card-back'); // Gets the back of the computer's card
let playerCardBack = document.getElementById('player-card-back'); // Gets the back of the player's card
let playButton = document.getElementById('play-button'); // Button used to play a move

// Game variables used to store game state and data
let deckSize = 'small'; // Represents the size of the deck (small or large)
let playerDeck; // Player's deck of cards
let computerDeck; // Computer's deck of cards
let warDeck = []; // Deck of cards used in a War

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
 * Calls a popup window with game rules using SweetAlert2
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
    let blackCards = [
        ["spades", randomizeDeck()],
        ["clubs", randomizeDeck()]
    ];
    let redCards = [
        ["hearts", randomizeDeck()],
        ["diamonds", randomizeDeck()]
    ];
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
 * Randomizes the cards in the deck assigned to either red or black suits.
 * @param {Array} player The player's deck of cards containing suits and values.
 * @returns {Array} A new deck of cards with shuffled suits and values.
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

/**
 * Initiates card moves for both the computer and player.
 */
function playGame() {
    // Get the next card from the player's deck
    let playerMove = playerDeck.shift();

    // Display the player's card and update the card back count
    displayPlayerCard.innerHTML = displayCards(playerMove);
    playerCardBack.textContent = playerDeck.length;

    // Toggle the color of the player's card based on the suit
    displayPlayerCard.classList.toggle('red', playerMove[0] === 'hearts' || playerMove[0] === 'diamonds');

    // Get the next card from the computer's deck
    let computerMove = computerDeck.shift();

    // Display the computer's card and update the card back count
    displayComputerCard.textContent = displayCards(computerMove);
    computerCardBack.textContent = computerDeck.length;

    // Toggle the color of the computer's card based on the suit
    displayComputerCard.classList.toggle('red', computerMove[0] === 'hearts' || computerMove[0] === 'diamonds');

    // Increment the moves counter
    movesCounter.textContent = parseInt(movesCounter.textContent) + 1;

    // Compare the cards and resolve the round
    compareCards(playerMove, computerMove);

    hiddeAllCards();
    hideEmptyDeck();
}

/**
 * Compares the cards of the player and computer to determine the outcome of a battle or war.
 * @param {Array} playerMove The card the player played.
 * @param {Array} computerMove The card the computer played.
 */
function compareCards(playerMove, computerMove) {
    // Check if there's already a winner
    checkWinner();
  
    // If there's no cards in the war deck
    if (warDeck.length === 0) {
      // If the player's card is higher
      if (playerMove[1] > computerMove[1]) {
        // Player wins the battle, add the cards to the player's deck
        playerDeck.push(playerMove, computerMove);
        displayMoveInfo.textContent = 'Player wins Battle';
        return;
      }
      // If the computer's card is higher
      else if (playerMove[1] < computerMove[1]) {
        // Computer wins the battle, add the cards to the computer's deck
        computerDeck.push(playerMove, computerMove);
        displayMoveInfo.textContent = 'Computer wins Battle';
        return;
      }
      // If there's a tie
      else {
        // Put both cards in the war deck
        warDeck.push(playerMove);
        warDeck.push(computerMove);
        displayMoveInfo.textContent = 'Card War!';
        return;
      }
    }
    // If there are cards in the war deck
    else {
      // If the player's card is higher
      if (playerMove[1] > computerMove[1]) {
        // Player wins the war, add all cards in the war deck to the player's deck
        playerDeck.push(playerMove, computerMove);
        playerDeck = playerDeck.concat(warDeck);
        warDeck = [];
        displayMoveInfo.textContent = 'Player wins War';
        return;
      }
      // If the computer's card is higher
      else if (playerMove[1] < computerMove[1]) {
        // Computer wins the war, add all cards in the war deck to the computer's deck
        computerDeck.push(playerMove, computerMove);
        computerDeck = computerDeck.concat(warDeck);
        warDeck = [];
        displayMoveInfo.textContent = 'Computer wins War';
        return;
      }
      // If there's a tie again
      else {
        // Put both cards in the war deck
        warDeck.push(playerMove);
        warDeck.push(computerMove);
        displayMoveInfo.textContent = 'Another War!';
        return;
      }
    }
  }