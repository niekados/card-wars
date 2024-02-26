

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