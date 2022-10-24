'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Currect Number';
console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 20;
document.querySelector('.score').textContent = 2;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.ceil(Math.random() * 20);
let score = 20;
let displayMessage = document.querySelector('.message');
// const displayMessage = function (message) {
//   document.querySelector('.message').textContent = message;
// };

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //when there is no input
  if (!guess) {
    displayMessage.textContent = 'No number!';
    //when player wins
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage.textContent = 'Currect Number!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (Number(document.querySelector('.highscore').textContent) < score) {
      document.querySelector('.highscore').textContent = score;
    }
    //when score is 0
  } else if (score <= 0) {
    displayMessage.textContent = 'You lost the game';
    return;
    //when guess is too high
  } else if (guess !== secretNumber) {
    displayMessage.textContent =
      guess > secretNumber ? 'Too high!' : 'Too low!';
    score--;
    document.querySelector('.score').textContent = score;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.ceil(Math.random() * 20);
  displayMessage.textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
