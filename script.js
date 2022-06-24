'use strict';
let gameEnd = false;
let currentPlayer = 1;
let player1 = 0;
let player2 = 0;
let player1Total = 0;
let player2Total = 0;
let dice = 1;
let current1 = document.querySelector('#current--0');
let current2 = document.querySelector('#current--1');
let total1 = document.querySelector('#score--0');
let total2 = document.querySelector('#score--1');
let newGame = document.querySelector('.btn--new');
let rollDice = document.querySelector('.btn--roll');
let Hold = document.querySelector('.btn--hold');
let diceIma = document.querySelector('.dice');

function hold() {
  if (gameEnd) {
    return;
  }
  currentPlayer === 1
    ? (total1.textContent = player1Total += player1)
    : (total2.textContent = player2Total += player2);

  if (player1Total >= 100) {
    gameEnd = true;
    diceIma.classList.add('hidden');
    document.querySelector('.player--0').classList.add('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
  } else if (player2Total >= 100) {
    gameEnd = true;
    diceIma.classList.add('hidden');
    document.querySelector('.player--1').classList.add('player--winner');
    document.querySelector('.player--1').classList.remove('player--active');
  }

  currentPlayer === 1
    ? document.querySelector('.player--0').classList.remove('player--active')
    : document.querySelector('.player--1').classList.remove('player--active');

  currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1);

  currentPlayer === 1
    ? document.querySelector('.player--0').classList.add('player--active')
    : document.querySelector('.player--1').classList.add('player--active');

  current1.textContent = current2.textContent = 0;
  player1 = player2 = 0;
  console.log('holding');
}

function roll(player) {
  if (gameEnd) {
    return;
  }
  dice = Math.trunc(Math.random() * 6) + 1;
  diceIma.src = `dice-${dice}.png`;
  if (dice === 1) {
    player === 1
      ? (current1.textContent = player1 = 0)
      : (current2.textContent = player2 = 0);
    hold();
  } else {
    player === 1
      ? (current1.textContent = player1 += dice)
      : (current2.textContent = player2 += dice);
  }
}

rollDice.addEventListener('click', function () {
  roll(currentPlayer);
});
Hold.addEventListener('click', hold);
newGame.addEventListener('click', function () {
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  currentPlayer = 1;
  gameEnd = false;
  dice = Math.trunc(Math.random() * 6) + 1;
  diceIma.src = `dice-${dice}.png`;
  current1.textContent = player1 = 0;
  current2.textContent = player2 = 0;
  total1.textContent = player1Total = 0;
  total2.textContent = player2Total = 0;
});
