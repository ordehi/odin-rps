/* to make game modular, the choices must be in descending order, i.e.: higher choices beat lower choices but the first choice beats the last choice */
/* 0 > 1 > 2
last index beats first index */
const starters = document.getElementById('starters');
const options = document.getElementById('options');
const playerNameInput = document.getElementById('playerName');
const setName = document.getElementById('setName');
const resetBtn = document.getElementById('reset');
const result = document.getElementById('result');
const grass = document.getElementById('grass');
const fire = document.getElementById('fire');
const water = document.getElementById('water');
const grassAudio = new Audio('./assets/audio/grass.mp3');
const fireAudio = new Audio('./assets/audio/fire.mp3');
const waterAudio = new Audio('./assets/audio/water.mp3');
const sounds = {
  grass: grassAudio,
  fire: fireAudio,
  water: waterAudio,
};
for (cry in sounds) {
  sounds[cry].volume = 0.2;
}

const choices = ['grass', 'fire', 'water'];
const emojiChoices = ['🌿', '🔥', '🌊'];
const funnyWords = ['calculating...', 'loading...', 'ejamicating...'];
const styles = `background-color: blue; font-size: 16px; padding:5px;`;

function getWinner(playerSelection, computerSelection) {
  let playerIdx = choices.indexOf(playerSelection);
  let comIdx = choices.indexOf(computerSelection);
  if (playerIdx === comIdx) return 'tie';

  let winnerIdx = [playerIdx, comIdx].includes(1)
    ? Math.max(playerIdx, comIdx)
    : Math.min(playerIdx, comIdx);
  let winnerUser = playerIdx === winnerIdx ? 'player' : 'computer';

  return winnerUser;
}

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

function namePlayer(string) {
  window.rps.player = string;
}

function game(player) {
  window.rps = {
    selection: {
      player: '',
      computer: '',
    },
    scoreBoard: {
      player: 0,
      computer: 0,
    },
    player: player,
    computer: 'computer',
  };

  result.innerHTML = `<div>Result here</div>`;
  greeting(greetingMessages, styles);
  printInStyle(`Enter your name with "name('your name')"`, styles);
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

function injectToResult(string) {
  result.innerHTML += `<div>${string}</div>`;
}

function buildMsg(who, what) {
  return `${who} plays ${what}`;
}

function playRound(choice, gameObj) {
  result.innerHTML = '';
  gameObj.selection.player = choice.toLowerCase();
  let message = buildMsg(
    gameObj.player,
    getEmojiChoice(gameObj.selection.player)
  );
  console.log(message);
  injectToResult(message);

  gameObj.selection.computer = getComputerChoice();

  console.log(getFunnyWord());

  setTimeout(() => {
    message = buildMsg('Computer', getEmojiChoice(gameObj.selection.computer));
    console.log(message);
    injectToResult(message);
  }, '1000');

  setTimeout(() => {
    declareWinner(gameObj);
  }, '1000');
}

for (const choice of choices) {
  Object.defineProperty(window, choice, {
    get: function () {
      playRound(choice, window.rps);
    },
  });
  Object.defineProperty(window, choice[0], {
    get: function () {
      playRound(choice, window.rps);
    },
  });
}

for (const emoji of emojiChoices) {
  Object.defineProperty(window, emoji, {
    get: function () {
      playRound(choices[emojiChoices.indexOf(emoji)], window.rps);
    },
  });
}

function addPoint(scoreBoard, user) {
  scoreBoard[user] += 1;
}

function displayScore(scoreBoard) {
  console.log(
    `Current score:\n${window.rps.player}: ${scoreBoard.player}\nComputer: ${scoreBoard.computer}`
  );
}

function award(winner) {
  addPoint(window.rps.scoreBoard, winner);
}

function declareWinner(gameObj) {
  const { player, computer } = gameObj.selection;
  let winner = getWinner(player, computer);
  let message;
  if (winner === 'tie') {
    message = "It's a Tie!";
  } else {
    award(winner);
    message =
      capitalize(gameObj[winner]) +
      ' Wins with ' +
      emojiChoices[choices.indexOf(gameObj.selection[winner])];
  }

  printInStyle(message, styles);
  injectToResult(message);
  displayScore(window.rps.scoreBoard);
  console.log('You can play again. Or type "reset" to start from scratch');
}

function resetGame() {
  game(window.rps.player);
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

game('Player');

starters.addEventListener('click', (e) => {
  if (choices.includes(e.target.id)) {
    let choice = e.target.id;
    playRound(choice, window.rps);
    sounds[choice].play();
  }
});

setName.addEventListener('click', (e) => {
  if (playerNameInput.value) {
    namePlayer(playerNameInput.value);
  }
});

resetBtn.addEventListener('click', () => resetGame());
