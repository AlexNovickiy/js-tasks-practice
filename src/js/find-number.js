import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import victorySound from '../public/audio/Victory.mp3';
import wrongAnswer from '../public/audio/Wrong-answer.mp3';

const victoryAudio = new Audio(victorySound);
const wrongAnswerAudio = new Audio(wrongAnswer);

const listNumberItems = document.querySelector('.list-items-numbers');
const listSelectorScale = document.querySelector('.select-scale-list');
const btnGenerateField = document.querySelector('.btn-submit-scale');
const dynamicTimeField = document.querySelector('.dynamic-time');
const btnStartGame = document.querySelector('.btn-start-game');

let numbersArray;
let timeText;
let timerInterval;

btnGenerateField.addEventListener('click', generateFieldsNumbers);
btnStartGame.addEventListener('click', startGame);

function startGame(e) {
  listNumberItems.addEventListener('click', handleNumberClick);
  e.currentTarget.classList.add('disabled');
  const startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    timeText = `${seconds} ${getSecondsText(seconds)}`;
    dynamicTimeField.textContent = timeText;

    if (numbersArray.length === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function handleNumberClick(e) {
  const clickedNumber = e.target.textContent;
  const clickedElement = e.target;

  if (clickedElement.classList.contains('item-number')) {
    if (clickedNumber == numbersArray[0]) {
      clickedElement.classList.add('correct-answer');
      numbersArray.shift();
      if (numbersArray.length === 0) {
        victoryAudio.play();
        listNumberItems.removeEventListener('click', handleNumberClick);
        const instance = basicLightbox.create(
          `<div class="modal">
            <h2 class="modal-title">You win!</h2>
            <p class="modal-text">Congratulations! You found all the numbers!</p>
            <p class="modal-text">Your time: ${timeText}</p>
            <button class="btn-close-modal">Close</button>
          </div>`,
          {
            onShow: instance => {
              const closeButton = instance
                .element()
                .querySelector('.btn-close-modal');
              closeButton.addEventListener('click', () => {
                instance.close();
                e.target.classList.remove('disabled');
                generateFieldsNumbers();
              });
            },
            onClose: instance => {
              e.target.classList.remove('disabled');
            },
          }
        );
        instance.show();
      }
    } else {
      wrongAnswerAudio.play();
      clickedElement.classList.add('wrong-answer');
    }

    if (clickedElement.classList.contains('wrong-answer')) {
      setTimeout(() => {
        clickedElement.classList.remove('wrong-answer');
      }, 500);
    }
  }
}

function generateSelectorScale() {
  const scales = ['2x2', '4x4', '6x6', '8x8', '10x10'];

  const scalesMarkup = scales
    .map((scale, index) => {
      return `<option value="${
        (index + 1) * 2
      }" class="option-scale-field">${scale}</option>`;
    })
    .join('');

  listSelectorScale.innerHTML = scalesMarkup;
}

function generateFieldsNumbers() {
  dynamicTimeField.textContent = '';
  clearInterval(timerInterval);
  btnStartGame.classList.remove('disabled');
  listNumberItems.removeEventListener('click', handleNumberClick);
  const scaleValues = listSelectorScale.querySelectorAll('.option-scale-field');

  scaleValues.forEach(scaleValue => {
    if (scaleValue.selected) {
      const typeScale = parseInt(scaleValue.value, 10);
      generateMarkupNumbers(typeScale);
    }
  });
}

function generateMarkupNumbers(typeScale) {
  const totalCells = typeScale * typeScale;
  numbersArray = Array.from({ length: totalCells }, (_, i) => i + 1);

  const shuffledNumbersArray = shuffleArray([...numbersArray]);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalCells; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('item-number');
    listItem.textContent = shuffledNumbersArray[i];
    listItem.style.backgroundColor = getRandomPastelColor();
    listItem.style.fontSize = `${Math.floor(Math.random() * 20) + 20}px`;
    fragment.appendChild(listItem);
  }

  listNumberItems.innerHTML = '';
  listNumberItems.appendChild(fragment);

  listNumberItems.style.gridTemplateColumns = `repeat(${typeScale}, minmax(50px, 1fr))`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 60;
  const lightness = Math.floor(Math.random() * 10) + 80;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getSecondsText(seconds) {
  const lastDigit = seconds % 10;
  const lastTwoDigits = seconds % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'секунд';
  }

  if (lastDigit === 1) {
    return 'секунда';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'секунди';
  }

  return 'секунд';
}

generateSelectorScale();
generateFieldsNumbers();
