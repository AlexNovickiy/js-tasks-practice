import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const listMixWord = document.querySelector('.list-mixed-word');
const inputSearchWord = document.querySelector('.input-search-word');
const btnChangeWord = document.querySelector('.btn-change-word');
const btnCheckWord = document.querySelector('.btn-check-word');

const words = [
  "комп'ютер",
  'телефон',
  'інтернет',
  'музика',
  'навушники',
  'програма',
  'екран',
  'пароль',
  'робот',
  'клавіатура',
  'мишак',
  'браузер',
  'сервер',
  'код',
  'сайт',
  'електроніка',
  'пам’ять',
  'іграшка',
  'батарея',
  'дисплей',
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let currentWord = words[Math.floor(Math.random() * words.length)]
  .toUpperCase()
  .split('');

let mixedWord = shuffleArray([...currentWord]);

function renderFunction() {
  const templWordLetters = mixedWord
    .map(letter => `<li class="item-letter-word">${letter}</li>`)
    .join('');

  listMixWord.innerHTML = templWordLetters;
}

renderFunction();

function changeWord() {
  currentWord = words[Math.floor(Math.random() * words.length)]
    .toUpperCase()
    .split(''); // Генерируем новое слово
  mixedWord = shuffleArray([...currentWord]); // Перемешиваем новое слово
  renderFunction(); // Обновляем отображение
}

function checkWord(word) {
  const arrayForCompare = [];

  const inputValue = inputSearchWord.value
    .replace(/\s+/g, '')
    .toUpperCase()
    .split('');

  // Проверяем, существует ли inputWord и его значение
  if (!inputSearchWord || inputValue.length === 0) {
    console.log('Виникла помилка: поле ввода пустое або не знайдено');
    iziToast.error({
      title: '',
      message: `Please , fill the input`,
      backgroundColor: '#ef4040',
      timeout: 4000,
      class: 'message-warning',
      position: 'topCenter',
      titleColor: 'white',
      messageColor: 'white',
    });
    return;
  }

  // Проверяем, что слово не пустое
  if (word.length <= 0) {
    console.log('Виникла помилка: слово для перевірки порожнє');
    return;
  }

  word.forEach((letter, i) => {
    if (letter === inputValue[i]) {
      arrayForCompare.push(letter);
    }
  });

  const arraysAreEqual =
    arrayForCompare.length === word.length &&
    arrayForCompare.every((letter, i) => letter === word[i]);

  console.log(arraysAreEqual);

  if (arraysAreEqual) {
    iziToast.success({
      title: 'Success',
      message: 'You guessed the word',
      backgroundColor: '#ef4040',
      timeout: null,
      class: 'message-warning',
      position: 'topCenter',
      titleColor: 'white',
      messageColor: 'white',
      iconColor: 'white',
    });
  } else {
    iziToast.info({
      title: 'Wrong',
      message: `You didn't guess the word`,
      backgroundColor: '#ef4040',
      timeout: 4000,
      class: 'message-warning',
      position: 'topRight',
      titleColor: 'white',
      messageColor: 'white',
    });
  }
}

btnChangeWord.addEventListener('click', changeWord);

btnCheckWord.addEventListener('click', () => checkWord(currentWord));

Object.prototype.getValueByPathString = function (pathString) {
  return pathString
    .split('.') // перетворюємо "user.profile.name" на ['user', 'profile', 'name']
    .reduce((acc, key) => acc && acc[key], this);
};

const data = {
  user: {
    profile: {
      name: 'Андрій',
      age: 22,
    },
  },
};

console.log(data.getValueByPathString('user.profile.name')); // "Андрій"
console.log(data.getValueByPathString('user.profile.age')); // 22
console.log(data.getValueByPathString('кк.settings.theme')); // undefined

const path = 'user.profile.name';
const keys = path.split('.');
const base = { user: { profile: { name: 'Alex' } } };

const result = keys.reduceRight((acc, key) => {
  const result = { [key]: acc };
  console.log(result);
  return result;
}, 'Alex');

console.log(result);
// { user: { profile: { name: 'Alex' } } }
