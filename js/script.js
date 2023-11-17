'use strict';

/*
UTILITY
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
FUNZIONI
*/
function myCreateElement(tag, className, content) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.append(content);

  return element;
}

function setCellNumber(level) {
  let cellNumber;
  switch (level) {
    case 2:
      cellNumber = 81;
      break;

    case 3:
      cellNumber = 49;
      break;

    case 1:
    default:
      cellNumber = 100;
      break;
  }

  return cellNumber;
}

function createTable(mainElement, cellNumber) {
  const cells = Math.sqrt(cellNumber);

  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= cellNumber; i++) {
    const myElement = myCreateElement('div', 'cell', i);
    myElement.style.width = `calc(100% / ${cells})`;
    myElement.style.height = myElement.style.width;
    fragment.append(myElement);
  }
  mainElement.append(fragment);
}

/*
generateBombs: genera le bombe del gioco
*/
function generateBombs(num, numLimit) {
  const bombs = [];
  while (bombs.length < num) {
    const currentNumber = getRndInteger(1, numLimit);

    if (!bombs.includes(currentNumber)) {
      bombs.push(currentNumber);
    }
  }

  return bombs;
}

/*
generateBombs: genera le bombe del gioco
*/

function gameLogic(board, cellNumber) {
  const score = [];
  let play = true;
  const bombNumber = 16;
  const bombs = generateBombs(bombNumber, cellNumber);
  const message = document.querySelector('.game-status');
  board.addEventListener('click', function (event) {
    if (!event.target.classList.contains('cell')) return;
    if (!play) return;

    const currentElement = event.target;
    const cellValue = parseInt(currentElement.innerHTML);

    if (bombs.includes(cellValue)) {
      //ho calpestato una bomba

      currentElement.style.backgroundColor = 'red';

      play = false;
    } else {
      currentElement.style.backgroundColor = 'blue';

      if (!score.includes(cellValue)) {
        score.push(cellValue);
      }

      if (score.length === cellNumber - bombs.length) {
        message.innerHTML = `Hai vinto: ${score.length}`;
      }
    }
  });
}

function campoMinato() {
  resetGameFn();
  const table = document.querySelector('.table');
  const level = parseInt(document.getElementById('select-level').value);
  const cellNumber = setCellNumber(level);

  createTable(table, cellNumber);
  gameLogic(table, cellNumber);
}

function resetGameFn() {
  const board = document.querySelector('.table');
  board.innerHTML = '';
}

/*
VARIABILI GAME
*/

const startGame = document.getElementById('game-start');
const resetGame = document.getElementById('game-reset');

startGame.addEventListener('click', campoMinato);
resetGame.addEventListener('click', resetGameFn);
