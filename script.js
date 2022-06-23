'use strict';

function checkClicked() {
  myGuess = Number(input.value);
  if (!myGuess) {
    displayMessage.textContent = 'Put in a guess Number';
  } else if (startScore == 0) {
    displayMessage.textContent = 'You lost the game :(';
  } else if (myGuess > target) {
    displayMessage.textContent = 'Too high!';
    startScore--;
    score.textContent = startScore;
  } else if (myGuess < target) {
    displayMessage.textContent = 'Too low!';
    startScore--;
    score.textContent = startScore;
  } else {
    displayMessage.textContent = 'Congradulations! 💐';
    targetDisplay.textContent = target;
    if (startScore >= highScore.textContent) {
      highScore.textContent = startScore;
    }
    document.querySelector('body').style.backgroundColor = 'green';
    document.querySelector('.number').style.width = '30rem';
  }
}

function reset() {
  input.value = ' ';
  startScore = 20;
  score.textContent = startScore;
  target = Math.trunc(Math.random() * 20) + 1;
  targetDisplay.textContent = '?';
  displayMessage.textContent = 'Start Guessing ..';
  document.querySelector('body').style.backgroundColor = 'black';
  document.querySelector('.number').style.width = '15rem';
}

let startScore = 20;
let myGuess;
let target = Math.trunc(Math.random() * 20) + 1;
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');
let displayMessage = document.querySelector('.message');
let targetDisplay = document.querySelector('.number');
let input = document.querySelector('.guess');
let button = document.querySelector('.check');
let button2 = document.querySelector('.again');
button.addEventListener('click', checkClicked);
button2.addEventListener('click', reset);
