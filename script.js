const choices = ['grass', 'fire', 'water'];
const emojiChoices = ['🌿', '🔥', '🌊'];
const funnyWords = ['calculating...', 'loading...', 'ejamicating...'];
const styles = `background-color: blue; font-size: 16px; padding:5px;`;

function printInStyle(message, style) {
  console.log(`%c${message}`, style);
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
}

let welcome = 'Welcome to';

for (const choice of choices) {
  welcome +=
    ' ' + capitalize(choice) + ' ' + emojiChoices[choices.indexOf(choice)];
}

const greetingMessages = [
  welcome,
  `Use "play('choice')" to play, for example: "play('${choices[0]}')"`,
  `You can also just enter the word in lower case: ${choices.join(', ')}`,
  `Or even just the first letter: ${choices
    .map((choice) => choice[0])
    .join(', ')}`,
  `Type "score" to see the current score, and "reset" to start from scratch`,
];

function greeting(messages, style) {
  for (const message of messages) {
    printInStyle(message, style);
  }
}

function game() {
  window.rps = {
    playerSelection: '',
    computerSelection: '',
    scoreBoard: {
      player: 0,
      computer: 0,
    },
  };

  greeting(greetingMessages, styles);
}

function getRandomIntRange(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function getComputerChoice() {
  return choices[getRandomIntRange(choices.length)];
}

function getFunnyWord() {
  return funnyWords[getRandomIntRange(funnyWords.length)];
}

function getEmojiChoice(choice) {
  let emoji = emojiChoices[choices.indexOf(choice)];
  return emoji;
}

function play(choice) {
  window.rps.playerSelection = choice.toLowerCase();
  console.log('You play ' + getEmojiChoice(window.rps.playerSelection));
  window.rps.computerSelection = getComputerChoice();
  console.log(getFunnyWord());
  setTimeout(() => {
    console.log(
      'Computer plays ' + getEmojiChoice(window.rps.computerSelection)
    );
  }, '1000');
  setTimeout(() => {
    declareWinner(window.rps);
  }, '1000');
}

for (const choice of choices) {
  Object.defineProperty(window, choice, {
    get: function () {
      play(choice);
    },
  });
  Object.defineProperty(window, choice[0], {
    get: function () {
      play(choice);
    },
  });
}

for (const emoji of emojiChoices) {
  Object.defineProperty(window, emoji, {
    get: function () {
      play(choices[emojiChoices.indexOf(emoji)]);
    },
  });
}

function addPoint(scoreBoard, user) {
  scoreBoard[user] += 1;
}

function displayScore(scoreBoard) {
  console.log(
    `Current score:\nPlayer: ${scoreBoard.player}\nComputer: ${scoreBoard.computer}`
  );
}

function award(winner) {
  addPoint(window.rps.scoreBoard, winner);
  console.log(capitalize(winner) + ' Wins!');
}

function declareWinner(players) {
  const { playerSelection, computerSelection } = players;
  if (playerSelection === computerSelection) {
    console.log("It's a tie!");
  } else if (playerSelection === 'grass') {
    if (computerSelection === 'fire') award('computer');
    if (computerSelection === 'water') award('player');
  } else if (playerSelection === 'fire') {
    if (computerSelection === 'grass') award('player');
    if (computerSelection === 'water') award('computer');
  } else if (playerSelection === 'water') {
    if (computerSelection === 'grass') award('computer');
    if (computerSelection === 'fire') award('player');
  }
  displayScore(window.rps.scoreBoard);
  console.log('You can play again. Or type "reset" to start from scratch');
}

function resetGame() {
  game();
}

Object.defineProperty(window, 'reset', {
  get: function () {
    console.clear();
    resetGame();
  },
});

Object.defineProperty(window, 'score', {
  get: function () {
    displayScore(window.rps.scoreBoard);
  },
});

game();
