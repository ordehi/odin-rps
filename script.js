console.log('Welcome to Rock Paper Scissors');

const choices = ['Rock', 'Paper', 'Scissors'];

function getRandomIntRange(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function getComputerChoice() {
  return choices[getRandomIntRange(choices.length)];
}
