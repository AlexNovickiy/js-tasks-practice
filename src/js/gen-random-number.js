import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const outerNumber = document.querySelector('.random-number-container .value');
const selectedRandomNumbers = document.querySelector('.range-select');
const SelectedListNumbers = document.querySelector('.range-list');
const inputMinNumber = document.querySelector('.radio-range-min-input');
const inputMaxNumber = document.querySelector('.radio-range-max-input');
const inputNumbers = document.querySelector('.text-list-input');
const generateButton = document.querySelector('.btn-generate-number');

generateButton.addEventListener('click', () => {
    const minNumber = parseInt(inputMinNumber.value, 10);
    const maxNumber = parseInt(inputMaxNumber.value, 10);

    // Проверяем, выбрана ли радиокнопка "Диапазон чисел"
    if (selectedRandomNumbers.checked) {
        // Проверка: минимальное число должно быть меньше максимального
        if (isNaN(minNumber) || isNaN(maxNumber)) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter valid numbers for the range.',
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        if (minNumber > maxNumber) {
            iziToast.error({
                title: 'Error',
                message: 'Minimum number should be less than maximum number.',
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        // Генерация случайного числа в диапазоне
        const range = maxNumber - minNumber + 1;
        const randomNumber = Math.floor(Math.random() * range) + minNumber;
        outerNumber.textContent = randomNumber;

    } else if (SelectedListNumbers.checked) {
        // Проверяем, выбрана ли радиокнопка "Список чисел"
        const inputValues = inputNumbers.value.trim();

        if (!inputValues) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter numbers in the text area.',
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        // Разделяем введенные числа по пробелам и фильтруем только валидные числа
        const numbers = inputValues.split(/\s+/).map((num) => parseInt(num, 10)).filter((num) => !isNaN(num));

        if (numbers.length < 2) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter at least two valid numbers.',
                position: 'topRight',
                timeout: 3000,
            });
            return;
        }

        // Генерация случайного числа из списка
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        outerNumber.textContent = randomNumber;

    } else {
        // Если ни одна радиокнопка не выбрана
        iziToast.error({
            title: 'Error',
            message: 'Please select a mode (range or list).',
            position: 'topRight',
            timeout: 3000,
        });
    }
});