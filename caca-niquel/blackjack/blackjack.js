const startButton = document.getElementById('start-button');
const hitButton = document.getElementById('hit-button');
const standButton = document.getElementById('stand-button');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const playerScoreSpan = document.getElementById('player-score');
const dealerScoreSpan = document.getElementById('dealer-score');
const gameMessage = document.getElementById('game-message');

let playerHand = [];
let dealerHand = [];
let deck = [];
let gameInProgress = false;

const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Função para criar o baralho
function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
}

// Função para embaralhar o baralho
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Função para calcular o valor das mãos
function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  hand.forEach(card => {
    if (['J', 'Q', 'K'].includes(card.value)) {
      score += 10;
    } else if (card.value === 'A') {
      aceCount++;
      score += 11;
    } else {
      score += parseInt(card.value);
    }
  });
  while (score > 21 && aceCount) {
    score -= 10;
    aceCount--;
  }
  return score;
}

// Função para exibir as cartas
function displayCards() {
  playerCardsDiv.innerHTML = playerHand.map(card => `${card.value}${card.suit}`).join(' ');
  dealerCardsDiv.innerHTML = dealerHand.map(card => `${card.value}${card.suit}`).join(' ');
  playerScoreSpan.textContent = calculateScore(playerHand);
  dealerScoreSpan.textContent = calculateScore(dealerHand);
}

// Função para iniciar o jogo
function startGame() {
  createDeck();
  shuffleDeck();
  playerHand = [deck.pop(), deck.pop()];
  dealerHand = [deck.pop(), deck.pop()];
  gameInProgress = true;
  hitButton.disabled = false;
  standButton.disabled = false;
  startButton.disabled = true;
  gameMessage.textContent = '';
  displayCards();
}

// Função para "comprar" carta
function hit() {
  if (!gameInProgress) return;
  playerHand.push(deck.pop());
  displayCards();
  if (calculateScore(playerHand) > 21) {
    gameMessage.textContent = 'Você perdeu! Estourou o limite de 21.';
    endGame();
  }
}

// Função para "parar"
function stand() {
  if (!gameInProgress) return;
  while (calculateScore(dealerHand) < 17) {
    dealerHand.push(deck.pop());
    displayCards();
  }
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  if (dealerScore > 21 || playerScore > dealerScore) {
    gameMessage.textContent = 'Você venceu!';
  } else if (playerScore === dealerScore) {
    gameMessage.textContent = 'Empate!';
  } else {
    gameMessage.textContent = 'O Dealer venceu!';
  }
  endGame();
}

// Função para finalizar o jogo
function endGame() {
  gameInProgress = false;
  hitButton.disabled = true;
  standButton.disabled = true;
  startButton.disabled = false;
}

// Adicionando os event listeners
startButton.addEventListener('click', startGame);
hitButton.addEventListener('click', hit);
standButton.addEventListener('click', stand);
