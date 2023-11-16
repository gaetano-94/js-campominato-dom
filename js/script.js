'use strict';

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

function campoMinato() {
  const table = document.querySelector('.table');
  let level = 3;
  const cellNumber = setCellNumber(level);
  createTable(table, cellNumber);
}

/*
VARIABILI GAME
*/

const generaGriglia = document.getElementById('generaGriglia');
generaGriglia.addEventListener('click', campoMinato);
