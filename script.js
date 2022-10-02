console.log(
  `Welcome to Grass Fire Water.\n\nUse "play('choice')" to play, for example: "play('grass')"\n\nYou can also just enter one of the words in lower case: grass, fire, or water\n\nOr even just the first letter: g, f, w`
);

const choices = ['grass', 'fire', 'water'];
const emojiChoices = ['🌿', '🔥', '🌊'];

const funnyWords = ['calculating...', 'loading...', 'ejamicating...'];

function getRandomIntRange(upperLimit) {
  return Math.floor(Math.random() * upperLimit);
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substring(1);
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

window.rps = {
  playerSelection: '',
  computerSelection: '',
};

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

function award(winner) {
  let winnerMsg;
  if (winner === 'player') winnerMsg = 'You Win!';
  if (winner === 'computer') winnerMsg = 'Computer Wins!';
  console.log(winnerMsg);
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
}
